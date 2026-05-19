import { FiAward, FiClipboard, FiDollarSign } from "react-icons/fi";
import Stat from "../../UI/Stat";

function FreelancerStats({ proposals }) {
  const countOfProposals = proposals.length;
  const acceptedProposals = proposals.filter((p) => p.status === 2);
  const countAcceptedProposals = acceptedProposals.length;
  const expectedPayout = acceptedProposals.reduce(
    (acc, curr) => curr.price + acc,
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
        color="primary"
        value={countOfProposals}
        title="Total submitted proposals"
        icon={
          <FiClipboard className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
        }
      />
      <Stat
        color="yellow"
        value={countAcceptedProposals}
        title="Accepted proposals"
        icon={<FiAward className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />}
      />
      <Stat
        color="green"
        value={`${expectedPayout} €`}
        title="Expected earnings"
        icon={
          <FiDollarSign className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
        }
      />
    </div>
  );
}

export default FreelancerStats;
