function TextField({ label, name, onChange, placeholder, value }) {
  return (
    <div>
      <div>
        <label className="mb-1" htmlFor={name}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full textField__input"
          placeholder={placeholder}
          type="number"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default TextField;
