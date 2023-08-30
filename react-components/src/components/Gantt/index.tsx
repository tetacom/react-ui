import React, { useMemo, useRef } from 'react';
import * as d3 from 'd3';

import { useTimeAxis } from './hooks/useTimeAxis';
import { GanttRowComponent } from './components/GanttRow';
import { GanttProps, MilestoneItem, MilestoneOptions } from './model';
import { useElementSize } from '../hooks/useElementSize';
import { GanttSidebar } from './components/Sidebar';
import { GanttDatesTrack } from './components/DatesTrack';
import { VerticalLines } from './components/VerticalLines';
import { interpolateProduction } from './interpolateProduction';

import s from './Gantt.module.scss';

export function Gantt<T extends MilestoneOptions>({
  items,
  zoom,
  onMilestoneRender,
  height = '100vh',
  productionEndpoints,
}: GanttProps<T>) {
  const [trackScrollRef, size] = useElementSize<HTMLDivElement>();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const defaultColorMap = useMemo(() => {
    const [minProduction, maxProduction] = productionEndpoints;

    return d3
      .scaleSequential(interpolateProduction)
      .domain([minProduction, maxProduction]);
  }, [productionEndpoints]);

  const [maxWidth, ticks, scale] = useTimeAxis(items, zoom, size);

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
    <div className={s.container} style={{ height, minHeight: height }}>
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

          {items.map((item: MilestoneItem<T>) => {
            if (onMilestoneRender) return onMilestoneRender(item, scale);

            return (
              <GanttRowComponent
                key={item.id}
                item={item}
                scaleTime={scale}
                defaultColorMap={defaultColorMap}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
