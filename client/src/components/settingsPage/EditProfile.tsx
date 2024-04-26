import { BsCamera } from "react-icons/bs";
import { Form, useRouteLoaderData, useSubmit } from "react-router-dom";
import { IUser } from "../../../../types";
import Heading from "./Heading";
import { ChangeEvent, useEffect, useState } from "react";
import useUploadModal from "../../hooks/useUpload";
import Modal from "../Modal";
import DropZone from "../DropZone";

export default function EditProfile() {
  const user = useRouteLoaderData("profile") as IUser;
  const submit = useSubmit();
  const [isDisabled, setIsDisabled] = useState(true);
  const { isModalOpen, open, close, file, setFile, preview, setPreview } =
    useUploadModal();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsDisabled(
      e.target.value === user[e.target.name as keyof IUser] ? true : false
    );
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) submit(e.target);

    if (file) {
      const formData = new FormData(e.target);
      formData.append("file", file);
      submit(formData, { method: "post", encType: "multipart/form-data" });
      setFile(null);
      setPreview(null);
    }

    setIsDisabled(true);
  };

  useEffect(() => {
    if (file) {
      setIsDisabled(false);
    }
  }, [file]);

  return (
    <div className="flex flex-col h-full">
      <Heading isDisabled={isDisabled}>Edit Profile</Heading>
      <Form
        className="bg-gray-800 flex flex-col h-full overflow-y-scroll"
        method="post"
        replace
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="p-10 flex flex-col gap-6 text-sm">
          <div className="flex flex-col gap-1">
            <div className="bg-gray-700 p-4 rounded-lg flex gap-4">
              <div
                className="w-20 h-20 overflow-hidden bg-gray-400 rounded-full text-3xl flex items-center justify-center cursor-pointer"
                onClick={open}
              >
                {preview ? (
                  <img
                    src={preview as string}
                    alt="selected image"
                    className="w-full h-full object-cover "
                  />
                ) : (
                  <BsCamera />
                )}
              </div>
              <div className="grow flex flex-col self-center">
                <input
                  type="text"
                  name="name"
                  className="bg-transparent outline-none leading-loose"
                  placeholder="Name"
                  defaultValue={user.name}
                  onChange={handleChange}
                  autoComplete="given-name"
                />
                <input
                  type="text"
                  name="lastname"
                  className="bg-transparent outline-none leading-loose border-t border-t-gray-500"
                  placeholder="Last Name"
                  defaultValue={user.lastname}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </div>
            </div>
            <span className="text-xs pl-4 text-gray-400">
              Update your name and lastname and upload an avatar.
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="pl-4 text-gray-400 font-semibold">BIO</h4>
            <div className="bg-gray-700 p-4 rounded-lg flex gap-4">
              <textarea
                name="bio"
                className="bg-transparent outline-none resize-none w-full"
                placeholder="A few words about you"
                defaultValue={user.bio}
                onChange={handleChange}
              />
            </div>
            <span className="text-xs pl-4 text-gray-400">
              Details about yourself.
            </span>
          </div>
        </div>
        {isModalOpen && (
          <Modal onClose={close}>
            <Modal.Title>Upload Image</Modal.Title>
            <Modal.Warning>File should be jpeg, jpg or png.</Modal.Warning>
            <DropZone />
          </Modal>
        )}
      </Form>
    </div>
  );
}
