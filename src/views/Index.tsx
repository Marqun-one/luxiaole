import React, { useState } from 'react';
import {
  RedEnvelopeOutlined,
  ContactsOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BASIC_INFO, COUNT, STILL_ON, RECORD, REVIEW_ACOUNT, menuMap, HEALTH, SPORT } from '../common/MenuItemCons';
import { useNavigate } from 'react-router-dom';
import ContentRouterView from '../router';
import path from 'path';
// import {  } from 'react-router-dom'
const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(BASIC_INFO, BASIC_INFO, <ContactsOutlined />),
  getItem(COUNT, COUNT, <RedEnvelopeOutlined />, [
    getItem(RECORD, RECORD),
    getItem(REVIEW_ACOUNT, REVIEW_ACOUNT)
  ]),
  getItem(STILL_ON, STILL_ON, <PushpinOutlined />, [
    getItem(HEALTH, HEALTH),
    getItem(SPORT, SPORT),
  ]),
];

const ContentView: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickToRoute = ({ keyPath }: { keyPath: string[] }) => {
    let uri = '';
    keyPath.forEach(path => {
        const key = menuMap.get(path);
        if (key !== undefined) {
          uri = '/' + menuMap.get(path) + uri;
        }
    });
    navigate('/content' + uri);
  }
  return (<>
    <Layout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleClickToRoute} />
      </Sider>
      <Layout>
        {/* 中心内容 */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>路小乐</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, color: 'black' }}>
            <ContentRouterView />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  </>
  );
};

export default ContentView;
