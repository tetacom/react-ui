import { InputProps } from '../../Input/model';

export interface SelectProps extends InputProps {
  items: Array<any>;
  allowNull?: boolean;
}
