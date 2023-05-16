import { ListItem } from './listItem';

export interface ListProps {
  // Содержание пунктов списка
  items: ListItem[];

  // Размер изображений
  imageSize?: 'small' | 'large';

  // Скругление изображений
  imageRound?: boolean;

  // Установить разделительные линии
  divider?: boolean;

  // Можно ли выбирать несколько пунков списка
  checked?: boolean;
}
