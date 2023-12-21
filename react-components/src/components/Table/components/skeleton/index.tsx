import { TableProps } from '../../model';

export type SkeletonProps<T = any> = {
  skeleton: React.ReactElement<any> | null;
} & React.PropsWithChildren;

export function Skeleton(props: SkeletonProps) {
  if (props.skeleton) {
    return props.skeleton;
  }

  return props.children;
}
