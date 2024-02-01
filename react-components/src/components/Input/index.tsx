import React, { forwardRef, useState, useRef, FC } from 'react';
import classNames from 'classnames';

import {
  InputProps,
  InputRef,
  TextareaProps,
  TextareaRef,
  ShapeType,
  SizeType,
} from './model';
import { Typography } from '../Typography';
import { Icon } from '../Icons';

import s from './style.module.scss';

const sizeClasses: Record<SizeType, string> = {
  large: s.fieldSizeLarge,
  middle: s.fieldSizeMiddle,
  small: s.fieldSizeSmall,
};
const shapeClasses: Record<ShapeType, string> = {
  brick: s.fieldShapeBrick,
  round: s.fieldShapeRound,
  circle: s.fieldShapeCircle,
};

const inputComponent = <
  Props extends InputProps | TextareaProps,
  Ref extends HTMLInputElement | HTMLTextAreaElement,
>({
  props: {
    defaultValue = '',
    value,
    size = 'middle',
    shape = 'round',
    label = '',
    labelPosition = 'top',
    placeholder = 'Placeholder',
    errorMessage = '',
    disabled = false,
    maxLength = 0,
    leftIconName = '',
    rightIcons = [],
    onChange,
    onPressEnter,
    onKeyDown,
    className,
    style,
    readonly = false,
    ...props
  },
  ref,
  element,
}: {
  props: Props;
  ref: React.ForwardedRef<Ref>;
  element: 'input' | 'textarea';
}) => {
  const inputWrapperRef = useRef<HTMLSpanElement>(null);
  const [inputValue, setInputValue] = useState(defaultValue);

  const finalValue = value !== undefined ? String(value) : inputValue;

  const handleChange = (event: React.ChangeEvent<Ref>) => {
    const value = event.target.value;
    const lengthDiff = maxLength - value.length;

    if (maxLength && lengthDiff < 0) {
      const prevValue = value.slice(0, -1);
      setInputValue(prevValue);
      onChange && onChange(prevValue);
    } else {
      setInputValue(value);
      if (onChange) {
        onChange(value);
      }
    }
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onKeyDown?.(event as any);
    if (event.key === 'Enter') {
      onPressEnter && onPressEnter(event);
    }
  };

  const isFieldFull = maxLength - finalValue.length <= 0;
  const isErrorStatus = errorMessage || (maxLength && isFieldFull);
  const notEdit = disabled || readonly;

  const rightIconsNumber = {
    '--right-icons-number': rightIcons?.length,
  } as React.CSSProperties;

  return (
    <div
      className={classNames(
        s.input,
        labelPosition === 'left' && s.inputHorizontal,
      )}
      style={{ ...style, height: props.height === '100%' ? '100%' : 'auto' }}
    >
      {label && (
        <label htmlFor={props.id} className={s.label}>
          {label}
        </label>
      )}

      <span
        ref={inputWrapperRef}
        className={classNames(
          s.field,
          element === 'input' && sizeClasses[size],
          shapeClasses[shape],
          leftIconName && s.fieldLeftIcon,
          s.fieldRightIcon,
          element === 'textarea' && s.fieldTextarea,
        )}
        style={rightIconsNumber}
      >
        {React.createElement(element, {
          ...props,
          ref,
          className: classNames(
            s.fieldTag,
            finalValue && s.fieldTagHasValue,
            isErrorStatus && s.fieldTagHasError,
            className,
          ),
          value: finalValue,
          onChange: handleChange,
          onKeyDown: handleEnterKeyPress,
          disabled: disabled,
          readOnly: readonly,
          style: {
            resize: 'none',
            height: props.height,
          },
        })}

        <span className={s.placeholder}>
          <span>{placeholder}</span>
        </span>

        {leftIconName && (
          <span className={s.icon}>
            <Icon name={leftIconName} size={16} />
          </span>
        )}

        <div className={s.rightIcons}>
          {rightIcons?.map((item) => (
            <button
              key={item.key}
              className={s.rightIconsItem}
              disabled={notEdit}
            >
              {item}
            </button>
          ))}
        </div>
      </span>

      {(errorMessage || Boolean(maxLength)) && (
        <div className={s.footer}>
          <span>
            {errorMessage && (
              <Typography.Text fontVariant="caption" className={s.errorMessage}>
                {errorMessage}
              </Typography.Text>
            )}
          </span>

          {Boolean(maxLength) && (
            <Typography.Text
              fontVariant="caption"
              className={classNames(
                s.maxLength,
                isFieldFull ? s.maxLengthError : s.maxLengthSuccess,
              )}
            >
              {`${finalValue.length}/${maxLength}`}
            </Typography.Text>
          )}
        </div>
      )}
    </div>
  );
};

const TextInputComponent = forwardRef<InputRef, InputProps>((props, ref) => {
  return inputComponent<InputProps, InputRef>({ props, ref, element: 'input' });
});

const TextareaComponent = forwardRef<TextareaRef, TextareaProps>(
  (props, ref) => {
    return inputComponent<TextareaProps, TextareaRef>({
      props,
      ref,
      element: 'textarea',
    });
  },
);

interface InputComposition extends InputProps {
  Text: typeof TextInputComponent;
  Textarea: typeof TextareaComponent;
}

const Input: FC<InputProps> & InputComposition = ({ ...props }) => {
  return <TextInputComponent {...props} />;
};

Input.Text = TextInputComponent;
Input.Textarea = TextareaComponent;

export { Input };
