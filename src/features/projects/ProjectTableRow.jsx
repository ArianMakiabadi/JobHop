import Table from "../../UI/Table";
import toLocalDateShort from "../../utils/toLocalDateShort";
import truncateText from "../../utils/TruncateText";

function ProjectTableRow({ project, index }) {
  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{truncateText(project.title, 25)}</td>
      <td>{project.category.title}</td>
      <td>{project.budget} €</td>
      <td>{toLocalDateShort(project.deadline)}</td>
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
    </Table.Row>
  );
}

export default ProjectTableRow;
