import Table from "../../UI/Table";
import Modal from "../../UI/Modal";
import ConfirmDelete from "../../UI/ConfirmDelete";
import CreateCategoryForm from "./CreateCategoryForm";
import { useState } from "react";
import useRemoveCategory from "./useRemoveCategory";
import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineTrash } from "react-icons/hi";
import { TbPencilMinus } from "react-icons/tb";

const CategoryRow = ({ category, index }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDelete, setIsDeleteOpen] = useState(false);
  const { removeCategory } = useRemoveCategory();
  const queryClient = useQueryClient();

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{category.title}</td>
      <td>{category.description}</td>
      <td>
        <div className="flex items-center justify-center gap-x-2">
          <>
            <button onClick={() => setIsEditOpen(true)}>
              <TbPencilMinus className="w-5 h-5 text-primary-600 hover:text-primary-500" />
            </button>
            <Modal
              open={isEditOpen}
              title={`Edit ${category.title}`}
              onClose={() => setIsEditOpen(false)}
            >
              <CreateCategoryForm
                onClose={() => setIsEditOpen(false)}
                categoryToEdit={category}
              />
            </Modal>
          </>
          <>
            <button onClick={() => setIsDeleteOpen(true)}>
              <HiOutlineTrash className="w-5 h-5 text-error hover:text-red-300" />
            </button>
            <Modal
              open={isDelete}
              title={`Delete ${category.title}`}
              onClose={() => setIsDeleteOpen(false)}
            >
              <ConfirmDelete
                resourceName={category.title}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() =>
                  removeCategory(category._id, {
                    onSuccess: () => {
                      setIsDeleteOpen(false);
                      queryClient.invalidateQueries({
                        queryKey: ["categories"],
                      });
                    },
                  })
                }
                disabled={false}
              />
            </Modal>
          </>
        </div>
      </td>
    </Table.Row>
  );
};

export default CategoryRow;
