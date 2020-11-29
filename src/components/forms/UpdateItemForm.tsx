import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { Form, Input, Modal } from "antd";
import { Item } from "../../lib/schema";

export const UpdateItemForm = ({
  item,
  visible,
  setVisible,
}: {
  item: Item;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values: string) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={item.name}
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
