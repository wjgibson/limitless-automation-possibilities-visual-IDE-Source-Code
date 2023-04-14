import React, { useState, useEffect } from "react";
import { Form, Input, Button, Collapse } from "antd";
import APIHelper from "../utilities/APIHelper";
const { Panel } = Collapse;

const SettingsPage = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    APIHelper.doGet("getDatabaseSettings").then((response) => {
      setSettings(response);
    });
    console.log("retrieve initial settings");
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Settings</h1>
      <Collapse accordion>
        <Panel header="Database Connection Settings" key="1">
          <Form initialValues={settings} onFinish={onFinish}>
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
              <Input placeholder="postgres" />
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
              <Input placeholder="localhost" />
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
              <Input placeholder="5432" />
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
              <Input placeholder="LAP_PG" />
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
              <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SettingsPage;
