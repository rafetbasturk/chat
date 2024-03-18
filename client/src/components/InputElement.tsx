import { useState } from "react";
import { MdRemoveRedEye, MdCloudUpload } from "react-icons/md";

interface IProps {
  type: string;
  name: string;
  autoComplete?: string;
  labelText?: string;
}

export default function InputElement({
  type,
  name,
  autoComplete,
  labelText,
}: IProps) {
  const [elementType, setElementType] = useState(type);
  const handleClick = () => {
    elementType === "password"
      ? setElementType("text")
      : setElementType("password");
  };
  return (
    <div className="text-gray-50">
      <label htmlFor={name} className="relative flex flex-col capitalize">
        {type === "file" ? (
          <span>
            <MdCloudUpload /> Select Image
          </span>
        ) : (
          <span>{labelText || name}</span>
        )}
        <input
          type={elementType}
          name={name}
          id={name}
          autoComplete={autoComplete}
          className="border border-gray-300 rounded px-2 py-1 bg-gray-700 text-gray-300 caret-blue-400 outline-none placeholder:text-sm"
        />
        {type === "password" && (
          <MdRemoveRedEye
            className="absolute right-2 bottom-2 cursor-pointer"
            onClick={handleClick}
          />
        )}
      </label>
    </div>
  );
}
