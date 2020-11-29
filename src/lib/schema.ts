export interface Item {
  id: string;
  name: string;
  property: string;
  editors: EditorList;
}

export type ItemList = Array<Item>;

export interface Editor {
  id: string;
  name: string;
}

export type EditorList = Array<Editor>;
