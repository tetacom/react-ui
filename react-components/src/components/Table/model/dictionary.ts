type DictionaryType = {
  id: string | number;
  name: string;
  parentId?: string | null;
  iconId?: string | null;
};

export interface IDictionary {
  [key: string]: DictionaryType[];
}
