import { Slider } from '../model';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { getValueForClientX, roundToStep } from '../lib';

export type SliderPointer = {
  value: number;
  isActive: boolean;
  onMouseDown: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    ref: EventTarget,
  ) => void;
};

export type SliderSteps = {
  left: number;
  width: number;
  active: boolean;
};

export const sortList = (arr: ReadonlyArray<number | string>) =>
  [...arr].map(Number).sort((a, b) => a - b);

export function useSlider(
  props: Slider,
): [
  React.RefObject<HTMLDivElement>,
  Array<SliderPointer>,
  Array<SliderSteps>,
  (value: number) => number,
  Array<number>,
] {
  const sliderRef = useRef<HTMLDivElement>(null);
  const boundingRect = useRef<DOMRect | null>(null);
  const activeIndex = useRef<null | number>(null);
  const [innerValues, setInnerValues] = useState<Array<number>>(props.values);

  const { min = 0, max = 100, step = 1 } = props;

  const minValue = max > min ? min : 0;
  const maxValue = max > min ? max : 100;

  useLayoutEffect(() => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (rect) {
      boundingRect.current = rect;
    }
  }, []);

  const getPercentageForValue = useCallback(
    (currentValue: number) => {
      return Math.max(
        0,
        Math.min(
          100,
          ((currentValue - minValue) / (maxValue - minValue)) * 100,
        ),
      );
    },
    [minValue, maxValue],
  );

  const handleDrag = (e: MouseEvent) => {
    if (activeIndex.current === null && !boundingRect.current) {
      return;
    }

    const newValue = getValueForClientX(
      e.clientX,
      boundingRect,
      minValue,
      maxValue,
    );
    const roundedNewValue = roundToStep(newValue, minValue, maxValue, step);

    const values = [...innerValues];

    const newValues = sortList([
      ...values.slice(0, activeIndex.current!),
      roundedNewValue,
      ...values.slice(activeIndex.current! + 1),
    ]);

    setInnerValues(newValues);

    props.onChange?.(newValues);
  };

  const handleRelease = () => {
    document.removeEventListener('mousemove', handleDrag);
    props.onMouseUp?.();
  };
  const handlePress = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    eventTarget: EventTarget,
  ) => {
    activeIndex.current = index;
    setInnerValues([...sortList(innerValues)]);

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleRelease);
  };

  const pointers: Array<SliderPointer> = innerValues.map((value, index) => {
    return {
      value,
      isActive: index === activeIndex.current,
      onMouseDown: (
        e: React.MouseEvent<HTMLButtonElement>,
        index: number,
        eventTarget: EventTarget,
      ) => handlePress(e, index, eventTarget),
    };
  });

  const steps: Array<SliderSteps> = [...innerValues, maxValue].map(
    (value, index, values) => {
      const previousValue = innerValues[index - 1];
      const leftValue = previousValue !== undefined ? previousValue : minValue;
      const left = getPercentageForValue(leftValue);
      const width = getPercentageForValue(value) - left;

      let active;

      if (values.length === 2) {
        active = index === 0;
      } else {
        active =
          !(values[index - 1] === undefined && index === 0) &&
          !(values[index + 1] === undefined && index === values.length - 1);
      }

      return {
        left,
        width,
        active,
      };
    },
  );

  return [sliderRef, pointers, steps, getPercentageForValue, innerValues];
}
