import React, { FC } from 'react';
import classNames from 'classnames';

import { Checkbox } from '../Checkbox';
import { ListProps } from './model';
import { getTextBlockWidth } from './getTextBlockWidth';
import { ListItem } from './model/listItem';

import s from './style.module.scss';

export const List: FC<ListProps> = ({ items, ...props }) => {
  return (
    <ul className={s.list}>
      {items.map((item) => (
        <Item key={item.keyValue} {...item} {...props} />
      ))}
    </ul>
  );
};

export const Item: FC<
  ListItem &
    Pick<
      ListProps,
      'divider' | 'onClick' | 'checked' | 'imageRound' | 'imageSize'
    >
> = ({
  keyValue,
  divider = true,
  onClick,
  checked = false,
  picture,
  disabled,
  imageRound = true,
  imageSize = 'small',
  leftIcon,
  rightIcon,
  caption,
  headline,
}) => {
  return (
    <li
      onClick={() =>
        onClick
          ? onClick({
              headline,
              keyValue,
              caption,
              disabled,
              leftIcon,
              picture,
              rightIcon,
            })
          : onClick
      }
      className={classNames(
        s.item,
        divider && s.itemDivider,
        disabled && s.itemDisabled,
      )}
    >
      {checked && (
        <span className={s.checkbox}>
          <Checkbox />
        </span>
      )}

      {picture && (
        <span
          className={classNames(
            s.picture,
            imageSize === 'large' && s.pictureLarge,
            imageRound && s.pictureRound,
          )}
        >
          <img src={picture} alt="" />
        </span>
      )}

      {leftIcon && <span className={s.leftIcon}>{leftIcon}</span>}

      <span
        className={s.text}
        style={{
          maxWidth: getTextBlockWidth(
            {
              checkbox: checked,
              picture: Boolean(picture),
              leftIcon: Boolean(leftIcon),
              rightIcon: Boolean(rightIcon),
            },
            imageSize,
          ),
        }}
      >
        <span className={s.textHeadline}>{headline}</span>

        {caption && <span className={s.textCaption}>{caption}</span>}
      </span>

      {rightIcon && <span className={s.rightIcon}>{rightIcon}</span>}
    </li>
  );
};
