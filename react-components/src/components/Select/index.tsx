import React, {
  forwardRef,
  Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
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

    const [searchValue, setSearchValue] = useState<string>(
      value?.headline ?? '',
    );
    const handleTypeSearch = (inputValue: string) => {
      setSearchValue(inputValue);
    };
    const handleFocus = () => {
      setOpen(true);
    };

    const getInputProps = ({
      allowNull,
      onChangeItem,
      onItemRender,
      items,
      zIndex,
      ...rest
    }: SelectProps<T>) => rest;

    const handleChange = (item: T | null) => {
      setValue(item);
      setSearchValue(item?.headline ?? '');
      setOpen(false);
      props.onChangeItem && props.onChangeItem(item);
    };
    const handleClear = () => {
      handleChange(null);
    };

    const inputWrapperId = useId();
    useEffect(() => {
      if (isOpen) {
        document
          .getElementById(inputWrapperId)
          ?.querySelector('input')
          ?.focus();
      }
    }, [isOpen]);

    const rightIcons = [
      <Icon
        key="arrowDownKey"
        name="arrowDownKey"
        style={{
          transition: 'transform 0.2s',
          transform: `rotate(${showSelect ? 180 : 0}deg)`,
        }}
      />,
    ];
    if (props.allowNull && value) {
      rightIcons.unshift(
        <Icon key="clear" name="closeBig" onClick={handleClear} />,
      );
    }

    const filteredItems = props.items;

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
            {filteredItems.length !== 0 ? (
              filteredItems.map((item) => (
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
                      handleChange(item);
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
              ))
            ) : (
              <li
                role="option"
                aria-selected
                className={listStyle.item}
                style={{ pointerEvents: 'none' }}
              >
                <span className={listStyle.textHeadline}>Нет вариантов</span>
              </li>
            )}
          </ul>
        }
      >
        <div
          style={{
            position: 'relative',
            height: props.height,
          }}
        >
          <Tooltip title={foundValue?.headline ?? ''} delay={1000}>
            <div id={inputWrapperId}>
              <Input.Text
                {...getInputProps(props)}
                height="100%"
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  ...props.style,
                }}
                ref={useMergeRefs([inputRef, ref])}
                value={searchValue}
                onChange={handleTypeSearch}
                onFocus={handleFocus}
                rightIcons={rightIcons}
              />
            </div>
          </Tooltip>
        </div>
      </Dropdown>
    );
  },
);

export const Select = SelectInner as <T extends BaseSelectProps>(
  props: SelectProps<T> & { ref?: Ref<any> },
) => React.ReactElement;
