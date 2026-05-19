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
    <div
      className="
        grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  
        gap-4"
    >
      <Stat
        color="green"
        value={countOfProjects}
        title="Total projects"
        icon={
          <FcAcceptDatabase className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
        }
      />
      <Stat
        color="primary"
        value={hiredProjectsCount}
        title="Projects in progress"
        icon={
          <FiTrendingUp className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
        }
      />
      <Stat
        color="yellow"
        value={countOfTotalProposals}
        title="Applicants"
        icon={<FiUser className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />}
      />
    </div>
  );
}

export default EmployerStats;
