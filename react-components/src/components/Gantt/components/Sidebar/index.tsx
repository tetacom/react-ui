import React, { forwardRef } from 'react';

import { GanttConfig, BaseMilestone } from '../../model';

import s from './style.module.scss';

interface Props<T, D extends BaseMilestone> {
  items: GanttConfig<T, D>['items'];
  component: GanttConfig<T, D>['sidebarComponent'];
  handleScrollSidebar: (scroll: React.BaseSyntheticEvent) => void;
}

export const GanttSidebar = forwardRef<HTMLDivElement, Props<any, any>>(
  function ({ items, component, handleScrollSidebar }, ref) {
    if (!component) {
      throw new Error('Sidebar component not provided!');
    }

    return (
      <div ref={ref} className={s.root} onScroll={handleScrollSidebar}>
        <div className={s.patch} />

        {items.map(({ item }, index) => {
          return React.createElement(component, {
            ...item,
            key: index,
          });
        })}
      </div>
    );
  },
);
