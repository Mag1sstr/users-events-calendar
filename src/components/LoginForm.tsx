import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { login } from "../store/authSlice";

function LoginForm() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.auth);

  function submit(e: SubmitEvent) {
    dispatch(login(values.username, values.password));
  }

  return (
    <Form onFinish={submit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form.Item
        label="Имя"
        name="username"
        rules={[
          { required: true, message: "Пожалуйста введите имя пользователя!" },
        ]}
      >
        <Input
          value={values.username}
          onChange={(e) => setValues({ ...values, username: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
      >
        <Input.Password
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
