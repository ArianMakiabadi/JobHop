import { HiOutlineX } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";

function Modal({ open, onClose, title, children }) {
  const ref = useOutsideClick(onClose);
  return (
    open && (
      <div
        className="backdrop-blur-sm fixed top-0 left-0
        w-full h-screen bg-secondary-800 bg-opacity-30 z-50"
      >
        <div
          ref={ref}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-96 md:w-full md:max-w-lg
                     rounded-xl bg-secondary-0 p-4 shadow-lg transition-all duration-300 ease-out text-base
                     "
        >
          <div
            className="flex items-center justify-between
            border-b border-b-secondary-300 pb-2 mb-4"
          >
            <p className="text-secondary-700 font-bold text-base">{title}</p>
            <button onClick={onClose}>
              <HiOutlineX className="h-5 w-5 text-secondary-500" />
            </button>
          </div>
          <div className="whitespace-normal break-words text-left">
            {children}
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
