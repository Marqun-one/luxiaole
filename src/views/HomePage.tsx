import React from 'react';
import { Layout, Space } from 'antd';
import ContentView from './Index';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
  fontSize: 36,
  letterSpacing: 36
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

const HomePage: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout>
      <Header style={headerStyle}>路小乐日志</Header>
      <Content style={contentStyle}><ContentView/></Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </Space>
);

export default HomePage;