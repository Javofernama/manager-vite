import type React from "react"
import { Layout, Menu, Typography, Avatar, Dropdown } from "antd"
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const { Header, Content, Footer } = Layout
const { Title } = Typography

const AppLayout: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      navigate("/home")
    } else {
      navigate("/login");
    }
  },[navigate])

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between">
        <div className="flex items-center">
          <Title level={3} style={{ color: "white", margin: 0 }}>
            <Link to="/">Sistema de gestion de compañias</Link>
          </Title>
        </div>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </Header>
      <Content style={{ padding: "24px 50px" }}>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Sistema de gestion de compañias ©{new Date().getFullYear()} Creado por algún loco raro
      </Footer>
    </Layout>
  )
}

export default AppLayout

