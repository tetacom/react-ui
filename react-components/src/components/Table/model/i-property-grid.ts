export interface IPropertyGrid<T> {
  value: T;
  onChange?: (value: T) => void;
}
