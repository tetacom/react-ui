import { Axis } from '../../useScales';
import s from './gridlines.module.scss';

type GridlinesProps = {
  x: Axis[];
  y: Axis[];
  size?: DOMRectReadOnly;
};

export function Gridlines(props: GridlinesProps) {
  const x = props.x?.at(0);
  const y = props.y?.at(0);

  if (!x || !y || !props.size) {
    return null;
  }

  return (
    <g className="gridlines-container">
      <GridlineX axis={x} size={props.size}></GridlineX>
      <GridlineY axis={y} size={props.size}></GridlineY>
    </g>
  );
}

type GridlineProps = {
  axis: Axis;
} & Pick<GridlinesProps, 'size'>;

function GridlineX(props: GridlineProps) {
  const { axis, size } = props;

  return axis.scale
    .ticks()
    .map((tick) => (
      <line
        key={tick.toString()}
        className={s.gridline}
        x1={axis.scale(tick) as string}
        y1="0"
        x2={axis.scale(tick) as string}
        y2={size?.height}
      />
    ));
}

function GridlineY(props: GridlineProps) {
  const { axis, size } = props;

  return axis.scale
    .ticks()
    .map((tick) => (
      <line
        key={tick.toString()}
        className={s.gridline}
        x1="0"
        y1={axis.scale(tick) as string}
        x2={size?.width}
        y2={axis.scale(tick) as string}
      />
    ));
}
