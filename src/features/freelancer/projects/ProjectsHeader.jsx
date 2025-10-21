import useCategories from "../../../hooks/useCategories";
import Filter from "../../../UI/Filter";
import FilterDropDown from "../../../UI/FilterDropDown";

function ProjectsHeader() {
  const { transformedCategories } = useCategories();
  const sortOptions = [
    { value: "latest", label: "Newest first" },
    { value: "earliest", label: "Oldest first" },
  ];
  const statusOptions = [
    { value: "ALL", label: "All" },
    { value: "OPEN", label: "Open" },
    { value: "CLOSED", label: "Closed" },
  ];
  return (
    <div className="flex items-center justify-between text-secondary-800 mb-8">
      <h1 className="text-2xl font-bold">Avaliable projects</h1>
      <div className="flex gap-x-2">
        <Filter paramKey="status" options={statusOptions} />
        <FilterDropDown
          paramKey="category"
          placeholder="Select a category..."
          options={[{ value: "ALL", label: "All" }, ...transformedCategories]}
        />
        <FilterDropDown
          paramKey="sort"
          placeholder="Sort by..."
          options={sortOptions}
        />
      </div>
    </div>
  );
}

export default ProjectsHeader;
