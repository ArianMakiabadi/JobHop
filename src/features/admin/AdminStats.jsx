import { FiFileText, FiFolder, FiUsers } from "react-icons/fi";
import Stat from "../../UI/Stat";

function AdminStats({ users, proposals, projects }) {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
      <Stat
        color="primary"
        value={users}
        title="Users"
        icon={<FiUsers className="w-16 h-16" />}
      />
      <Stat
        color="yellow"
        value={proposals}
        title="Proposals"
        icon={<FiFileText className="w-16 h-16" />}
      />
      <Stat
        color="green"
        value={projects}
        title="Projects"
        icon={<FiFolder className="w-16 h-16" />}
      />
    </div>
  );
}

export default AdminStats;
