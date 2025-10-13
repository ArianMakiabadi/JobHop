import { useForm } from "react-hook-form";
import TextField from "../../UI/TextField";
import RHFSelect from "../../UI/RHFSelect";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import DatePickerField from "../../UI/DatePickerField";

function CreateProjectForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState(new Date());

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
      <RHFSelect
        label="Category"
        name="category"
        register={register}
        options={[]}
        requierd
      />

      <div>
        <label htmlFor="tags" className="mb-2 block text-secondary-700">
          tags
        </label>
        <TagsInput
          id="tags"
          value={tags}
          onChange={setTags}
          name="tags"
          classNames={{}}
        />
      </div>
      <DatePickerField date={date} setDate={setDate} label="Deadline" />
      <button className="btn btn--primary w-full" type="submit">
        Create
      </button>
    </form>
  );
}

export default CreateProjectForm;
