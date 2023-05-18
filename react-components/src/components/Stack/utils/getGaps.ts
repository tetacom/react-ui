import { StackProps } from '../model';

export function getGaps(size: StackProps['size'] = 12) {
  let verticalGap: number;
  let horizontalGap: number;

  if (Array.isArray(size)) {
    verticalGap = size[0];
    horizontalGap = size[1];
  } else {
    verticalGap = size;
    horizontalGap = size;
  }

  return {
    verticalGap,
    horizontalGap,
  };
}
