import useUser from "../features/authentication/useUser";
import ProjectsHeader from "../features/freelancer/projects/ProjectsHeader";
import FreelancerProjectsTable from "../features/freelancer/projects/ProjectsTable";
import EmployerProjectHeader from "../features/projects/ProjectsHeader";
import ProjectsTable from "../features/projects/ProjectsTable";
import useEmployerProjects from "../features/projects/useEmployerProjects";
import useProjects from "../hooks/useProjects";

function SubmittedProjects() {
  const { user } = useUser();
  const { isLoading, projects } = useProjects();
  const { isLoading: employerLoading, projects: employerProjects } =
    useEmployerProjects();

  const renderTable = () => {
    switch (user.role) {
      case "FREELANCER":
        return (
          <>
            <ProjectsHeader />
            <FreelancerProjectsTable />
          </>
        );
      case "EMPLOYER":
        return (
          <>
            <EmployerProjectHeader />
            <ProjectsTable
              isLoading={employerLoading}
              projects={employerProjects}
            />
          </>
        );
      case "ADMIN":
        return (
          <>
            <ProjectsHeader />
            <ProjectsTable isLoading={isLoading} projects={projects} />
          </>
        );
      default:
        return <p>Unknown role</p>;
    }
  };

  return <div>{renderTable()}</div>;
}

export default SubmittedProjects;
