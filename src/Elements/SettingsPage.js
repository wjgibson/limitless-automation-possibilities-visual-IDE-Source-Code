import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};

const SettingsPage = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // axios.get("/settings.json").then((response) => {
    //   setSettings(response.data);
    // });
    console.log("retrieve initial settings");
  }, []);

  const onFinish = (values) => {
    console.log("settings updated");
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...layout} initialValues={settings} onFinish={onFinish}>
      <Form.Item
        label="Database User"
        name="user"
        rules={[
          {
            required: true,
            message: "Please input your database user!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Database Host"
        name="host"
        rules={[
          {
            required: true,
            message: "Please input your database host!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Database Name"
        name="database"
        rules={[
          {
            required: true,
            message: "Please input your database name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Database Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your database password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Database Port"
        name="port"
        rules={[
          {
            required: true,
            message: "Please input your database port!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SettingsPage;
