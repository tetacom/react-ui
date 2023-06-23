export type Dictionary = {
  id: string | number;
  name: string;
  parentId: string | null;
  iconId: string | null;
};

export type DictionaryType = {
  [key: string]: Dictionary[];
};
