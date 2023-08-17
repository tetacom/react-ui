import dayjs from 'dayjs';
import React, { useRef } from 'react';

import { useTimeAxis } from './hooks/useTimeAxis';
import { GanttRowComponent } from './components/GanttRow/GanttRow';
import { GanttProps, MilestoneItem, MilestoneOptions } from './model';
import { useElementSize } from '../hooks/useElementSize';
import { GanttSidebar } from './components/Sidebar';
import { GanttDatesTrack } from './components/DatesTrack';

import s from './Gantt.module.scss';

export function Gantt<T extends MilestoneOptions>({
  items,
  zoom,
  onMilestoneRender,
}: GanttProps<T>) {
  const [trackScrollRef, size] = useElementSize<HTMLDivElement>();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [maxWidth, ticks, scale] = useTimeAxis(items, zoom, size);

  const handleScrollSidebar = (scroll: any) => {
    console.log('scroll', scroll);
    if (trackScrollRef?.current) {
      trackScrollRef.current.scrollTop = scroll.target?.scrollTop;
    }
  };

  const handleScrollTimeline = (scroll: any) => {
    if (sidebarRef?.current && timelineRef?.current) {
      sidebarRef.current.scrollTop = scroll.target?.scrollTop;
      timelineRef.current.scrollLeft = scroll.target?.scrollLeft;
    }
  };

  return (
    <div className={s.container}>
      <GanttSidebar
        ref={sidebarRef}
        handleScrollSidebar={handleScrollSidebar}
        items={items}
      />

      <div
        className={s.timeline}
        ref={trackScrollRef}
        onScroll={handleScrollTimeline}
      >
        <GanttDatesTrack
          size={size}
          maxWidth={maxWidth}
          scale={scale}
          ticks={ticks}
        />

        <div style={{ width: maxWidth, position: 'relative', paddingTop: 32 }}>
          {items.map((item: MilestoneItem<T>) => {
            if (onMilestoneRender) {
              return onMilestoneRender(item, scale);
            }

            return (
              <GanttRowComponent key={item.id} item={item} scaleTime={scale} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
