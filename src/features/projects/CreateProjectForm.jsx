import { useForm } from "react-hook-form";
import TextField from "../../UI/TextField";

function CreateProjectForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        register={register}
        name="title"
        label="Title"
        placeholder="Title of the Project"
        errors={errors}
        required
        validationSchema={{
          required: "Please enter a title.",
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
        placeholder="Description of the Project"
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
        placeholder="Budget of the Project"
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
      <button className="btn btn--primary" type="submit">
        Create
      </button>
    </form>
  );
}

export default CreateProjectForm;
