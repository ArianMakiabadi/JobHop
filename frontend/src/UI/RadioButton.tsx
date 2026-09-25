import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface RadioButtonProps<T extends FieldValues> {
  name: Path<T>;
  value: string | number;
  register: UseFormRegister<T>;
  id: string;
  label: string;
  validationSchema?: RegisterOptions<T, Path<T>>;
  stretch?: boolean;
}

export default function RadioButton<T extends FieldValues>({
  name, // input name="role"
  value, // currently selected value
  register,
  id,
  label,
  validationSchema,
  stretch = false, // if true => buttons stretch evenly
}: RadioButtonProps<T>) {
  return (
    <div className={`flex gap-4 items-center ${stretch ? "flex-1" : ""}`}>
      <div className={`${stretch ? "flex-1" : ""}`}>
        <input
          type="radio"
          id={id}
          value={value}
          className="peer hidden"
          {...register(name, validationSchema)}
        />
        <label
          htmlFor={id}
          className="cursor-pointer border rounded-xl px-4 py-2 flex items-center justify-center gap-2 
                         text-sm font-medium transition-all duration-200 ease-in-out
                         hover:border-primary-500 peer-checked:border-primary-900 w-full"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
