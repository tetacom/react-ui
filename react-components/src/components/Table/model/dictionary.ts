export interface IIdName<T> {
  id: T;
  name: string;
}

export interface IDictionary<T> {
  [key: string]: Array<IIdName<T>>;
}
