import React, { forwardRef, useEffect, useRef } from 'react';

import { Typography } from '../../../Typography';

import s from './style.module.scss';

interface Props {
  items: any[];
  handleScrollSidebar: (scroll: any) => void;
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
            <Typography.Text fontVariant="body3" className={s.drillingRigName}>
              {item.id}
            </Typography.Text>
            <Typography.Text
              fontVariant="caption"
              className={s.drillingRigCompany}
            >
              ООО "Татбурнефть"
            </Typography.Text>
            <Typography.Text
              fontVariant="caption"
              className={s.drillingRigLifting}
            >
              125 т
            </Typography.Text>
            <div className={s.drillingRigDrive}>Icon</div>
          </div>
        );
      })}
    </div>
  );
});
