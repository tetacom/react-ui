import s from './Slider.module.scss';
import React, { useState } from 'react';
import { useSlider } from './hooks/useSlider';
import { Tooltip } from 'tetacom/react-components';
import { Slider } from './model';
import { motion } from 'framer-motion';

export function SliderComponent(props: Slider) {
  const [sliderRef, pointers, steps, getPercentageForValue] = useSlider({
    min: -1000,
    max: 1000,
    step: 10,
    values: props.values,
    onMouseUp: () => {
      setTooltipOpen(false);
    },
    onChange: (values) => {
      props.onChange?.(values);
    },
  });

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const containerProps = {
    ref: sliderRef,
    style: {
      height: 16,
      width: '100%',
    },
  };

  return (
    <>
      <div className={s.container}>
        <div {...containerProps} className={s.containerControl}>
          <div className={s.line}>
            {steps.map((step) => {
              return (
                <div
                  className={step.active ? s.lineActive : s.lineInActive}
                  style={{
                    '--line-width': `${step.width}%`,
                  }}
                ></div>
              );
            })}
          </div>

          {pointers.map(({ value, onMouseDown, isActive }, index) => {
            return (
              <Tooltip
                title={value.toString()}
                open={tooltipOpen}
                placement="bottom"
              >
                <button
                  key={index}
                  className={s.button}
                  role="slider"
                  custom={getPercentageForValue(value)}
                  aria-valuenow={value}
                  onMouseDown={(e) => {
                    setTooltipOpen(true);
                    onMouseDown(e, index, e.target);
                  }}
                  style={{
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    '--pointer-left': `${getPercentageForValue(value)}%`,
                  }}
                ></button>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SliderComponent;
