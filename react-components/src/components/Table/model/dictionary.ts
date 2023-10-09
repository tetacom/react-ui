export interface IIdName {
  id: number;
  name: string;
  parentId?: number | null;
  iconId?: number | null;
}

export interface IDictionary {
  [key: string]: Array<IIdName>;
}
