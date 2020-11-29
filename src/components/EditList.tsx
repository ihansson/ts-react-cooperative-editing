import { AddItemForm } from "./forms/AddItemForm";
import { Item } from "../lib/schema";
import { getMockEditors } from "../lib/mocks";
import { Button, Typography } from "antd";
import { useState } from "react";
import { UpdateItemForm } from "./forms/UpdateItemForm";
import { CurrentEditorsMessage } from "./helpers/CurrentEditorsMessage";
import { useData } from "../lib/api";
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
                <EditListItem key={item.id} {...{ item }} />
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

export const EditListItem = ({ item }: { item: Item }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <li>
      <Title level={4}>
        {item.id} {item.name}
      </Title>
      <p>{item.property}</p>
      <CurrentEditorsMessage editors={getMockEditors()} />
      <Button
        type="primary"
        onClick={() => {
          setModalVisible(true);
        }}
      >
        Edit
      </Button>
      <UpdateItemForm
        {...{ item, visible: modalVisible, setVisible: setModalVisible }}
      />
    </li>
  );
};
