export type ContextMenuProps = {
  // Контролируемое открытие
  open?: boolean;

  openChange?: (open: boolean) => void;

  // Нода на которой будем вызывать контекстное меню
  nodeRef?: React.RefObject<HTMLDivElement>;
};
