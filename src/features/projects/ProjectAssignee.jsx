import { Link } from "react-router-dom";

function ProjectAssignee({ project }) {
  const proposalsCount = project.proposals?.length || 0;

  return (
    <>
      {project.freelancer?.name ? (
        project.freelancer.name
      ) : proposalsCount > 0 ? (
        <Link to={project._id}>
          <button className="btn btn--primary">
            {`${proposalsCount} ${
              proposalsCount === 1 ? "applicant" : "applicants"
            }`}
          </button>
        </Link>
      ) : (
        "-"
      )}
    </>
  );
}

export default ProjectAssignee;
