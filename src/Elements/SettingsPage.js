import React, { useState, useEffect } from "react";
import { Form, Input, Button, Collapse, message } from "antd";
import { Outlet, Link } from "react-router-dom";
import APIHelper from "../utilities/APIHelper";
const { Panel } = Collapse;

const SettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const styles = {
    container: {
      backgroundColor: "#001628",
      color: "#b4babf",
      fontFamily: "sans-serif",
      minHeight: "100vh",
      padding: "20px",
      boxSizing: "border-box",
    },
    header: {
      color: "#b4babf",
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    panel: {
      backgroundColor: "#2f485e",
      border: "10px",
      borderRadius: "10px",
      marginBottom: "20px",
      color: "#000",
      background: "#fff",
      fontWeight: "bold",
    },
    label: {
      color: "#b4babf",
    },
    input: {
      backgroundColor: "#b4babf",
      borderRadius: "5px",
      color: "#001628",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#b4babf",
      borderRadius: "5px",
      color: "#001628",
      fontWeight: "bold",
    },
  };

  const displayStatus = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  useEffect(() => {
    APIHelper.doGet("getDatabaseSettings").then((response) => {
      setSettings(response);
    });
    console.log("retrieved initial settings");
  }, []);

  const onFinish = (values) => {
    console.log(values);
    APIHelper.makePost("updateDatabaseSettings", JSON.stringify(values)).then(
      displayStatus("success", "Settings saved successfully!"),
      (err) => {
        console.log(err);
        displayStatus("error", "Something went wrong");
      }
    );
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {contextHolder}
      <h1 style={styles.header}>Settings</h1>
      <Collapse accordion>
        <Panel
          header="Database Connection Settings"
          key="1"
          style={styles.panel}
        >
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
              style={styles.label}
            >
              <Input placeholder="postgres" style={styles.input} />
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
              style={styles.label}
            >
              <Input.Password placeholder="password" style={styles.input} />
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
              style={styles.label}
            >
              <Input placeholder="LAP_PG" style={styles.input} />
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
              style={styles.label}
            >
              <Input placeholder="localhost" style={styles.input} />
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
              style={styles.label}
            >
              <Input placeholder="5432" style={styles.input} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={styles.button}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <Link to="/main">
          <Button type="primary" size="large" style={styles.button}>
            Done
          </Button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default SettingsPage;
