import React, { useState } from 'react';

import { useSlider } from './hooks/useSlider';
import { Tooltip } from '../Tooltip';
import { SliderProps } from './model';

import s from './style.module.scss';

export function Slider({
  min,
  max,
  step,
  values,
  onChange,
  tooltipPlacement = 'bottom',
}: SliderProps) {
  const [sliderRef, pointers, steps, getPercentageForValue] = useSlider({
    min,
    max,
    step,
    values,
    onMouseUp: () => {
      setTooltipOpen(false);
    },
    onChange: (values) => {
      onChange?.(values);
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
    <div className={s.slider}>
      <div {...containerProps} className={s.sliderControl}>
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
              />
            );
          })}
        </div>

        {pointers.map(({ value: point, onMouseDown }, index) => {
          const { key, value } = point;
          const styles = {
            '--pointer-left': `${getPercentageForValue(value)}%`,
          } as React.CSSProperties;

          return (
            <Tooltip
              key={index}
              title={value.toString()}
              open={tooltipOpen}
              placement={tooltipPlacement}
            >
              <button
                type="button"
                key={index}
                className={s.button}
                role="slider"
                aria-valuenow={value}
                onMouseDown={(e) => {
                  setTooltipOpen(true);
                  onMouseDown(e, index, key);
                }}
                style={styles}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
