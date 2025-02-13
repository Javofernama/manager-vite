import { useState } from "react";
import type React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const { Text } = Typography; 
interface loginCredential {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const onFinish = async (values: loginCredential) => {
    const { email, password } = values;
    console.log({ values }, email, password);
    if (email && password) {
      localStorage.setItem("user", email);
      const token = await login(email, password);
      if (token) {
        navigate("/home");
      } else {
        setMessage("Error de usuario o contraseña");
      }
    } else {
      alert("Por favor, ingresa tu email y contraseña.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        title="Inicio de sesión"
        bordered={true}
        style={{
          width: 500,
        }}
      >
        <Text type="danger">{ message }</Text>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingresa tu email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Por favor Ingresa tu contraseña!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
