import React from "react";

function EditMovie() {
  return (
    <div>
      <Form onFinish={submit}>
        <Form.Item
          name="movieName"
          rules={[
            {
              required: true,
              message: "Enter Movie Name!",
              type: "text",
            },
          ]}
        >
          <input
            type="text"
            placeholder="MovieName"
            className="w-full h-10 outline-0 border-2 border-yellow-500 rounded-md p-2"
          ></input>
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description ",
              type: "string",
            },
          ]}
        >
          <Input.TextArea
            placeholder="description"
            className="w-full h-10 outline-0 border-2 border-yellow-500 rounded-md p-2"
          ></Input.TextArea>
        </Form.Item>
        <label>Select Release Year</label>
        <Form.Item
          name="releaseYear"
          rules={[
            {
              required: true,
              message: "Please enter release year",
              type: "string",
            },
          ]}
        >
          <input type="date" placeholder="date"></input>
        </Form.Item>
        <Form.Item
          name="ratings"
          rules={[
            {
              required: true,
              message: "Please enter ratings",
              type: "string",
            },
            {
              validator: (_, value) => {
                const num = parseFloat(value);
                if (!value || (num >= 1 && num <= 10)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    "Rating must be between 1 and 10, including decimals"
                  )
                );
              },
            },
          ]}
        >
          <input
            type="number"
            placeholder="Ratings"
            className="w-full h-10 outline-0 border-2 border-yellow-500 rounded-md p-2"
          ></input>
        </Form.Item>
        <label>
          Please add actors name seperate by <span>,</span>
        </label>
        <Form.Item
          name="actors"
          rules={[
            {
              required: true,
              message: "Please enter actor names by , ",
              type: "string",
            },
          ]}
        >
          <input
            type="text"
            placeholder="Actors Name "
            className="w-full h-10 outline-0 border-2 border-yellow-500 rounded-md p-2"
          ></input>
        </Form.Item>
        <label>
          Please add producers name seperate by <span>,</span>
        </label>
        <Form.Item
          name="producers"
          rules={[
            {
              required: true,
              message: "Please enter producers names by , ",
              type: "string",
            },
          ]}
        >
          <input
            type="text"
            placeholder="Producer Name "
            className="w-full h-10 outline-0 border-2 border-yellow-500 rounded-md p-2"
          ></input>
        </Form.Item>

        <button type="submit" className="bg-yellow-500 ">
          Edit Movie
        </button>
      </Form>
    </div>
  );
}

export default EditMovie;
