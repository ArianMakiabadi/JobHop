import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function FilterDropDown({ options, paramKey, placeholder }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(paramKey) || "";
  const handleChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramKey, e.target.value);
    setSearchParams(newParams);
  };
  return (
    <Select
      onChange={handleChange}
      value={value}
      options={options}
      placeholder={placeholder}
    />
  );
}

export default FilterDropDown;
