import { EditorList } from "../../lib/schema";

export const CurrentEditorsMessage = ({ editors }: { editors: EditorList }) => {
  const message =
    editors.length === 0
      ? "No one is editing this."
      : editors.map((editor) => editor.name).join(", ") +
        " are currently editing this.";
  return <p>{message}</p>;
};
