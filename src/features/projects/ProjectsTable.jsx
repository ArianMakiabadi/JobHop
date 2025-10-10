import useEmployerProjects from "./useEmployerProjects";
import Loading from "../../UI/Loading";
import Empty from "../../UI/Empty";
import truncateText from "../../utils/TruncateText";

function ProjectsTable() {
  const { isLoading, projects } = useEmployerProjects();
  if (isLoading) return <Loading />;
  if (!projects.length) return <Empty resourceName="projects" />;
  return (
    <div className=" overflow-x-auto">
      <table>
        <thead>
          <tr className="title-row">
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Budget</th>
            <th>Deadline</th>
            <th>Tags</th>
            <th>Freelancer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project._id}>
              <td>{index + 1}</td>
              <td>{truncateText(project.title, 25)}</td>
              <td>{project.category.title}</td>
              <td>{project.budget}</td>
              <td>
                {new Date(project.deadline).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td>
                <div className="flex flex-wrap items-center gap-2 max-w-[200px]">
                  {project.tags.map((tag, index) => (
                    <span className="badge badge--secondary" key={index}>
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td>{project.freelancer?.name || "-"}</td>
              <td>
                {project.status === "OPEN" ? (
                  <span className="badge badge--success">OPEN</span>
                ) : (
                  <span className="badge badge--danger">CLOSED</span>
                )}
              </td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTable;
