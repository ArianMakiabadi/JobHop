import { MdAssignmentAdd } from "react-icons/md";
import Table from "../../../UI/Table";
import toLocalDateShort from "../../../utils/toLocalDateShort";
import truncateText from "../../../utils/TruncateText";
import { useState } from "react";
import Modal from "../../../UI/Modal";
import CreateProposals from "../../proposals/CreateProposals";

function ProjectTableRow({ project, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const { status, category, title, budget, deadline } = project;
  const projectStatus = {
    OPEN: {
      label: "open",
      className: "badge--success",
    },
    CLOSE: {
      label: "closed",
      className: "badge--danger",
    },
  };

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{truncateText(title, 25)}</td>
      <td>{category.title}</td>
      <td>{budget} €</td>
      <td>{toLocalDateShort(deadline)}</td>
      <td>
        <span className={`badge ${projectStatus[status].className}`}>
          {projectStatus[status].label}
        </span>
      </td>
      <td>
        <button onClick={() => setIsOpen(true)}>
          <MdAssignmentAdd className="w-5 h-5 text-primary-600" />
        </button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Contact the employer"
        >
          <CreateProposals
            onClose={() => setIsOpen(false)}
            projectId={project._id}
          />
        </Modal>
      </td>
    </Table.Row>
  );
}

export default ProjectTableRow;
