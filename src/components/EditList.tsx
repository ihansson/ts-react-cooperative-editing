import { AddItemForm } from "./AddItemForm";
import { EditorList, Item } from "../lib/schema";
import { getMockEditors, getMockItems } from "../lib/mocks";

export const EditList = () => {
  const items = getMockItems(false);
  return (
    <div>
      <CurrentEditorsMessage editors={getMockEditors()} />
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <EditListItem key={item.id} {...{ item }} />
          ))}
        </ul>
      ) : (
        <p>There are no items currently.</p>
      )}
      <AddItemForm />
    </div>
  );
};

export const EditListItem = ({ item }: { item: Item }) => {
  return (
    <li>
      {item.id} {item.name}
    </li>
  );
};

export const CurrentEditorsMessage = ({ editors }: { editors: EditorList }) => {
  const message =
    editors.length === 0
      ? "There are no editors currently."
      : editors.map((editor) => editor.name).join(", ") +
        " are currently editing this.";
  return <p>{message}</p>;
};
