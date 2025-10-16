import useEmployerProjects from "./useEmployerProjects";
import Loading from "../../UI/Loading";
import Empty from "../../UI/Empty";
import Table from "../../UI/Table";
import ProjectTableRow from "./ProjectTableRow";

function ProjectsTable() {
  const { isLoading, projects } = useEmployerProjects();
  if (isLoading) return <Loading />;
  if (!projects.length) return <Empty resourceName="projects" />;
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>Title</th>
        <th>Category</th>
        <th>Budget</th>
        <th>Deadline</th>
        <th>Tags</th>
        <th>Freelancer / Applicants</th>
        <th>Status</th>
        <th>Actions</th>
      </Table.Header>
      <Table.Body>
        {projects.map((project, index) => (
          <ProjectTableRow key={project._id} project={project} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default ProjectsTable;
