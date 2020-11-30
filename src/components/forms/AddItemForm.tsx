import { Button, Card, Form, Input, Typography } from "antd";
import { useCreateItem } from "../../lib/api";
import { FormNotices } from "../helpers/FormNotices";
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const AddItemForm = () => {
  const [form] = Form.useForm();

  const [error, loading, success, createItem] = useCreateItem(
    "3NNo2ftgILZTdN2nWDzU"
  );

  const onFinish = (values: string) => {
    createItem(values);
    form.resetFields();
  };

  return (
    <Card>
      <FormNotices {...{ error, loading, success }} />
      <Title level={3}>Add Item</Title>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelAlign="left"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Property"
          name="property"
          rules={[{ required: true, message: "Please input a property" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
