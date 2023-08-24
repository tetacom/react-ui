import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import * as d3 from 'd3';

import { Typography } from '../../../Typography';
import { MilestoneItem, MilestoneOptions } from '../../model';
import { getContrastColor } from '../../../../utils/getContrastColor';
import { Tooltip } from '../../../Tooltip';

import s from './GanttRow.module.scss';

const { Text } = Typography;

dayjs.extend(minMax);

interface GanttRowProps<T extends MilestoneOptions> {
  item: MilestoneItem<T>;
  scaleTime: d3.ScaleTime<number, number>;
}

const defaultColorMap = d3
  .scaleLinear(['#0A8A65', '#E6CD11', '#FE8206', '#E24C3C'])
  .domain([1000, 1300, 2500, 3000]);

export function GanttRowComponent<T extends MilestoneOptions>({
  item,
  scaleTime,
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

          let startEndDatesInterval = '';
          if ((milestone as any).clusterType === 'drilling') {
            const works = (milestone as any).items;
            const startDate =
              dayjs
                .min(works.map((work: any) => dayjs(work.startTime)))
                ?.format('DD.MM.YYYY') ?? '';
            const endDate =
              dayjs
                .max(works.map((work: any) => dayjs(work.endTime)))
                ?.format('DD.MM.YYYY') ?? '';
            startEndDatesInterval = `${startDate} - ${endDate}`;
          }

          return (
            <Tooltip
              key={Date.parse(String(milestone.startTime))}
              title={startEndDatesInterval}
              placement="top-start"
            >
              <div
                className={s.trackItem}
                style={{
                  left: scaleTime(milestone.startTime),
                  width: itemWidth === 0 ? 1 : itemWidth,
                  border:
                    (milestone as any).clusterType === 'drilling'
                      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        `1px solid ${d3
                          .color(defaultColorMap((milestone as any).production))
                          .hex()}`
                      : 'none',
                  background:
                    (milestone as any).clusterType === 'drilling'
                      ? 'transparent'
                      : 'repeating-linear-gradient(-60deg, var(--color-text-20) 0, var(--color-text-20) 1px, transparent 1.5px, transparent 5px)',
                }}
              >
                <div className={s.milestone}>
                  <div
                    className={s.milestoneTop}
                    style={{
                      background:
                        (milestone as any).clusterType === 'drilling'
                          ? defaultColorMap((milestone as any).production)
                          : 'transparent',
                    }}
                  >
                    <Text
                      fontVariant="captionBold"
                      style={{
                        color: getContrastColor(
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          d3
                            .color(
                              defaultColorMap((milestone as any).production),
                            )
                            .hex(),
                          { black: 'black', white: 'var(--color-text-90)' },
                        ),
                      }}
                    >
                      {(milestone as any).clusterId}
                    </Text>
                  </div>
                  <div
                    className={s.milestoneBottom}
                    style={{
                      background:
                        (milestone as any).clusterType === 'drilling'
                          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            `${d3
                              .color(
                                defaultColorMap((milestone as any).production),
                              )
                              .hex()}30`
                          : 'transparent',
                    }}
                  >
                    {(milestone as any).items?.map(
                      (well: any, index: number, wells: any) => {
                        const key = Date.parse(String(well.startTime));

                        const isMoveBetweenWells =
                          wells[index + 1]?.operationType === 0 &&
                          wells[index]?.operationType === 2;

                        if (isMoveBetweenWells) {
                          return (
                            <div
                              key={key}
                              className={s.milestoneBottomItem}
                              style={{
                                left: scaleTimeInCluster(
                                  wells[index]?.startTime,
                                ),
                                background: defaultColorMap(
                                  (milestone as any).production,
                                ),
                                width: Math.abs(
                                  scaleTimeInCluster(wells[index]?.startTime) -
                                    scaleTimeInCluster(
                                      wells[index + 1]?.startTime,
                                    ),
                                ),
                              }}
                            />
                          );
                        }

                        return (
                          <Text
                            key={key}
                            fontVariant="caption"
                            className={s.milestoneBottomItem}
                            style={{
                              left: scaleTimeInCluster(well.startTime) + 6,
                            }}
                          >
                            {(milestone as any).clusterType === 'drilling' &&
                              well.wellId}

                            {(milestone as any).clusterType === 'move' &&
                              (milestone as any)?.items[0]?.distance.toFixed(0)}
                          </Text>
                        );
                      },
                    )}
                  </div>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
