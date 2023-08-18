import React, { forwardRef } from 'react';

import { Typography } from '../../../Typography';
import { ColoredIcon } from '../../../Icons';
import { GanttProps } from '../../model';
import { DriveType } from '../../model/public-api';

import s from './style.module.scss';

const { Text } = Typography;

interface Props {
  items: GanttProps<any>['items'];
  handleScrollSidebar: (scroll: React.BaseSyntheticEvent) => void;
}

export const GanttSidebar = forwardRef<HTMLDivElement, Props>(function (
  { items, handleScrollSidebar },
  ref,
) {
  return (
    <div className={s.root} ref={ref} onScroll={handleScrollSidebar}>
      <div className={s.patch} />

      {items.map(({ id, name, liftingCapability, driveType }) => {
        return (
          <div key={id} className={s.drillingRig}>
            <Text fontVariant="title3" className={s.drillingRigName}>
              {id}
            </Text>
            <Text fontVariant="caption" className={s.drillingRigCompany}>
              {name}
            </Text>
            <Text fontVariant="caption" className={s.drillingRigLifting}>
              {liftingCapability} т
            </Text>
            <div className={s.drillingRigDrive}>
              <ColoredIcon
                name={driveType === DriveType.Electric ? 'lighting' : 'fire'}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});
