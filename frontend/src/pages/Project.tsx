import ProjectHeader from "../features/project/ProjectHeader";
import ProposalsTable from "../features/project/ProposalsTable";
import useProject from "../features/project/useProject";
import Loading from "../UI/Loading";
import Empty from "../UI/Empty";

function Project() {
  const { project, isLoading } = useProject();

  if (isLoading) return <Loading />;
  // e.g. the request failed (unknown id); used to crash on `project.title`
  if (!project) return <Empty resourceName="project" />;

  return (
    <div>
      <ProjectHeader project={project} />
      <ProposalsTable proposals={project.proposals} />
    </div>
  );
}

export default Project;
