import { HiOutlinePlus } from "react-icons/hi";
import CreateCategoryForm from "./CreateCategoryForm";
import { useState } from "react";
import Modal from "../../UI/Modal";

const CategoriesHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="font-bold text-secondary-700 text-xl md:text-2xl">
        Categories
      </h1>
      <Modal title="New Category" open={open} onClose={() => setOpen(false)}>
        <CreateCategoryForm onClose={() => setOpen(false)} />
      </Modal>
      <button
        onClick={() => setOpen(true)}
        className="btn btn--primary flex items-center gap-x-1 px-3 font-bold "
      >
        <span>New Category</span>
        <HiOutlinePlus />
      </button>
    </div>
  );
};

export default CategoriesHeader;
