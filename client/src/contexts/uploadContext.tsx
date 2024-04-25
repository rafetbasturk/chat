import {
  DragEvent,
  FormEvent,
  PropsWithChildren,
  createContext,
  useState,
} from "react";
import checkUploadFormat from "../utils/checkUploadFormat";
import showSelectedImage from "../utils/showSelectedImage";

interface IContext {
  isModalOpen: boolean;
  open: () => void;
  close: () => void;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isDragActive: boolean;
  setIsDragActive: React.Dispatch<React.SetStateAction<boolean>>;
  preview: string | ArrayBuffer | null;
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  handleChange: (e: FormEvent<HTMLInputElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}

interface IContextProvider extends PropsWithChildren {
  closeModalAfterSelect?: boolean;
}

export const UploadContext = createContext<IContext | null>(null);

export function UploadContextProvider({
  children,
  closeModalAfterSelect,
}: IContextProvider) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const close = () => setIsModalOpen(false);
  const open = () => setIsModalOpen(true);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const isAllowed = checkUploadFormat(target.files[0], setFile);
    if (isAllowed) showSelectedImage(target.files[0], setPreview);
    if (closeModalAfterSelect) {
      close();
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const isAllowed = checkUploadFormat(e.dataTransfer.files[0], setFile);
    if (isAllowed) showSelectedImage(e.dataTransfer.files[0], setPreview);
    if (closeModalAfterSelect) {
      close();
    }
  };

  return (
    <UploadContext.Provider
      value={{
        isModalOpen,
        open,
        close,
        file,
        setFile,
        isDragActive,
        setIsDragActive,
        preview,
        setPreview,
        handleChange,
        handleDrop,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}
