import { ListItem } from './listItem';

export interface ListProps {
  items: ListItem[];
  imageSize?: 'small' | 'large';
  imageRound?: boolean;
  divider?: boolean;
}
