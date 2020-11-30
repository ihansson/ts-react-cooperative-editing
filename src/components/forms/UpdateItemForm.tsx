import { Form, Input, Modal } from "antd";
import { Item } from "../../lib/schema";
import { useUpdateItem } from "../../lib/api";
import { FormNotices } from "../helpers/FormNotices";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const UpdateItemForm = ({
  item,
  visible,
  onClose,
}: {
  item: Item;
  visible: boolean;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();

  const [error, loading, success, updateItem] = useUpdateItem(
    "3NNo2ftgILZTdN2nWDzU"
  );

  const onFinish = async (values: any) => {
    await updateItem(item.id, values);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onClose();
  };

  return (
    <Modal
      title={item.name}
      visible={visible}
      onOk={() => {
        form.validateFields().then((values) => {
          onFinish(values);
        });
      }}
      onCancel={() => {
        onClose();
      }}
    >
      <FormNotices {...{ error, loading, success }} />
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelAlign="left"
      >
        <Form.Item
          label="Property"
          name="property"
          initialValue={item.property}
          rules={[{ required: true, message: "Please enter a property" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
