import { Editor, EditorList, Item, ItemList } from "./schema";

export function getMockItems(return_empty = false) {
  if (return_empty) return [] as ItemList;
  return [
    { id: "1", name: "Banana" } as Item,
    { id: "2", name: "Apple" } as Item,
  ] as ItemList;
}

export function getMockEditors(return_empty = false) {
  if (return_empty) return [] as EditorList;
  return [{ name: "Amy" } as Editor, { name: "Bob" } as Editor] as EditorList;
}
