import Loading from "../../UI/Loading";
import useEmployerProjects from "../projects/useEmployerProjects";
import DashboardHeader from "./DashboardHeader";
import EmployerStats from "./EmployerStats";

function Dashboard() {
  const { isLoading, projects } = useEmployerProjects();

  if (isLoading) return <Loading />;

  return (
    <div>
      <DashboardHeader />
      <EmployerStats projects={projects} />
    </div>
  );
}

export default Dashboard;
