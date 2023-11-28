import React, { useRef } from 'react';

import { useTimeAxis } from './useTimeAxis';
import { BaseMilestone, GanttConfig, MilestoneItem } from './model';
import { useElementSize } from '../hooks/useElementSize';
import { GanttSidebar } from './components/Sidebar';
import { GanttDatesTrack } from './components/DatesTrack';
import { VerticalLines } from './components/VerticalLines';

import s from './Gantt.module.scss';
import { GanttRowComponent } from './components/GanttRow';

export function Gantt<T, D extends BaseMilestone>({
  config,
}: {
  config: GanttConfig<T, D>;
}) {
  const [trackScrollRef, size] = useElementSize<HTMLDivElement>();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [maxWidth, ticks, scale] = useTimeAxis(config.items, config.zoom, size);

  const handleScrollSidebar = (scroll: React.BaseSyntheticEvent) => {
    if (trackScrollRef?.current) {
      trackScrollRef.current.scrollTop = scroll.target?.scrollTop;
    }
  };

  const handleScrollDateTrack = (scroll: React.BaseSyntheticEvent) => {
    if (trackScrollRef?.current) {
      trackScrollRef.current.scrollLeft = scroll.target.scrollLeft;
    }
  };

  const handleScrollTimeline = (scroll: React.BaseSyntheticEvent) => {
    if (sidebarRef?.current && timelineRef?.current) {
      sidebarRef.current.scrollTop = scroll.target?.scrollTop;
      timelineRef.current.scrollLeft = scroll.target?.scrollLeft;
    }
  };

  return (
    <div
      className={s.container}
      style={{ height: config.height, minHeight: config.height }}
      onContextMenu={(e: React.MouseEvent) => {
        config.onContextMenu?.(e);
      }}
    >
      <GanttSidebar
        handleScrollSidebar={handleScrollSidebar}
        items={config.items}
        component={config.sidebarComponent}
      />

      <div
        className={s.timeline}
        ref={trackScrollRef}
        onScroll={handleScrollTimeline}
      >
        <GanttDatesTrack
          ref={timelineRef}
          size={size}
          maxWidth={maxWidth}
          scale={scale}
          ticks={ticks}
          handleScrollDateTrack={handleScrollDateTrack}
        />

        <div
          className={s.timelineContent}
          style={{
            width: maxWidth,
          }}
        >
          <VerticalLines scale={scale} ticks={ticks} />
          {config.items.map((item: MilestoneItem<T, D>, index: number) => {
            return <GanttRowComponent item={item} scale={scale} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
