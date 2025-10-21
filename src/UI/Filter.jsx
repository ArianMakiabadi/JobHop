import { useSearchParams } from "react-router-dom";

function Filter({ paramKey, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(paramKey) || options.at(0).value;
  const handleClick = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramKey, value);
    setSearchParams(newParams);
  };
  return (
    <div className="flex items-center gap-x-2 text-xs">
      <span>Status</span>
      <div className="flex items-center gap-x-2 border border-secondary-200 bg-secondary-0 rounded-lg">
        {options.map(({ value, label }) => {
          const isActive = value === currentFilter;
          return (
            <button
              key={value}
              disabled={isActive}
              onClick={() => handleClick(value)}
              className={`whitespace-nowrap rounded-md px-4 py-1.5 font-semibold transition-all duration-200 ease-in-out ${
                isActive ? "bg-primary-200/50 text-primary-700" : ""
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Filter;
