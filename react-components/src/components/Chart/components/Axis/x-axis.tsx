import { Axis } from '../../useScales';
import s from './style.module.scss';

export type AxisProps = Pick<Axis, 'scale' | 'title' | 'size'>;

export function XAxis(props: AxisProps) {
  const { scale } = props;

  if (!scale) return null;

  return (
    <>
      <g>
        <text
          className={s.label}
          transform={`translate(${scale.range()[1] / 2}, 32)`}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {props.title}
        </text>
      </g>
      {scale.ticks().map((tick: number | Date) => (
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
      ))}
    </>
  );
}
