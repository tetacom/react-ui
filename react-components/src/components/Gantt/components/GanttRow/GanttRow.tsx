import dayjs from 'dayjs';
import * as d3 from 'd3';

import { Typography } from '../../../Typography';
import { MilestoneItem, MilestoneOptions } from '../../model/gantt-props';
import { Tooltip } from '../../../Tooltip';
import { getContrastColor } from '../../../../utils/getContrastColor';

import s from './GanttRow.module.scss';

export interface GanttRowProps<T extends MilestoneOptions> {
  item: MilestoneItem<T>;
  scaleTime: d3.ScaleTime<number, number>;
}

const defaultColorMap = d3
  .scaleLinear(['#0A8A65', '#E6CD11', '#FE8206', '#E24C3C'])
  .domain([1000, 1300, 2500, 3000]);

export function GanttRowComponent<T extends MilestoneOptions>(
  props: GanttRowProps<T>,
) {
  return (
    <div className={s.root}>
      <div className={s.track} style={{ position: 'relative' }}>
        {props?.item.milestones?.map((milestone) => {
          const itemWidth =
            props.scaleTime(milestone.endTime) -
            props.scaleTime(milestone.startTime);

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

          return (
            <Tooltip title={tooltipString?.join('')} placement="top-start">
              <div
                style={{
                  position: 'absolute',
                  zIndex: 4,
                  left: props.scaleTime(milestone.startTime),
                  width: itemWidth === 0 ? 1 : itemWidth,
                  borderRadius: 4,
                  overflow: 'hidden',
                  border:
                    (milestone as any).clusterType === 'drilling'
                      ? // @ts-ignore
                        `1px solid ${d3
                          .color(defaultColorMap((milestone as any).production))
                          .hex()}`
                      : 'none',
                  background:
                    (milestone as any).clusterType === 'drilling'
                      ? 'transparent'
                      : 'repeating-linear-gradient(-60deg, var(--color-text-20) 0, var(--color-text-20) 1px, transparent 1.5px, transparent 5px)',
                }}
                className={s.trackItem}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      paddingLeft: 6,
                      height: 16,
                      display: 'flex',
                      overflow: 'hidden',
                      background:
                        (milestone as any).clusterType === 'drilling'
                          ? defaultColorMap((milestone as any).production)
                          : 'transparent',
                    }}
                  >
                    <Typography.Text
                      fontVariant="captionBold"
                      style={{
                        color: getContrastColor(
                          // @ts-ignore
                          d3
                            .color(
                              defaultColorMap((milestone as any).production),
                            )
                            .hex(),
                        ),
                      }}
                    >
                      {(milestone as any).clusterId}
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      height: 16,
                      background:
                        (milestone as any).clusterType === 'drilling'
                          ? // @ts-ignore
                            `${d3
                              .color(
                                defaultColorMap((milestone as any).production),
                              )
                              .hex()}30`
                          : 'transparent',
                    }}
                  >
                    {(milestone as any).items?.map(
                      (well: any, index: any, wells: any) => {
                        const isMoveBetweenWells =
                          wells[index + 1]?.operationType === 0 &&
                          wells[index]?.operationType === 2;

                        if (isMoveBetweenWells) {
                          return (
                            <div
                              style={{
                                position: 'absolute',
                                left: scaleTimeInCluster(
                                  wells[index]?.startTime,
                                ),
                                height: '100%',
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
                            ></div>
                          );
                        }

                        return (
                          <Typography.Text
                            fontVariant="caption"
                            style={{
                              position: 'absolute',
                              left: scaleTimeInCluster(well.startTime) + 6,
                            }}
                          >
                            {(milestone as any).clusterType === 'drilling' &&
                              well.wellId}

                            {(milestone as any).clusterType === 'move' &&
                              (milestone as any)?.items[0]?.distance.toFixed(0)}
                          </Typography.Text>
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
