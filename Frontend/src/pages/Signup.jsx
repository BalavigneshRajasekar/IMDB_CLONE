/* eslint-disable no-unused-vars */
import { Form } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { handleLoginModal } from "../store/movieReducer";

function Signup() {
  const dispatch = useDispatch();
  const submit = (values) => {
    console.log(values);
  };
  return (
    <div>
      <h1 className="text-center text-yellow-500 p-3">SignUp</h1>
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
          ]}
        >
          <input
            type="password"
            placeholder="password"
            className="w-full h-10 outline-0  border-2 border-yellow-500 rounded-md p-2"
          ></input>
        </Form.Item>
        <button type="submit" className="bg-yellow-500 ">
          Submit
        </button>
      </Form>

      <p className="mt-3 hover:cursor-pointer">
        Already have an account ?{" "}
        <button
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
