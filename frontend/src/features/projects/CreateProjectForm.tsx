import { useForm } from "react-hook-form";
import TextField from "../../UI/TextField";
import RHFSelect from "../../UI/RHFSelect";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import DatePickerField from "../../UI/DatePickerField";
import type { Value } from "react-multi-date-picker";
import useCategories from "../../hooks/useCategories";
import useCreateProject from "./useCreateProject";
import Loading from "../../UI/Loading";
import useEditProject from "./useEditProject";
import type { CreateProjectPayload, Project } from "../../types";

type ProjectFormValues = Omit<CreateProjectPayload, "tags" | "deadline">;

interface CreateProjectFormProps {
  onClose: () => void;
  projectToEdit?: Project;
}

// Same result as the old `new Date(date)`: a picked date is a DateObject, null gave the epoch
function toDate(value: Value): Date {
  if (value === null) return new Date(0);
  if (typeof value === "object" && !(value instanceof Date))
    return value.toDate();
  return new Date(value);
}

function CreateProjectForm({ onClose, projectToEdit }: CreateProjectFormProps) {
  const isEditMode = !!projectToEdit?._id;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<ProjectFormValues>({
    defaultValues: {
      title: projectToEdit?.title ?? "",
      description: projectToEdit?.description ?? "",
      budget: projectToEdit?.budget ?? "",
      category: projectToEdit?.category?._id ?? "",
    },
  });

  const [tags, setTags] = useState<string[]>(projectToEdit?.tags ?? []);
  const [date, setDate] = useState<Value>(
    new Date(projectToEdit?.deadline ?? "")
  );
  const { categories } = useCategories();
  const { createProject, isCreating } = useCreateProject();
  const { editProject } = useEditProject();

  const onSubmit = (data: ProjectFormValues) => {
    const newProject: CreateProjectPayload = {
      ...data,
      tags,
      deadline: toDate(date).toISOString(),
    };
    if (projectToEdit && isEditMode) {
      editProject(
        { id: projectToEdit._id, newProject },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createProject(newProject, {
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
        register={register}
        name="title"
        label="Title"
        errors={errors}
        required
        validationSchema={{
          required: "Please enter a title.",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters.",
          },
          maxLength: {
            value: 25,
            message: "Title must be 25 characters or fewer.",
          },
        }}
      />
      <TextField
        register={register}
        name="description"
        label="Description"
        errors={errors}
        required
        validationSchema={{
          required: "Please enter the description.",
          minLength: {
            value: 15,
            message: "Title must be 15 characters or more.",
          },
        }}
      />
      <TextField
        register={register}
        name="budget"
        label="Budget (Euros)"
        errors={errors}
        required
        validationSchema={{
          required: "Please enter the budget.",
          pattern: {
            value: /^[0-9]+$/,
            message: "Only numbers are allowed.",
          },
        }}
      />
      <RHFSelect
        label="Category"
        name="category"
        register={register}
        options={categories}
        errors={errors}
        required
        watch={watch}
        validationSchema={{
          required: "Please select an option.",
        }}
      />

      <div>
        <label htmlFor="tags" className="mb-2 block text-secondary-700">
          tags
        </label>
        <TagsInput
          value={tags}
          onChange={setTags}
          name="tags"
          classNames={{}}
        />
      </div>
      <DatePickerField date={date} setDate={setDate} label="Deadline" />
      <div>
        {isCreating ? (
          <Loading />
        ) : (
          <button className="btn btn--primary w-full" type="submit">
            {isEditMode ? "Update" : "Create"}
          </button>
        )}
      </div>
    </form>
  );
}

export default CreateProjectForm;
