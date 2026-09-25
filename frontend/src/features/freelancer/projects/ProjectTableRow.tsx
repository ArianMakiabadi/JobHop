import { MdAssignmentAdd } from "react-icons/md";
import Table from "../../../UI/Table";
import toLocalDateShort from "../../../utils/toLocalDateShort";
import truncateText from "../../../utils/truncateText";
import { useState } from "react";
import Modal from "../../../UI/Modal";
import CreateProposals from "../../proposals/CreateProposals";
import type { Project, ProjectStatus, StatusBadge } from "../../../types";

interface ProjectTableRowProps {
  project: Project;
  index: number;
}

function ProjectTableRow({ project, index }: ProjectTableRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { status, category, title, budget, deadline } = project;
  const projectStatus: Record<ProjectStatus, StatusBadge> = {
    OPEN: {
      label: "open",
      className: "badge--success",
    },
    CLOSED: {
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
