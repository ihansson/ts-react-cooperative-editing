import { EditorList } from "../../lib/schema";

export const CurrentEditorsMessage = ({ editors }: { editors: EditorList }) => {
  if (editors.length === 0) return <p>No one is editing this.</p>;
  const message =
    editors.length === 1
      ? editors[0].name + " is editing this."
      : editors.map((editor) => editor.name).join(", ") +
        " are currently editing this.";
  return <p>{message}</p>;
};
