import { useContext } from "react";
import { UploadContext } from "../contexts/uploadContext";

export default function useUploadModal() {
  const context = useContext(UploadContext);
  if (!context)
    throw new Error(
      "useModal hook must be used within the ModalContextProvider."
    );
  return context;
}
