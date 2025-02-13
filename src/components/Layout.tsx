import type React from "react"
import { Layout, Menu, Typography, Avatar, Dropdown } from "antd"
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"

const { Header, Content, Footer } = Layout
const { Title } = Typography

interface LayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

const AppLayout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between">
        <div className="flex items-center">
          <Title level={3} style={{ color: "white", margin: 0 }}>
            <a href="/">Sistema de gestion de compañias</a>
          </Title>
        </div>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </Header>
      <Content style={{ padding: "24px 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Sistema de gestion de compañias ©{new Date().getFullYear()} Created by Your Company
      </Footer>
    </Layout>
  )
}

export default AppLayout

