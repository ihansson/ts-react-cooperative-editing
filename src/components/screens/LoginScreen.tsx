import { Layout, Typography } from "antd";
import { LoginForm } from "../forms/LoginForm";
const { Title } = Typography;
const { Content } = Layout;

export const LoginScreen = () => {
  return (
    <Layout>
      <Content>
        <div className="tsp-header">
          <p>
            This is a <strong>demo</strong>. Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="tsp-box">
          <LoginForm />
        </div>
      </Content>
    </Layout>
  );
};
