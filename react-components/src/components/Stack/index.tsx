import React, { Children, FC } from 'react';
import classNames from 'classnames';

import { StackProps } from './model';

import s from './style.module.scss';

export const Stack: FC<StackProps> = ({
  direction = 'row',
  align = 'center',
  size = 24,
  divider = false,
  wrap = false,
  block = false,
  className = '',
  children,
}) => {
  const isColumnDirection =
    direction === 'column' || direction === 'column-reverse';
  const gapSize = divider ? size / 2 : size;

  return (
    <div
      className={classNames(
        s.stack,
        isColumnDirection && s.stackColumnDirection,
        wrap && s.stackWrap,
        block && s.stackBlock,
        className,
      )}
      style={{
        flexDirection: direction,
        gap: gapSize,
        alignItems: align,
      }}
    >
      {Children.map(children, (child, index) => {
        const dividerElement =
          Children.count(children) !== index + 1 ? (
            <div className={s.divider} />
          ) : null;

        return (
          <>
            <div>{child}</div>

            {divider && dividerElement}
          </>
        );
      })}
    </div>
  );
};
