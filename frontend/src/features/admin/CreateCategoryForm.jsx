import { useForm } from "react-hook-form";
import TextField from "../../UI/TextField";
import Loading from "../../UI/Loading";
import useCreateCategory from "./useCreateCategory";
import useEditCategory from "./useEditCategory";

const CreateCategoryForm = ({ onClose, categoryToEdit = {} }) => {
  const { isCreating, createCategory } = useCreateCategory();
  const { isEditing, editCategory } = useEditCategory();
  const { _id: categoryToEditId } = categoryToEdit;
  const isEditMode = Boolean(categoryToEditId);
  const { title, description } = categoryToEdit;

  let oldValues = {};
  if (isEditMode) {
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
  } = useForm({
    defaultValues: oldValues,
  });

  const onSubmit = (data) => {
    const newCategory = {
      ...data,
      englishTitle: data.title, // the same value for englishTitle
      type: "project",
    };
    console.log(newCategory);

    if (isEditMode) {
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
