/* eslint-disable no-unused-vars */
import { Form, Input, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { handleLoginModal } from "../store/movieReducer";
import useAuth from "../Hooks/useAuth";

function Signup() {
  const { loading, signUp } = useAuth();
  const dispatch = useDispatch();
  const submit = async (values) => {
    try {
      const response = await signUp(values);
      alert(response.message);
    } catch (e) {
      console.log(e);

      alert(e);
    }
  };

  return (
    <div className={loading ? "opacity-50" : "opacity-100"}>
      <h1 className="text-center text-yellow-500 p-3">SignUp</h1>
      <Form onFinish={submit}>
        <Form.Item
          name="userName"
          rules={[
            {
              required: true,
              message: "Enter username !",
              type: "string",
            },
          ]}
        >
          <input
            type="text"
            placeholder="userName"
            className="w-full h-10 border-2 border-yellow-500 rounded-md p-2"
          ></input>
        </Form.Item>
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
            className="w-full h-10 border-2 border-yellow-500 rounded-md p-2"
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
            {
              min: 6,
              max: 12,
              message: "password must be 6-12 letters",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="password"
            className="w-full h-10 outline-0  border-2 border-yellow-500 rounded-md p-2"
          ></Input.Password>
        </Form.Item>
        <button type="submit" className="bg-yellow-500 " disabled={loading}>
          Submit
        </button>
      </Form>

      <p className="mt-3 hover:cursor-pointer">
        Already have an account ?{" "}
        <button
          disabled={loading}
          onClick={() =>
            dispatch(handleLoginModal({ type: "Login", data: true }))
          }
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
