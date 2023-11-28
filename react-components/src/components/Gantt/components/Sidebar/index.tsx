import React from 'react';

import { Typography } from '../../../Typography';
import { GanttConfig, BaseMilestone } from '../../model';

import s from './style.module.scss';

interface Props<T, D extends BaseMilestone> {
  items: GanttConfig<T, D>['items'];
  component: GanttConfig<T, D>['sidebarComponent'];
  handleScrollSidebar: (scroll: React.BaseSyntheticEvent) => void;
}

export const GanttSidebar: React.FC<Props<any, any>> = <
  T,
  D extends BaseMilestone,
>({
  items,
  component,
  handleScrollSidebar,
}: Props<object, D>) => {
  if (!component) {
    throw new Error('Sidebar component not provided!');
  }

  return (
    <div className={s.root} onScroll={handleScrollSidebar}>
      <div className={s.patch} />

      {items.map(({ item }) => {
        return React.createElement(component, { ...item });
      })}
    </div>
  );
};
