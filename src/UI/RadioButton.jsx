export default function RadioButton({
  name, // input name="role"
  value, // currently selected value
  onChange, // callback to set state
  id,
  label,
  checked,
  stretch = false, // if true => buttons stretch evenly
}) {
  return (
    <div className={`flex gap-4 items-center ${stretch ? "flex-1" : ""}`}>
      <div className={`${stretch ? "flex-1" : ""}`}>
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer hidden"
        />
        <label
          htmlFor={id}
          className="cursor-pointer border rounded-xl px-4 py-2 flex items-center justify-center gap-2 
                         text-sm font-medium transition-all duration-200 ease-in-out
                         hover:border-primary-500 peer-checked:border-primary-500 
                         peer-checked:bg-primary-800 peer-checked:text-white
                         w-full"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
