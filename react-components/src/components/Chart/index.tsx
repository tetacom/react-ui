import React from 'react';
import s from './chart.module.scss';
import { ChartConfig } from './model';
import { useSize } from './useSize';
import { YAxis } from './components/Axis/y-axis';
import { XAxis } from './components/Axis/x-axis';
import { useExtremes } from './useExtremes/useExtremes';
import { useAxisSize } from './useAxisSize/useAxisSize';
import { useScales } from './useScales';
import { Gridlines } from './components/Gridlines/gridlines';

export type ChartProps = {
  config: ChartConfig;
};

export function Chart(props: ChartProps) {
  const { config } = props;
  const chartContainer = React.useRef(null);

  const size = useSize(chartContainer);
  const extremes = useExtremes(config);
  const sizes = useAxisSize(extremes.x, extremes.y);
  const { x, y, finalBottomPadding, finalLeftPadding } = useScales(
    sizes.x,
    sizes.y,
    size || new DOMRectReadOnly(0, 0, 0, 0),
  );

  return (
    <div className={s.container}>
      <div style={{ height: '100%' }} ref={chartContainer}>
        <svg height="100%" width="100%" style={{ position: 'absolute' }}>
          {y.map((axis) => {
            return (
              <g transform={`translate(${axis.padding}, 0)`}>
                <YAxis scale={axis.scale} />
              </g>
            );
          })}

          <g className="x-axis-container">
            {x.map((axis) => {
              return (
                <g
                  transform={`translate(${finalLeftPadding}, ${
                    size?.height - finalBottomPadding
                  })`}
                >
                  <XAxis scale={axis.scale} />
                </g>
              );
            })}
          </g>
        </svg>
        <svg
          style={{
            position: 'absolute',
            transform: `translate(${finalLeftPadding}px, 0)`,
          }}
          viewBox={`0 0 ${size?.width - finalLeftPadding} ${
            size?.height - finalBottomPadding
          }`}
          width={size?.width - finalLeftPadding}
          height={size?.height - finalBottomPadding}
        >
          <Gridlines x={x} y={y} size={size} />

          <g className="series">
            {config.series?.map((item) => {
              if (!item.component) {
                throw new Error(
                  'Series must be provide `component` prop for drawing',
                );
              }

              const foundX = x.find((a) => a.index === item.xAxisIndex);
              const foundY = y.find((a) => a.index === item.yAxisIndex);

              if (!foundX || !foundY) {
                throw new Error(
                  'Series must be provide `x, y scales` for drawing.',
                );
              }

              return React.createElement(item.component, {
                x: foundX,
                y: foundY,
                serie: item,
              });
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
