import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import APIHelper from "../utilities/APIHelper";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();

  const handleLogin = () => {
    form.validateFields().then(values => {
      console.log('Received values of form: ', values);
      if (!values.username || !values.password) {
        alert('Please enter your username and password.');
      }
      else {
        const restoreFlow = async () => {
          const response = await APIHelper.doGet(`getLoginData${values.username}`);
          console.log(response);
          if (values.password == response[0].password){
            console.log('Success')
          }
        };
        restoreFlow();
      }
    });
  };

  return (
    <Form
      form={form}
      name="loginForm"
      onFinish={handleLogin}
      initialValues={{ remember: true }}
      style={{ width: '300px', margin: 'auto', marginTop: '50px' }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input onChange={e => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={e => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;