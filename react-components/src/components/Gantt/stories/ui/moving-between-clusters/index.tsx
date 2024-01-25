import {
  MilestoneComponentProps,
  Tooltip,
  Typography,
} from '@tetacom/react-components';

import { ScheduleMilestone } from '../../types';
import { Formatter } from '../../../../../utils/formatter';

import s from './style.module.scss';

const movingBackground =
  // eslint-disable-next-line max-len
  'repeating-linear-gradient(-60deg, var(--color-text-20) 0, var(--color-text-20) 1px, transparent 1.5px, transparent 5px)';

export function MovingCluster(
  props: MilestoneComponentProps<ScheduleMilestone>,
) {
  const { milestone, scale } = props;
  const width = scale(milestone.endTime) - scale(milestone.startTime);
  const translateX = `translateX(${scale(milestone.startTime)}px)`;
  const title = `${Formatter.date(
    milestone.startTime.toString(),
  )} - ${Formatter.date(milestone.endTime.toString())}`;

  return (
    <Tooltip title={`${milestone.distance} км\n${title}`} mouseFollow>
      <div
        className={s.item}
        style={{ transform: translateX, width, background: movingBackground }}
      >
        <div className={s.move}>
          <Typography.Text fontVariant="caption" className={s.moveText}>
            {milestone.distance} км
          </Typography.Text>
        </div>
      </div>
    </Tooltip>
  );
}
