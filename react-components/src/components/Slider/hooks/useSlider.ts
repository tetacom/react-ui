import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { SliderProps } from '../model';
import { getValueForClientX, roundToStep } from '../lib';
import { SliderPoint } from '../model/point';

export type SliderPointer = {
  value: SliderPoint;
  isActive: boolean;
  onMouseDown: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    key: string,
  ) => void;
};

export type SliderSteps = {
  left: number;
  width: number;
  active: boolean;
};

interface SliderHook extends SliderProps {
  onMouseUp: () => void;
}

export function useSlider({
  min = 0,
  max = 100,
  step = 1,
  values,
  onChange,
  onMouseUp,
}: SliderHook): [
  React.RefObject<HTMLDivElement>,
  Array<SliderPointer>,
  Array<SliderSteps>,
  (value: number) => number,
  SliderProps['values'],
] {
  const sliderRef = useRef<HTMLDivElement>(null);
  const boundingRect = useRef<DOMRect | null>(null);
  const activeIndex = useRef<null | number>(null);
  const activeKey = useRef<null | string>(null);
  const [innerValues, setInnerValues] = useState<SliderProps['values']>(values);

  const minValue = max > min ? min : 0;
  const maxValue = max > min ? max : 100;

  useEffect(() => {
    setInnerValues(values);
  }, [values]);

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

    const roundedNewValue = roundToStep(
      newValue,
      minValue,
      maxValue,
      step,
      activeKey.current!,
    );

    const values = [...innerValues];
    const newValues = sortList([
      ...values.slice(0, activeIndex.current!),
      roundedNewValue,
      ...values.slice(activeIndex.current! + 1),
    ]);

    setInnerValues(newValues);

    onChange?.(newValues);
  };

  const handleRelease = () => {
    document.removeEventListener('mousemove', handleDrag);
    onMouseUp?.();
  };
  const handlePress = (
    _: React.MouseEvent<HTMLButtonElement>,
    index: number,
    key: string,
  ) => {
    activeIndex.current = index;
    activeKey.current = key;
    setInnerValues([...sortList(innerValues)]);

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleRelease);
  };

  const pointers: Array<SliderPointer> = innerValues.map((value, index) => {
    return {
      value,
      isActive: index === activeIndex.current,
      onMouseDown: (e: React.MouseEvent<HTMLButtonElement>, index: number) =>
        handlePress(e, index, activeKey.current!),
    };
  });

  const steps: Array<SliderSteps> = [
    ...innerValues.map(({ value }) => value),
    maxValue,
  ].map((value, index, values) => {
    const previousValue = innerValues[index - 1];
    const leftValue =
      previousValue !== undefined ? previousValue.value : minValue;
    const left = getPercentageForValue(leftValue);
    const width = getPercentageForValue(value) - left;
    const isSingle = values.length === 2;
    let active;

    if (isSingle) {
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
  });

  return [sliderRef, pointers, steps, getPercentageForValue, innerValues];
}

function sortList(arr: SliderProps['values']): SliderProps['values'] {
  return [...arr].sort((a, b) => a.value - b.value);
}
