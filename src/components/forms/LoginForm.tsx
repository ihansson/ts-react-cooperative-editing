import { Button, Checkbox, Form, Input } from "antd";
import { useLogin } from "../../lib/api";
import { useHistory } from "react-router-dom";
import { FormNotices } from "../helpers/FormNotices";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const history = useHistory();
  const [error, loading, success, handleLogin] = useLogin(
    "3NNo2ftgILZTdN2nWDzU"
  );

  const onFinish = (values: LoginFormValues) => {
    handleLogin(values.username, values.password);
  };

  if (success) {
    setTimeout(() => history.push("/edit"), 500);
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      labelAlign="left"
    >
      <FormNotices {...{ error, loading, success }} />
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
