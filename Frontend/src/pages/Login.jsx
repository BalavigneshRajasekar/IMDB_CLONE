import { Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { handleLoginModal } from "../store/movieReducer";
import useAuth from "../Hooks/useAuth";

function Login() {
  const dispatch = useDispatch();
  const { loading, logIn } = useAuth();
  const submit = async (values) => {
    try {
      const response = await logIn(values);
      alert(response.message);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className={loading ? "opacity-50" : "opacity-100"}>
      <h1 className="text-center text-yellow-500 p-3">Login</h1>
      <Form onFinish={submit}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
              type: "email",
            },
          ]}
        >
          <input
            type="email"
            placeholder="email"
            className="w-full h-10 outline-0 border-2 border-yellow-500 rounded-md p-2"
          ></input>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your passwords",
              type: "string",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="password"
          ></Input.Password>
        </Form.Item>
        <button type="submit" className="bg-yellow-500 " disabled={loading}>
          Submit
        </button>
      </Form>

      <p className="mt-3 hover:cursor-pointer">
        Don't have an account ?{" "}
        <button
          onClick={() =>
            dispatch(handleLoginModal({ type: "Signup", data: true }))
          }
        >
          Signup
        </button>
      </p>
      <p>Forgot password ?</p>
    </div>
  );
}

export default Login;
