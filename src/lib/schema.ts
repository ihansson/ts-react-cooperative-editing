export interface Item {
  id: string;
  name: string;
}

export type ItemList = Array<Item>;

export interface Editor {
  name: string;
}

export type EditorList = Array<Editor>;