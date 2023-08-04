import React, { Children, FC } from 'react';
import classNames from 'classnames';

import { Divider } from '../Divider';
import { StackProps } from './model';
import { getGaps } from './utils/getGaps';

import s from './style.module.scss';

export const Stack: FC<StackProps> = ({
  direction = 'row',
  justifyContent = 'flex-start',
  align = 'center',
  size,
  divider = false,
  wrap = false,
  block = false,
  className = '',
  style,
  children,
}) => {
  const isColumnDirection =
    direction === 'column' || direction === 'column-reverse';
  const { verticalGap, horizontalGap } = getGaps(size);
  const gap = divider
    ? `${verticalGap}px ${horizontalGap / 2}px`
    : `${verticalGap}px ${horizontalGap}px`;

  return (
    <div
      className={classNames(
        s.stack,
        isColumnDirection && s.columnDirection,
        wrap && s.wrapper,
        block && s.block,
        className,
      )}
      style={{
        ...style,
        flexDirection: direction,
        gap,
        justifyContent: justifyContent,
        alignItems: align,
      }}
    >
      {Children.map(children, (child, index) => {
        let existNextChild = Children.count(children) - 1 !== index;
        if (Children.count(children) - 2 === index) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          existNextChild = Boolean(children[index + 1]);
        }

        const dividerType = isColumnDirection ? 'horizontal' : 'vertical';
        const dividerElement = existNextChild ? (
          <div className={s.divider}>
            {isBoolean(divider) ? (
              <Divider length="var(--spacing-16)" type={dividerType} />
            ) : (
              divider
            )}
          </div>
        ) : null;

        if (!child) return null;

        return (
          <>
            <div className={s.childWrapper}>{child}</div>

            {divider && dividerElement}
          </>
        );
      })}
    </div>
  );
};

function isBoolean(value: StackProps['divider']): value is boolean {
  return typeof value === 'boolean';
}
