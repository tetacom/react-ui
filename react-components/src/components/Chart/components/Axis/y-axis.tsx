import { Axis } from '../../useScales';
import s from './style.module.scss';

export type AxisProps = Pick<Axis, 'scale' | 'title' | 'size'>;

export function YAxis(props: AxisProps) {
  const { scale } = props;

  if (!scale) return null;

  return (
    <>
      <g>
        <text
          className={s.label}
          transform={`translate(${-props.size}, ${
            props.scale.range()[1] / 2
          }) rotate(-90)`}
          dy={6}
          text-anchor="middle"
          dominant-baseline="middle"
        >
          {props.title}
        </text>
      </g>
      {scale.ticks().map((tick: number | Date) => (
        <g
          key={tick.toString()}
          transform={`translate(0, ${scale(tick)})`}
          textAnchor="end"
          style={{ shapeRendering: 'crispEdges' }}
        >
          <line stroke="var(--color-text-10)" x2="-6"></line>
          <text fontSize={11} fill="var(--color-text-90)" dy="0.32em" dx="-9">
            {tick instanceof Date ? tick.getMilliseconds() : tick}
          </text>
        </g>
      ))}
    </>
  );
}
