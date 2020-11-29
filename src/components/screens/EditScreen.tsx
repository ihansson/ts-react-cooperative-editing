import { Layout, Typography } from "antd";
import { EditList } from "../EditList";

const { Title } = Typography;
const { Content, Header } = Layout;

export const EditScreen = () => (
  <Layout>
    <Header style={{ padding: "8px 24px" }}>
      <Title style={{ color: "white", margin: 0 }}>Edit</Title>
    </Header>
    <Content style={{ padding: "24px 24px" }}>
      <EditList />
    </Content>
  </Layout>
);
