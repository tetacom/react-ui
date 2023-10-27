import { Axis } from '../../useScales';

export type AxisProps = Axis;

export function YAxis(props: AxisProps) {
  const { scale } = props;

  if (!scale) return null;

  return scale.ticks().map((tick: number | Date) => {
    return (
      <g
        transform={`translate(0, ${scale(tick)})`}
        textAnchor="end"
        style={{ shapeRendering: 'crispEdges' }}
      >
        <line stroke="var(--color-text-10)" x2="-6"></line>
        <text fontSize={11} fill="var(--color-text-90)" dy="0.32em" dx="-9">
          {tick instanceof Date ? tick.getMilliseconds() : tick}
        </text>
      </g>
    );
  });
}
