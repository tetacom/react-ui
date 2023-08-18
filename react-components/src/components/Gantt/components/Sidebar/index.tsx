import React, { forwardRef } from 'react';

import { Typography } from '../../../Typography';
import { Icon } from '../../../Icons';
import { GanttProps } from '../../model';

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

      {items.map((item) => {
        return (
          <div key={item.id} className={s.drillingRig}>
            <Text fontVariant="title3" className={s.drillingRigName}>
              {item.id}
            </Text>
            <Text fontVariant="caption" className={s.drillingRigCompany}>
              ООО "Татбурнефть"ООО
            </Text>
            <Text fontVariant="caption" className={s.drillingRigLifting}>
              125 т
            </Text>
            <div className={s.drillingRigDrive}>
              <Icon name="home" />
            </div>
          </div>
        );
      })}
    </div>
  );
});
