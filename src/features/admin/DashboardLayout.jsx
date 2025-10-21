import useProjects from "../../hooks/useProjects";
import Loading from "../../UI/Loading";
import useProposals from "../proposals/useProposals";
import AdminStats from "./AdminStats";
import DashboardHeader from "./DashboardHeader";
import useUsers from "./useUsers";

function DashboardLayout() {
  const { isLoading: isProposalsLoading, proposals } = useProposals();
  const { isLoading: isProjectsLoading, projects } = useProjects();
  const { isLoading: isUsersLoading, users } = useUsers();

  if (isProposalsLoading || isProjectsLoading || isUsersLoading)
    return <Loading />;

  return (
    <div>
      <DashboardHeader />
      <AdminStats
        proposals={proposals.length}
        projects={projects.length}
        users={users.length}
      />
    </div>
  );
}

export default DashboardLayout;
