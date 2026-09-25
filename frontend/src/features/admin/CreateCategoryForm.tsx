import { useForm } from "react-hook-form";
import TextField from "../../UI/TextField";
import Loading from "../../UI/Loading";
import useCreateCategory from "./useCreateCategory";
import useEditCategory from "./useEditCategory";
import type { Category, CategoryPayload } from "../../types";

interface CategoryFormValues {
  title: string;
  description: string;
}

interface CreateCategoryFormProps {
  onClose: () => void;
  categoryToEdit?: Category;
}

const CreateCategoryForm = ({
  onClose,
  categoryToEdit,
}: CreateCategoryFormProps) => {
  const { isCreating, createCategory } = useCreateCategory();
  const { isEditing, editCategory } = useEditCategory();
  const categoryToEditId = categoryToEdit?._id;
  const isEditMode = Boolean(categoryToEditId);

  let oldValues: Partial<CategoryFormValues> = {};
  if (categoryToEdit && isEditMode) {
    const { title, description } = categoryToEdit;
    oldValues = {
      title,
      description,
    };
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CategoryFormValues>({
    defaultValues: oldValues,
  });

  const onSubmit = (data: CategoryFormValues) => {
    const newCategory: CategoryPayload = {
      ...data,
      englishTitle: data.title, // the same value for englishTitle
      type: "project",
    };
    console.log(newCategory);

    if (categoryToEditId) {
      editCategory(
        { id: categoryToEditId, data: newCategory },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createCategory(newCategory, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Category Title"
        name="title"
        type="text"
        required
        register={register}
        validationSchema={{
          required: "Title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters",
          },
          maxLength: {
            value: 100,
            message: "Title must be at most 100 characters",
          },
        }}
        errors={errors}
      />

      <TextField
        label="Category Description"
        name="description"
        type="text"
        required
        register={register}
        validationSchema={{
          required: "Description is required",
          minLength: {
            value: 3,
            message: "Description must be at least 3 characters",
          },
          maxLength: {
            value: 200,
            message: "Description must be at most 200 characters",
          },
        }}
        errors={errors}
      />

      {isCreating || isEditing ? (
        <Loading />
      ) : (
        <button type="submit" className="btn btn--primary w-full">
          Confirm
        </button>
      )}
    </form>
  );
};

export default CreateCategoryForm;
