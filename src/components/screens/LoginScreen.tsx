import { Layout, Typography } from "antd";
import { LoginForm } from "../forms/LoginForm";

const { Title } = Typography;

const { Content, Header } = Layout;

export const LoginScreen = () => {
  return (
    <Layout>
      <Header style={{ padding: "8px 24px" }}>
        <Title style={{ color: "white", margin: 0 }}>Login</Title>
      </Header>
      <Content style={{ padding: "24px 24px" }}>
        <LoginForm />
      </Content>
    </Layout>
  );
};
