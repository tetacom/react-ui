import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import * as d3 from 'd3';

import { Typography } from '../../../Typography';
import { MilestoneItem, MilestoneOptions } from '../../model';
import { getContrastColor } from '../../../../utils/getContrastColor';
import { Tooltip } from '../../../Tooltip';

import s from './style.module.scss';

const { Text } = Typography;

dayjs.extend(minMax);

const SHIFTING_BG =
  'repeating-linear-gradient(-60deg, var(--color-text-20) 0, var(--color-text-20) 1px, transparent 1.5px, transparent 5px)';

interface GanttRowProps<T extends MilestoneOptions> {
  item: MilestoneItem<T>;
  scaleTime: d3.ScaleTime<number, number>;
  defaultColorMap: d3.ScaleSequential<string>;
}

export function GanttRowComponent<T extends MilestoneOptions>({
  item,
  scaleTime,
  defaultColorMap,
}: GanttRowProps<T>) {
  return (
    <div className={s.root}>
      <div className={s.track}>
        {item.milestones?.map((milestone) => {
          const itemWidth =
            scaleTime(milestone.endTime) - scaleTime(milestone.startTime);

          const scaleTimeInCluster = d3
            .scaleTime()
            .domain([milestone.startTime, milestone.endTime])
            .range([0, itemWidth]);

          const uniqIds = new Set(
            (milestone as any)?.items?.map((_: any) => _.wellId),
          );

          let prodSum = 0;

          const tooltipString = [...uniqIds]?.map((id: any) => {
            const foundMilestone = (milestone as any)?.items.find(
              (_: any) => _.wellId === id,
            );

            prodSum += foundMilestone.production;

            return `${foundMilestone.wellId}|idd:${foundMilestone.idd}|prod:${foundMilestone.production}\n`;
          });

          tooltipString[tooltipString.length - 1] += `\n\nsum|${prodSum.toFixed(
            0,
          )}`;

          tooltipString[tooltipString.length - 1] += `\n${dayjs(
            milestone.startTime,
          ).format('DD.MM.YYYY')} - ${dayjs(milestone.endTime).format(
            'DD.MM.YYYY',
          )}`;

          const isDrillingMilestone =
            (milestone as any).clusterType === 'drilling';
          let startEndDatesInterval: string;
          const works = (milestone as any).items;
          const startDate = (
            isDrillingMilestone
              ? dayjs.min(works.map((work: any) => dayjs(work.startTime)))
              : dayjs(milestone.startTime)
          )?.format('DD.MM.YYYY');
          const endDate = (
            isDrillingMilestone
              ? dayjs.max(works.map((work: any) => dayjs(work.endTime)))
              : dayjs(milestone.endTime)
          )?.format('DD.MM.YYYY');
          startEndDatesInterval = `${startDate} - ${endDate}`;

          const productionColor = defaultColorMap(
            (milestone as any).production,
          );
          const clusterColor =
            d3.color(productionColor)?.hex() ?? 'var(--color-primary-50)';
          const distance = (milestone as any)?.distance + 'км';

          return (
            <div
              key={Date.parse(String(milestone.startTime))}
              className={s.trackItem}
              style={{
                left: scaleTime(milestone.startTime),
                width: itemWidth === 0 ? 1 : itemWidth,
                border: isDrillingMilestone
                  ? `1px solid ${clusterColor}`
                  : 'none',
                background: isDrillingMilestone ? 'transparent' : SHIFTING_BG,
              }}
            >
              {!isDrillingMilestone && (
                <Tooltip
                  title={`${distance}\n${startEndDatesInterval}`}
                  mouseFollow
                >
                  <div className={s.betweenClusters}>
                    <Text
                      fontVariant="caption"
                      className={s.betweenClustersText}
                    >
                      {distance}
                    </Text>
                  </div>
                </Tooltip>
              )}

              {isDrillingMilestone && (
                <Tooltip title={startEndDatesInterval} mouseFollow>
                  <div className={s.milestone}>
                    <div
                      className={s.milestoneTop}
                      style={{
                        backgroundColor: isDrillingMilestone
                          ? clusterColor
                          : 'transparent',
                      }}
                    >
                      <Text
                        fontVariant="captionBold"
                        className={s.milestoneTopText}
                        style={{
                          color: getContrastColor(clusterColor, {
                            black: 'black',
                            white: 'var(--color-text-90)',
                          }),
                        }}
                      >
                        {(milestone as any).clusterId}
                      </Text>
                    </div>
                    <div
                      className={s.milestoneBottom}
                      style={{
                        backgroundColor: isDrillingMilestone
                          ? `${clusterColor}30`
                          : 'transparent',
                      }}
                    >
                      {(milestone as any).items?.map(
                        (well: any, index: number, wells: any[]) => {
                          const key = Date.parse(String(well.startTime));
                          const isMoveBetweenWells =
                            wells[index + 1]?.operationType === 0 &&
                            wells[index]?.operationType === 2;

                          const currentScaleTime = scaleTimeInCluster(
                            wells[index]?.startTime,
                          );
                          const nextScaleTime =
                            scaleTimeInCluster(wells[index + 1]?.startTime) ??
                            scaleTimeInCluster(well.endTime);
                          const scaleWidth = Math.abs(
                            currentScaleTime - nextScaleTime,
                          );

                          if (isMoveBetweenWells) {
                            return (
                              <div
                                key={key}
                                className={s.milestoneBottomItem}
                                style={{
                                  left: scaleTimeInCluster(
                                    wells[index]?.startTime,
                                  ),
                                  backgroundColor: defaultColorMap(
                                    (milestone as any).production,
                                  ),
                                  width: scaleWidth,
                                }}
                              />
                            );
                          }

                          const caption = well.wellId ?? '';

                          return (
                            <Text
                              key={key}
                              title={caption}
                              fontVariant="caption"
                              className={s.milestoneBottomItem}
                              style={{
                                left: scaleTimeInCluster(well.startTime),
                                width: scaleWidth,
                              }}
                            >
                              {caption}
                            </Text>
                          );
                        },
                      )}
                    </div>
                  </div>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
