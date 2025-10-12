function TextField({
  label,
  name,
  placeholder,
  register,
  validationSchema,
  errors,
  type = "text",
  required,
}) {
  return (
    <div>
      <div>
        <label className="mb-1 text-secondary-700" htmlFor={name}>
          {label} {required && <span className="text-error">*</span>}
        </label>
        <input
          {...register(name, validationSchema)}
          id={name}
          className="w-full textField__input"
          placeholder={placeholder}
          type={type}
          autoComplete="off"
        />
        {errors && errors[name] && (
          <span className="text-error block text-sm mt-0.5">
            {errors[name]?.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default TextField;
