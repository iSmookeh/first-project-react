import React from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import api from "core/services/api";

import "./sign-in-panel.styles.scss";

const Component = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let history = useHistory();

  const onFinish = async (values) => {
    try {
      const response = await api.post("sign-in", values);
      if (response.status == 200) {
        history.push("/products")
        notification["success"]({
          message: "Logado com sucesso!",
          description: "Agora voce tem acesso a nossa plataforma",
        });
      }
      dispatch({
        type: "SIGN_IN",
        payload: response.data
      });
    } catch (err) { 
      notification["error"]({
        message: "Erro!",
        description: err?.response?.data?.error || "Erro inesperado!",
      });
    } 
  };

  return (
    <div>
      <div className="container">
        <div className="container-login">
          <UserOutlined
            className="site-form-item-icon"
            style={{
              fontSize: "80px",
              background: "#a6a6a6",
              borderRadius: "50%",
              width: "120px",
              height: "120px",
              padding: "10px",
            }}
          />
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

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="/sign-up">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Component;
