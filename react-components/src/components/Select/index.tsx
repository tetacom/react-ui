import React, { forwardRef, Ref, useRef, useState } from 'react';
import classNames from 'classnames';
import { useMergeRefs } from '@floating-ui/react';

import { Dropdown } from '../Dropdown';
import { Icon } from '../Icons';
import { SelectProps } from './model';
import { BaseSelectProps } from './model/base-select-item';
import { Input } from '../Input';
import { Tooltip } from '../Tooltip';

import s from './style.module.scss';
import listStyle from '../List/style.module.scss';

const SelectInner = forwardRef(
  <T extends BaseSelectProps>(props: SelectProps<T>, ref: any) => {
    const [value, setValue] = useState<T | null>(props?.value ?? null);
    const [isOpen, setOpen] = useState<boolean>(false);

    const showSelect = props.open !== undefined ? props.open : isOpen;

    const inputRef = useRef<HTMLInputElement>(null);
    const foundValue = props.items?.find(({ key }) => key === value?.key);

    const getInputProps = ({
      allowNull,
      onChangeItem,
      onItemRender,
      items,
      zIndex,
      ...rest
    }: SelectProps<T>) => rest;

    return (
      <Dropdown
        possiblePlacements={['bottom-start', 'top-start']}
        autoUpdate={{
          ancestorScroll: false,
        }}
        width={{
          type: 'parent',
        }}
        open={props.disabled ? false : showSelect}
        onOpenChange={(e) => !props.disabled && setOpen(e)}
        zIndex={props.zIndex}
        dropdown={
          <ul className={listStyle.list}>
            {props.items?.map((item) => (
              <Tooltip
                key={item.key}
                title={props.onItemRender ? '' : item.headline}
                delay={1000}
              >
                <li
                  role="option"
                  aria-selected
                  className={classNames([
                    listStyle.item,
                    item === foundValue ? s.selected : null,
                  ])}
                  onClick={() => {
                    setValue(item);
                    setOpen(false);
                    props.onChangeItem && props.onChangeItem(item);
                  }}
                >
                  {props.onItemRender ? (
                    <div className={listStyle.textHeadline}>
                      {props.onItemRender(item)}
                    </div>
                  ) : (
                    <span className={listStyle.textHeadline}>
                      {item.headline}
                    </span>
                  )}
                </li>
              </Tooltip>
            ))}
          </ul>
        }
      >
        <div style={{ position: 'relative' }}>
          <Tooltip title={foundValue?.headline ?? ''} delay={1000}>
            <Input.Text
              {...getInputProps(props)}
              style={{ width: '100%', ...props.style }}
              ref={useMergeRefs([inputRef, ref])}
              value={foundValue?.headline}
              readonly
              rightIcon={{
                icon: (
                  <Icon
                    style={{
                      transition: 'transform 0.2s',
                      transform: `rotate(${showSelect ? 180 : 0}deg)`,
                    }}
                    name={'arrowDownKey'}
                  />
                ),
              }}
            />
          </Tooltip>
        </div>
      </Dropdown>
    );
  },
);

export const Select = SelectInner as <T extends BaseSelectProps>(
  props: SelectProps<T> & { ref?: Ref<any> },
) => React.ReactElement;
