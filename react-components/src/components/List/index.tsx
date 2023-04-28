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
  divider,
}) => {
  return (
    <ul className={s.list}>
      {items.map(
        ({
          key,
          headline,
          caption = '',
          picture = '',
          leftIcon = null,
          rightIcon = null,
          checkbox = false,
          disabled = false,
        }) => (
          <li
            key={key}
            className={classNames(
              s.item,
              divider && s.itemDivider,
              disabled && s.itemDisabled,
            )}
          >
            {checkbox && (
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
                maxWidth: getTextBlockWidth({
                  checkbox,
                  picture: Boolean(picture),
                  leftIcon: Boolean(leftIcon),
                  rightIcon: Boolean(rightIcon),
                }),
              }}
            >
              <span className={s.textHeadline}>{headline}</span>

              {caption && <span className={s.textCaption}>Caption</span>}
            </span>

            {rightIcon && <span className={s.rightIcon}>{rightIcon}</span>}
          </li>
        ),
      )}
    </ul>
  );
};
