import { ChangeEvent } from "react";
import { IoIosImage, IoIosSend } from "react-icons/io";
import { Form, useNavigation, useParams, useSubmit } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";
import { FaSpinner } from "react-icons/fa6";
import useUploadModal from "../../hooks/useUpload";
import Modal from "../Modal";
import DropZone from "../DropZone";

export default function MessageForm() {
  const { id } = useParams();
  const submit = useSubmit();
  const { socket } = useSocket();
  const { isModalOpen, open, close, file, setFile, setPreview } =
    useUploadModal();

  const navigation = useNavigation();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) submit(e.target);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      submit(formData, { method: "post", encType: "multipart/form-data" });
      setFile(null);
      setPreview(null);
      close();
    }

    socket?.emit("newClientMessage");
    e.target.reset();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    socket?.emit("typing", { id: id as string, value: e.target.value });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="relative flex px-4 items-center border-t border-gray-500"
      method="post"
      replace
      autoComplete="off"
    >
      <input
        type="text"
        name="content"
        placeholder="Write a message..."
        className="h-8 my-2 bg-gray-700 grow outline-none caret-blue-400"
        onChange={handleChange}
      />
      <div className="flex gap-2">
        {navigation.state === "submitting" ? (
          <FaSpinner className="h-6 w-6 text-blue-400 animate-spin" />
        ) : (
          <>
            <button type="button" onClick={open}>
              <IoIosImage className="h-6 w-6 text-blue-400" />
            </button>
            <button type="submit" name="intent" value="message">
              <IoIosSend className="h-6 w-6 text-blue-400" />
            </button>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal onClose={close}>
          <Modal.Title>Upload Image</Modal.Title>
          <Modal.Warning>File should be jpeg, jpg or png.</Modal.Warning>
          <DropZone>
            <button
              type="submit"
              className="font-semibold py-1 px-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Send
            </button>
          </DropZone>
        </Modal>
      )}
    </Form>
  );
}
