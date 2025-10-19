import { FiAward, FiClipboard, FiDollarSign } from "react-icons/fi";
import Stat from "../../UI/Stat";

function FreelancerStats({ proposals }) {
  const countOfProposals = proposals.length;
  const acceptedProposals = proposals.filter((p) => p.status === 2);
  const countAcceptedProposals = acceptedProposals.length;
  const expectedPayout = acceptedProposals.reduce(
    (acc, curr) => acc.price + curr,
    0
  );

  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
      <Stat
        color="primary"
        value={countOfProposals}
        title="Total submitted proposals"
        icon={<FiClipboard className="w-16 h-16" />}
      />
      <Stat
        color="yellow"
        value={countAcceptedProposals}
        title="Accepted proposals"
        icon={<FiAward className="w-16 h-16" />}
      />
      <Stat
        color="green"
        value={`${expectedPayout} €`}
        title="Expected earnings"
        icon={<FiDollarSign className="w-16 h-16" />}
      />
    </div>
  );
}

export default FreelancerStats;
