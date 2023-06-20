import React, { FC } from 'react';
import classNames from 'classnames';

import { Checkbox } from '../Checkbox';
import { ListProps } from './model';
import { getTextBlockWidth } from './getTextBlockWidth';
import s from './style.module.scss';

export const List: FC<ListProps> = ({
  items,
  imageSize = 'small',
  imageRound = true,
  divider = true,
  checked = false,
  onClick,
}) => {
  return (
    <ul className={s.list}>
      {items.map((item) => (
        <li
          key={item.key}
          onClick={() => (onClick ? onClick(item) : onClick)}
          className={classNames(
            s.item,
            divider && s.itemDivider,
            item.disabled && s.itemDisabled,
          )}
        >
          {checked && (
            <span className={s.checkbox}>
              <Checkbox />
            </span>
          )}

          {item.picture && (
            <span
              className={classNames(
                s.picture,
                imageSize === 'large' && s.pictureLarge,
                imageRound && s.pictureRound,
              )}
            >
              <img src={item.picture} alt="" />
            </span>
          )}

          {item.leftIcon && <span className={s.leftIcon}>{item.leftIcon}</span>}

          <span
            className={s.text}
            style={{
              maxWidth: getTextBlockWidth(
                {
                  checkbox: checked,
                  picture: Boolean(item.picture),
                  leftIcon: Boolean(item.leftIcon),
                  rightIcon: Boolean(item.rightIcon),
                },
                imageSize,
              ),
            }}
          >
            <span className={s.textHeadline}>{item.headline}</span>

            {item.caption && <span className={s.textCaption}>Caption</span>}
          </span>

          {item.rightIcon && (
            <span className={s.rightIcon}>{item.rightIcon}</span>
          )}
        </li>
      ))}
    </ul>
  );
};
