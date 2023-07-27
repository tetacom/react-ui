import React from 'react';
import { SliderPoint } from '../model/point';

export const roundToStep = (
  val: number,
  min: number,
  max: number,
  step: number,
  activeKey: string,
): SliderPoint => {
  let left = min;

  while (left < val && left + step < val) {
    left += step;
  }

  const right = Math.min(left + step, max);
  const resulValue = val - left < right - val ? left : right;

  return { key: activeKey, value: resulValue };
};

export const getValueForClientX = (
  clientX: number,
  rect: React.RefObject<DOMRect>,
  min: number,
  max: number,
): number => {
  const { left, width } = rect.current!;
  const percentageValue = (clientX - Math.ceil(left)) / Math.ceil(width);
  const value = (max - min) * percentageValue;

  return value + min;
};
