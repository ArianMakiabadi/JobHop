import type { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import type { SelectOption } from "../types";

interface FilterDropDownProps {
  options: SelectOption[];
  paramKey: string;
  placeholder?: string;
}

function FilterDropDown({
  options,
  paramKey,
  placeholder,
}: FilterDropDownProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(paramKey) || "";
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
