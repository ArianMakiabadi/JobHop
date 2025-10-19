function TextField({
  label,
  name,
  register,
  validationSchema,
  errors,
  type = "text",
  required,
}) {
  return (
    <div className="relative mt-6">
      <input
        {...register(name, validationSchema)}
        id={name}
        type={type}
        placeholder=""
        autoComplete="off"
        className="peer w-full bg-secondary-0 text-secondary-900 border border-secondary-400 rounded-xl px-3 pt-3 pb-4
                   focus:outline-none focus:border-primary-500"
      />

      <label
        htmlFor={name}
        className={`absolute left-3 top-2 text-secondary-500 text-sm transition-all duration-200
        peer-placeholder-shown:top-4 peer-placeholder-shown:text-secondary-400 peer-placeholder-shown:text-base
        peer-focus:-top-2.5 peer-focus:bg-secondary-0 peer-focus:px-1 peer-focus:text-primary-500 peer-focus:text-sm
        peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:text-secondary-500 peer-[&:not(:placeholder-shown)]:text-sm
        peer-focus:[&:not(:placeholder-shown)]:text-primary-500`}
      >
        {label} {required && <span className="text-error">*</span>}
      </label>

      {errors && errors[name] && (
        <span className="text-error block text-sm mt-1">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}

export default TextField;
