import { Axis } from '../../useScales';

export type AxisProps = Pick<Axis, 'scale'>;

export function XAxis(props: AxisProps) {
  const { scale } = props;

  if (!scale) return null;

  return scale.ticks().map((tick: number | Date) => (
    <g
      key={tick.toString()}
      transform={`translate(${scale(tick)}, 0)`}
      textAnchor="middle"
      style={{ shapeRendering: 'crispEdges' }}
    >
      <text fontSize={11} fill="var(--color-text-90)" y="9" dy="8">
        {tick instanceof Date ? tick.getMilliseconds() : tick}
      </text>
      <line stroke="var(--color-text-10)" y2="6"></line>
    </g>
  ));
}
