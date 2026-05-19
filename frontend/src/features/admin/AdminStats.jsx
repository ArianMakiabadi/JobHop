import { FiFileText, FiFolder, FiTag, FiUsers } from "react-icons/fi";
import Stat from "../../UI/Stat";

function AdminStats({ users, proposals, projects, categories }) {
  return (
    <div
      className="
        grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        gap-4
      "
    >
      <Stat
        color="primary"
        value={users}
        title="Users"
        icon={<FiUsers className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />}
      />
      <Stat
        color="yellow"
        value={proposals}
        title="Proposals"
        icon={
          <FiFileText className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
        }
      />
      <Stat
        color="green"
        value={projects}
        title="Projects"
        icon={
          <FiFolder className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
        }
      />
      <Stat
        color="blue"
        value={categories}
        title="Categories"
        icon={<FiTag className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />}
      />
    </div>
  );
}

export default AdminStats;
