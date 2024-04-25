import { PropsWithChildren } from "react";
import { GrClose } from "react-icons/gr";

interface IProps extends PropsWithChildren {
  onClose: () => void;
}

function Modal({ children, onClose }: IProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-60">
      <div className="relative flex flex-col gap-4 bg-gray-50 text-gray-700 rounded-lg p-8 w-96 h-fit overflow-hidden">
        <button className="h-6 w-6 absolute top-1 right-1" onClick={onClose}>
          <GrClose />
        </button>
        {children}
      </div>
    </div>
  );
}

function Title({ children }: PropsWithChildren) {
  return (
    <h3 className="text-center text-base font-bold capitalize">{children}</h3>
  );
}

const Warning = ({ children }: PropsWithChildren) => {
  return <span className="text-center text-[10px] font-light">{children}</span>;
};

Modal.Title = Title;
Modal.Warning = Warning;

export default Modal;
