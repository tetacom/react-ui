import { motion } from 'framer-motion';
import { ComponentProps } from '../model';
import { BubblePoint } from './story-helper';

export function BubbleSeries(props: ComponentProps<BubblePoint>) {
  const { x, y } = props;
  return (
    <g>
      {props.serie.data?.map((point, index) => {
        return (
          <motion.circle
            initial={{ r: 0 }}
            animate={{ r: point.radius }}
            transition={{
              type: 'spring',
              stiffness: 150,
            }}
            cx={x.scale(point.x) as number}
            cy={y.scale(point.y) as number}
            r={point.radius}
            stroke="var(--color-red-50)"
            fill="rgba(240, 60, 70, 0.40)"
          ></motion.circle>
        );
      })}
    </g>
  );
}
