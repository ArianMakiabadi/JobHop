import { FiTrendingUp, FiUser } from "react-icons/fi";
import Stat from "../../UI/Stat";
import { FcAcceptDatabase } from "react-icons/fc";

function EmployerStats({ projects }) {
  const countOfProjects = projects.length;
  const hiredProjectsCount = projects.filter(
    (p) => p.freelancer !== null
  ).length;
  const countOfTotalProposals = projects.reduce(
    (acc, curr) => curr.proposals.length + acc,
    0
  );

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
      <Stat
        color="green"
        value={countOfProjects}
        title="Total projects"
        icon={<FcAcceptDatabase className="w-16 h-16" />}
      />
      <Stat
        color="primary"
        value={hiredProjectsCount}
        title="Projects in progress"
        icon={<FiTrendingUp className="w-16 h-16" />}
      />
      <Stat
        color="yellow"
        value={countOfTotalProposals}
        title="Applicants"
        icon={<FiUser className="w-16 h-16" />}
      />
    </div>
  );
}

export default EmployerStats;
