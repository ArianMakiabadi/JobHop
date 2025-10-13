import { useState } from "react";

function RHFSelect({ label, name, register, options, errors, required }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="relative mt-6">
      <select
        {...register(name, { required })}
        id={name}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="peer w-full border border-secondary-400 rounded-xl px-3 pt-4 pb-3
                   bg-white text-secondary-700 appearance-none
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
        className={`absolute left-3 text-secondary-500 transition-all duration-200
          pointer-events-none
          ${
            selected
              ? "-top-2.5 text-sm bg-white px-1 text-secondary-500"
              : "top-4 text-base"
          }
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-500 peer-focus:bg-white peer-focus:px-1`}
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

export default RHFSelect;
