import firebase from "firebase/app";
import { AddItemForm } from "./forms/AddItemForm";
import { EditorList, Editor, Item } from "../lib/schema";
import { Button, Typography } from "antd";
import { useCallback, useState } from "react";
import { UpdateItemForm } from "./forms/UpdateItemForm";
import { CurrentEditorsMessage } from "./helpers/CurrentEditorsMessage";
import { useData, useUpdateEditors } from "../lib/api";
import { FormNotices } from "./helpers/FormNotices";

const { Title } = Typography;

export const EditList = () => {
  const [error, loading, success, data] = useData("3NNo2ftgILZTdN2nWDzU");

  return (
    <div>
      <FormNotices {...{ error, loading, success }} />
      {success && (
        <div>
          <CurrentEditorsMessage editors={data.editors} />
          {data.items.length > 0 ? (
            <ul>
              {data.items.map((item) => (
                <EditListItem
                  key={item.id}
                  {...{
                    item,
                    editors: data.editors.filter(
                      (editor: Editor) => editor.editing === item.id
                    ),
                  }}
                />
              ))}
            </ul>
          ) : (
            <p>There are no items currently.</p>
          )}
        </div>
      )}
      <AddItemForm />
    </div>
  );
};

export const EditListItem = ({
  item,
  editors,
}: {
  item: Item;
  editors: EditorList;
}) => {
  const [, , , updateEditors] = useUpdateEditors("3NNo2ftgILZTdN2nWDzU");
  const [modalVisible, setModalVisible] = useState(false);

  function onOpen() {
    setModalVisible(true);
    updateEditors(firebase.auth().currentUser?.uid as string, {
      editing: item.id,
    });
  }

  const onClose = useCallback(() => {
    updateEditors(firebase.auth().currentUser?.uid as string, {
      editing: "",
    });
    setModalVisible(false);
  }, [updateEditors]);

  return (
    <li>
      <Title level={4}>{item.name}</Title>
      <p>{item.property}</p>
      <CurrentEditorsMessage editors={editors} />
      <Button type="primary" onClick={onOpen} disabled={editors.length > 0}>
        Edit
      </Button>
      <UpdateItemForm
        {...{
          item,
          visible: modalVisible,
          onClose: onClose,
        }}
      />
    </li>
  );
};
