export type ToggleRef = HTMLButtonElement;

export interface ToggleProps {
  // Установить ли начальное состояние
  defaultChecked?: boolean;

  // Определить, отмечен ли переключатель
  checked?: boolean;

  // Отключить переключатель
  disabled?: boolean;

  // Состояние загрузки переключателя
  loading?: boolean;

  // Получать ли фокус при монтировании компонента
  autoFocus?: boolean;

  // Дополнительный класс для Toggle
  className?: string;

  // Триггер, когда состояние изменяется
  onChange?: (checked: boolean) => void;
}
