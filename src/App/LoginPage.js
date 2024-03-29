import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button } from "antd";

import APIHelper from "../utilities/APIHelper";
import loginLogo from "../assets/lap.png";

const LoginForm = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const history = useNavigate();

  useEffect(() => {
    localStorage.setItem("authToken", false);
  }, []);

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const response = await APIHelper.doGet(`getLoginData${values.username}`);

      if (values.password === response[0].password) {
        setAuth(true);
        localStorage.setItem("authToken", true);
        history("/main");
      } else {
        alert("Username or password is incorrect");
      }
    } catch (error) {
      console.log("Failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#2E475F",
      }}
    >
      <Card
        title={
          <img
            src={loginLogo}
            alt="Login Logo"
            style={{ maxWidth: "100%", filter: "invert(1)" }}
          />
        }
        style={{ width: 300, textAlign: "center" }}
      >
        <Form
          form={form}
          name="loginForm"
          onFinish={handleLogin}
          initialValues={{ remember: true }}
          style={{ marginTop: 16 }}
        >
          <Form.Item label="Username" name="username">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Outlet />
    </div>
  );
};

export default LoginForm;
