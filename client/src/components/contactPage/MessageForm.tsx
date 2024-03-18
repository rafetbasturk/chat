import { ChangeEvent } from "react";
import { IoIosSend } from "react-icons/io";
import { Form, useParams, useSubmit } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

export default function MessageForm() {
  const { id } = useParams();
  const submit = useSubmit();
  const { socket } = useSocket();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e.target);
    socket?.emit("newClientMessage");
    e.target.reset();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    socket?.emit("typing", { id: id || "", value: e.target.value });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="relative flex px-4 items-center border-t border-gray-500"
      method="post"
      replace
    >
      <input
        type="text"
        name="content"
        placeholder="Write a message..."
        className="h-8 my-2 bg-gray-700 grow outline-none caret-blue-400"
        onChange={handleChange}
      />
      <button type="submit">
        <IoIosSend className="h-6 w-6 text-blue-400" />
      </button>
    </Form>
  );
}
