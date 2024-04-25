import toast from "react-hot-toast";

const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

export default function checkUploadFormat (
  selectedFile: File,
  setFile: React.Dispatch<React.SetStateAction<File | null>>
) {
  if (allowedTypes.includes(selectedFile?.type)) {
    setFile(selectedFile);
    return true
  } else {
    toast.error(`'${selectedFile.type}' format is not allowed.`);
    return false
  }
}
