import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button } from 'antd';

import APIHelper from '../utilities/APIHelper';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      console.log('Received values of form: ', values);

      const response = await APIHelper.doGet(`getLoginData${values.username}`);
      console.log(response);

      if (values.password === response[0].password) {
        const module = await import('./MainPage.js');
        const MainPage = module.default;
        ReactDOM.render(<MainPage />, document.getElementById('root'));
      } else {
        alert('Username or password is incorrect');
      }
    } catch (error) {
      console.log('Failed:', error);
    }
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
        <Input value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
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