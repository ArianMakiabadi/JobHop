import { useState, useMemo } from "react";
import { FiFilter } from "react-icons/fi";
import useCategories from "../../../hooks/useCategories";
import Filter from "../../../UI/Filter";
import FilterDropDown from "../../../UI/FilterDropDown";
import Modal from "../../../UI/Modal";
import { useSearchParams } from "react-router-dom";

function ProjectsHeader() {
  const [open, setOpen] = useState(false);
  const { transformedCategories } = useCategories();
  const [params] = useSearchParams();

  const sortOptions = [
    { value: "latest", label: "Newest first" },
    { value: "earliest", label: "Oldest first" },
  ];
  const statusOptions = [
    { value: "ALL", label: "All" },
    { value: "OPEN", label: "Open" },
    { value: "CLOSED", label: "Closed" },
  ];

  // showing a small badge with the number of active filters
  const activeCount = useMemo(() => {
    let n = 0;
    if (params.get("status") && params.get("status") !== "ALL") n++;
    if (params.get("category") && params.get("category") !== "ALL") n++;
    if (params.get("sort") && params.get("sort") !== "latest") n++;
    return n;
  }, [params]);

  return (
    <div className="flex flex-row gap-3 items-center justify-between text-secondary-800 mb-6">
      <h1 className="text-xl md:text-2xl font-bold">Available projects</h1>

      {/* Desktop: inline filters */}
      <div className="hidden lg:flex lg:flex-wrap lg:gap-2">
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

      {/* Mobile: filters button */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-secondary-200 px-3 py-2 text-sm font-medium"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-filters"
        >
          <FiFilter className="h-5 w-5" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 rounded-full bg-secondary-200 px-2 py-0.5 text-xs">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile modal drawer */}
      <Modal
        id="mobile-filters"
        title="Filters"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="flex flex-col gap-3">
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
          <div className="mt-2 flex items-center justify-end gap-2">
            <button className="btn btn--primary" onClick={() => setOpen(false)}>
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectsHeader;
