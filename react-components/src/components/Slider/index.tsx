import React, { useState } from 'react';

import { useSlider } from './hooks/useSlider';
import { Tooltip } from '../Tooltip';
import { SliderProps } from './model';

import s from './Slider.module.scss';

export function Slider(props: SliderProps) {
  const [sliderRef, pointers, steps, getPercentageForValue] = useSlider({
    min: props.min,
    max: props.max,
    step: props.step,
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
            {steps.map((step, index) => {
              const styles = {
                '--line-width': `${step.width}%`,
              } as React.CSSProperties;
              return (
                <div
                  key={index}
                  className={step.active ? s.lineActive : s.lineInActive}
                  style={styles}
                ></div>
              );
            })}
          </div>

          {pointers.map(({ value, onMouseDown, isActive }, index) => {
            const styles = {
              '--pointer-left': `${getPercentageForValue(value)}%`,
            } as React.CSSProperties;
            return (
              <Tooltip
                key={index}
                title={value.toString()}
                open={tooltipOpen}
                placement="bottom"
              >
                <button
                  key={index}
                  className={s.button}
                  role="slider"
                  aria-valuenow={value}
                  onMouseDown={(e) => {
                    setTooltipOpen(true);
                    onMouseDown(e, index);
                  }}
                  style={{
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    ...styles,
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
