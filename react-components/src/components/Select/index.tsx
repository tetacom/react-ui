import React, { forwardRef, Ref, useRef, useState } from 'react';
import classNames from 'classnames';
import { useMergeRefs } from '@floating-ui/react';

import { Dropdown, Icon, Input } from 'tetacom/react-components';
import { SelectProps } from './model';
import { BaseSelectProps } from './model/base-select-item';

import s from './style.module.scss';
import listStyle from '../List/style.module.scss';

const SelectInner = forwardRef(
  <T extends BaseSelectProps>(props: SelectProps<T>, ref: any) => {
    const [value, setValue] = useState<T | null>(props?.value ?? null);
    const [open, setOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const foundValue = props.items?.find(({ key }) => key === value?.key);

    const propsClone = { ...props };
    delete propsClone.allowNull;
    delete propsClone.onChangeItem;
    delete propsClone.onItemRender;

    return (
      <Dropdown
        possiblePlacements={['bottom', 'top']}
        placement="bottom"
        autoWidth={true}
        resizable={false}
        open={props.disabled ? false : open}
        onOpenChange={(e) => !props.disabled && setOpen(e)}
        dropdown={
          <ul className={listStyle.list}>
            <>
              {props.items?.map((item) => (
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
              ))}
            </>
          </ul>
        }
      >
        <div style={{ position: 'relative', width: 'max-content' }}>
          <Input
            {...propsClone}
            ref={useMergeRefs([inputRef, ref])}
            value={foundValue?.headline}
            readonly
            rightIcon={{
              icon: (
                <Icon
                  style={{
                    transition: 'transform 0.2s',
                    transform: `rotate(${open ? 180 : 0}deg)`,
                  }}
                  name={'arrowDownKey'}
                />
              ),
            }}
          />
        </div>
      </Dropdown>
    );
  },
);

export const Select = SelectInner as <T extends BaseSelectProps>(
  props: SelectProps<T> & { ref?: Ref<any> },
) => React.ReactElement;
