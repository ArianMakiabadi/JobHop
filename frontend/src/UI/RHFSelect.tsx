import {
  get,
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import type { SelectOption } from "../types";

interface RHFSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: SelectOption<string | number>[];
  errors?: FieldErrors<T>;
  required?: boolean;
  validationSchema?: RegisterOptions<T, Path<T>>;
  watch: UseFormWatch<T>;
}

function RHFSelect<T extends FieldValues>({
  label,
  name,
  register,
  options,
  errors,
  required,
  validationSchema,
  watch,
}: RHFSelectProps<T>) {
  const value = watch(name);
  const error: FieldError | undefined = get(errors, name);
  const hasValue = value !== undefined && value !== null && value !== "";

  return (
    <div className="relative mt-6">
      <select
        {...register(name, validationSchema)}
        id={name}
        className="peer w-full border border-secondary-400 rounded-xl px-3 pt-4 pb-3
                   bg-secondary-0 text-secondary-700 appearance-none
                   focus:outline-none focus:border-primary-500"
      >
        <option value="" disabled hidden></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={name}
        className={`absolute left-3 text-secondary-400 transition-all duration-200
          pointer-events-none z-10
          ${
            hasValue
              ? "-top-2.5 text-sm bg-secondary-0 px-1 text-secondary-500"
              : "top-4 text-base"
          }
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-500 peer-focus:bg-secondary-0 peer-focus:px-1`}
      >
        {label} {required && <span className="text-error">*</span>}
      </label>

      {error && (
        <span className="text-error block text-sm mt-1">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default RHFSelect;
