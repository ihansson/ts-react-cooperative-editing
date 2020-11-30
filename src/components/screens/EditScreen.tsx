import { Layout, Typography } from "antd";
import { EditList } from "../EditList";

const { Title } = Typography;
const { Content, Header } = Layout;

export const EditScreen = () => (
  <Layout>
    <Content>
      <EditList />
    </Content>
  </Layout>
);
