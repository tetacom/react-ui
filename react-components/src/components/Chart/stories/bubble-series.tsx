import { motion } from 'framer-motion';
import { ComponentProps } from '../model';
import { BubblePoint } from './story-helper';
import { Dropdown } from '../../Dropdown';

export function BubbleSeries(props: ComponentProps<BubblePoint>) {
  const { x, y } = props;

  return (
    <g>
      {props.serie.data?.map((point, index) => {
        return (
          <Dropdown
            dropdown={
              <div
                style={{
                  background: 'var(--color-global-bgcard)',
                }}
              >
                {point.radius}
              </div>
            }
            renderInPortal={true}
          >
            <motion.circle
              initial={{ r: 0 }}
              animate={{ r: point.radius }}
              exit={{ r: 0 }}
              style={{ cursor: 'pointer' }}
              cx={x.scale(point.x) as number}
              cy={y.scale(point.y) as number}
              r={point.radius}
              stroke="var(--color-red-50)"
              fill="rgba(240, 60, 70, 0.40)"
            ></motion.circle>
          </Dropdown>
        );
      })}
    </g>
  );
}
