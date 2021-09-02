import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import api from "core/services/api";

import "./sign-up-panel.styles.scss";

const Component = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth) 
  const onFinish = async (values) => { 
    delete values.remember;
    const {data } = await api.post("register", values) 
    dispatch({
      type: "SIGN_UP",
      payload: data,
    }); 
  };

  return (
    <div>
      <div className="container">
        <div className="container-login">
          <h1>Criar Nova Conta</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
 
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
               Registrar
              </Button> 
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Component;
