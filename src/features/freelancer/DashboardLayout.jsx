import Loading from "../../UI/Loading";
import useProposals from "../proposals/useProposals";
import DashboardHeader from "./DashboardHeader";
import FreelancerStats from "./FreelancerStats";

function DashboardLayout() {
  const { isLoading, proposals } = useProposals();

  if (isLoading) return <Loading />;

  return (
    <div>
      <DashboardHeader />
      <FreelancerStats proposals={proposals} />
    </div>
  );
}

export default DashboardLayout;
