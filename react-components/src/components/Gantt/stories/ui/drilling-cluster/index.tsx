import * as d3 from 'd3';

import { Tooltip } from '../../../../Tooltip';
import { Typography } from '../../../../Typography';
import { Formatter } from '../../../../../utils/formatter';
import { getContrastColor } from '../../../../../utils/getContrastColor';
import { MilestoneComponentProps } from '../../../model/public-api';
import { ScheduleMilestone, OperationTypeLib } from '../../types';

import s from './style.module.scss';

const { Text } = Typography;

export function DrillingCluster(
  props: MilestoneComponentProps<ScheduleMilestone> & { color: any },
) {
  const { milestone, scale } = props;
  const width = scale(milestone.endTime) - scale(milestone.startTime);
  const translateX = `translateX(${scale(milestone.startTime)}px)`;
  const background = 'tomato';

  return (
    <Tooltip
      title={`${Formatter.date(
        milestone.startTime.toString(),
      )} - ${Formatter.date(milestone.endTime.toString())}`}
      mouseFollow
    >
      <div
        data-cluster-id={milestone.clusterId}
        className={s.item}
        style={{
          width,
          transform: translateX,
          border: `1px solid ${background}`,
        }}
      >
        <div className={s.milestone}>
          <div
            className={s.milestoneTop}
            style={{
              backgroundColor: background,
            }}
          >
            <Text
              className={s.milestoneTopText}
              fontVariant="captionBold"
              style={{
                color: getContrastColor(
                  d3.color(background)?.formatHex() ?? '',
                ),
              }}
            >
              {milestone.caption}
            </Text>
          </div>

          <div
            className={s.milestoneBottom}
            style={{ backgroundColor: background }}
          >
            {props.milestone.items?.map(
              ({ startTime, endTime, operationType, wellId }) => {
                const key = Date.parse(String(startTime));
                const isMoveBetweenWells =
                  operationType === OperationTypeLib.MovingBetweenWells;
                const width = scale(endTime) - scale(startTime);
                const left = scale(startTime) - scale(milestone.startTime);

                if (isMoveBetweenWells) {
                  return (
                    <span
                      key={key}
                      className={s.milestoneBottomItem}
                      style={{
                        left,
                        width,
                        backgroundColor: background,
                      }}
                    />
                  );
                }

                return (
                  <Text
                    key={key}
                    title={wellId}
                    fontVariant="caption"
                    className={s.milestoneBottomItem}
                    style={{
                      left,
                      width,
                      backgroundColor: 'var(--color-global-bgmain)',
                    }}
                  >
                    {wellId}
                  </Text>
                );
              },
            )}
          </div>
        </div>
      </div>
    </Tooltip>
  );
}
