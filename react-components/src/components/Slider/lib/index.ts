export const roundToStep = (
  val: number,
  min: number,
  max: number,
  step: number,
) => {
  let left = min;
  let right = max;

  while (left < val && left + step < val) {
    left += step;
  }

  right = Math.min(left + step, max);

  if (val - left < right - val) {
    return left;
  }
  return right;
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
