import s from './Gantt.module.scss';
import { useTimeAxis } from './hooks/useTimeAxis';
import dayjs from 'dayjs';

import { GanttRowComponent } from './components/GanttRow/GanttRow';
import {
  GanttProps,
  MilestoneItem,
  MilestoneOptions,
} from './model/gantt-props';
import { useElementSize } from '../hooks/useElementSize';
import { ZoomSize } from './model/enum/zoom-size.enum';
import { Typography } from '../Typography';
import React, { useRef } from 'react';

export function Gantt<T extends MilestoneOptions>(props: GanttProps<T>) {
  const [trackScrollRef, size] = useElementSize<HTMLDivElement>();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [maxWidth, ticks, scale] = useTimeAxis(
    props.items,
    ZoomSize.month,
    size,
  );

  const handleScrollSidebar = (scroll: any) => {
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
      <div
        className={s.sidebar}
        ref={sidebarRef}
        onScroll={handleScrollSidebar}
      >
        <div
          style={{
            height: 32,
            background: '#292e3c',
          }}
        ></div>
        {props.items.map((_) => {
          return (
            <div className={s.name}>
              <Typography.Text fontVariant="body3" className={s.containerTitle}>
                {_.id}
              </Typography.Text>
              <Typography.Text
                fontVariant="caption"
                className={s.containerSubtitle}
              >
                ООО "Татбурнефть"
              </Typography.Text>
              <Typography.Text
                fontVariant="caption"
                className={s.containerCaption}
              >
                125 т
              </Typography.Text>
            </div>
          );
        })}
      </div>
      <div
        className={s.timeline}
        ref={trackScrollRef}
        onScroll={handleScrollTimeline}
      >
        <div
          ref={timelineRef}
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 20,
            height: 32,
            background: '#292e3c',
            borderBottom: '1px solid var(--color-text-10)',
            width: size.width,
          }}
          className={s.hide}
        >
          <div
            style={{
              position: 'relative',
              width: maxWidth,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ height: 16, display: 'flex' }}>
              <Typography.Text
                fontVariant="overline"
                style={{
                  position: 'sticky',
                  background: '#292e3c',
                  left: 0,
                }}
              >
                2023
              </Typography.Text>
            </div>
            <div style={{ height: 16, display: 'flex' }}>
              {ticks
                .filter((_) => {
                  return dayjs(_).date() === 1;
                })
                .map((tick, index, ticks) => {
                  return (
                    <Typography.Text
                      fontVariant="overline"
                      style={{
                        position: 'sticky',
                        background: '#292e3c',
                        left: 0,
                        display: 'inline-block',
                        color: 'var(--color-text-50)',
                        width: ticks[index + 1]
                          ? Math.abs(scale(ticks[index + 1]) - scale(tick))
                          : 'max-content',
                      }}
                    >
                      {dayjs(tick).format('MMMM')}
                    </Typography.Text>
                  );
                })}
            </div>
          </div>
        </div>
        <div style={{ width: maxWidth, position: 'relative', paddingTop: 32 }}>
          {props.items?.map((item: MilestoneItem<T>, index) => {
            if (props.onMilestoneRender) {
              return props.onMilestoneRender(item, scale);
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
