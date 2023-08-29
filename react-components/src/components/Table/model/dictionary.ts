type DictionaryType = {
  id: string | number;
  name: string;
  parentId?: string | null;
  iconId?: string | null;
};

export interface IIdName<T> {
  id: T;
  name: string;
}

export interface IDictionary<T> {
  [key: string]: Array<IIdName<T>>;
}
