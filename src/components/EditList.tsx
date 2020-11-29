import { AddItemForm } from "./forms/AddItemForm";
import { Item } from "../lib/schema";
import { getMockEditors, getMockItems } from "../lib/mocks";
import { Button, Typography } from "antd";
import { useState } from "react";
import { UpdateItemForm } from "./forms/UpdateItemForm";
import { CurrentEditorsMessage } from "./helpers/CurrentEditorsMessage";

const { Title } = Typography;

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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <li>
      <Title level={4}>
        {item.id} {item.name}
      </Title>
      <p>{item.property}</p>
      <CurrentEditorsMessage editors={item.editors} />
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
