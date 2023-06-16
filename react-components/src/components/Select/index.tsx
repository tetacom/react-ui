import React, { forwardRef, useRef, useState } from 'react';
import { SelectProps } from './model';
import { Dropdown, Icon, Input } from 'tetacom/react-components';
import { useMergeRefs } from '@floating-ui/react';
import s from './style.module.scss';
import listStyle from '../List/style.module.scss';
import classNames from 'classnames';

export const Select = forwardRef<any, SelectProps>((props, ref) => {
  const [value, setValue] = useState<any>(props.value);
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const foundValue = props.items?.find((item) => item === value);

  return (
    <Dropdown
      possiblePlacements={['bottom', 'top']}
      placement="bottom"
      autoWidth={true}
      open={props.disabled ? false : open}
      onOpenChange={(e) => !props.disabled && setOpen(e)}
      dropdown={
        <ul className={listStyle.list}>
          <>
            {props.items?.map((item, index) => (
              <li
                key={item.key}
                role="option"
                className={classNames([
                  listStyle.item,
                  item === foundValue ? s.selected : null,
                ])}
                onClick={() => {
                  setValue(item);
                  setOpen(false);
                  props.onClick && props.onClick(item);
                }}
              >
                <span className={listStyle.textHeadline}>{item.headline}</span>
              </li>
            ))}
          </>
        </ul>
      }
    >
      <div style={{ position: 'relative' }}>
        <Input
          {...props}
          tabIndex={0}
          ref={useMergeRefs([inputRef, ref])}
          value={foundValue?.headline}
          readonly
        ></Input>
        <div className={s.arrow}>
          <Icon
            style={{
              color: props.disabled
                ? 'var(--color-text-20)'
                : 'var(--color-text-50)',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            name={'arrowDownKey'}
          />
        </div>
      </div>
    </Dropdown>
  );
});
