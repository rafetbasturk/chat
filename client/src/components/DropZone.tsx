import { PropsWithChildren } from "react";
import image from "../assets/image.png";
import useUploadModal from "../hooks/useUpload";

export default function DropZone({ children }: PropsWithChildren) {
  const { isDragActive, setIsDragActive, handleChange, handleDrop, preview } =
    useUploadModal();

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`p-8 font-light text-sm text-gray-500 bg-gray-500 bg-opacity-10 rounded-lg border border-dashed border-blue-500 relative z-20 ${
          isDragActive ? "bg-gray-900" : ""
        }`}
        onDragEnter={() => setIsDragActive(true)}
        onDragLeave={() => setIsDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4 relative z-10">
          <img
            src={image}
            alt="drag and drop"
            className="w-28 m-auto rounded-md"
          />
          <p className="text-xs">
            {isDragActive
              ? "Leave Your File Here"
              : "Drag & Drop your image here"}
          </p>
        </div>
      </div>

      <span className="self-center text-sm font-thin">or</span>

      <label
        htmlFor="file"
        className="bg-blue-500 text-center text-white font-light py-1 px-2 rounded-lg"
      >
        <input
          type="file"
          name="file"
          id="file"
          hidden
          onChange={handleChange}
        />
        Choose an image
      </label>

      {preview && (
        <div className="w-16 h-16">
          <img
            src={preview as string}
            alt="selected image"
            className="w-full h-full object-cover "
          />
        </div>
      )}

      {children}
    </div>
  );
}
