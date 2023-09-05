import React, { CSSProperties } from 'react';

export interface ModalProps extends React.PropsWithChildren {
  // Видно ли модальное окно или нет
  open: boolean;

  // Укажите функцию, которая будет вызываться, когда пользователь нажимает кнопку ОК.
  onOk?: () => void;

  // Текст кнопки ОК
  okText?: string;

  // Укажите функцию, которая будет вызываться, когда пользователь нажимает маску, кнопку закрытия в правом верхнем углу или кнопку «Отмена».
  onCancel?: () => void;

  // Текст кнопки «Отмена»
  cancelText?: string;

  // Заголовок модального окна
  title?: string;

  // Содержимое нижнего колонтитула, заданное как footer={false}, если вам не нужны кнопки по умолчанию
  footer?: React.ReactElement[] | boolean;

  // Ширина модального окна
  width?: CSSProperties['width'];

  // Положение модального окна и его дочерних элементов по оси z
  zIndex?: CSSProperties['zIndex'];

  // Стили модального окна
  style?: React.CSSProperties;

  // Дополнительный класс модального окна
  className?: string;
}
