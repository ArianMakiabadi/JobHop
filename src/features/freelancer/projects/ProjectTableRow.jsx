import { MdAssignmentAdd } from "react-icons/md";
import Table from "../../../UI/Table";
import toLocalDateShort from "../../../utils/toLocalDateShort";
import truncateText from "../../../utils/truncateText";
import { useState } from "react";
import Modal from "../../../UI/Modal";
import CreateProposals from "../../proposals/CreateProposals";
import useUser from "../../authentication/useUser";
import { FiTrash } from "react-icons/fi";
import useRemoveProject from "../../projects/useRemoveProject";
import ConfirmDelete from "../../../UI/ConfirmDelete";

function ProjectTableRow({ project, index }) {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { user } = useUser();
  const { removeProject } = useRemoveProject();
  const { status, category, title, budget, deadline } = project;
  const projectStatus = {
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
      {user.role === "EMPLOYER" ? (
        <td>
          <button onClick={() => setIsApplyOpen(true)}>
            <MdAssignmentAdd className="w-5 h-5 text-primary-600" />
          </button>
          <Modal
            open={isApplyOpen}
            onClose={() => setIsApplyOpen(false)}
            title="Contact the employer"
          >
            <CreateProposals
              onClose={() => setIsApplyOpen(false)}
              projectId={project._id}
            />
          </Modal>
        </td>
      ) : (
        <td>
          <button onClick={() => setIsDeleteOpen(true)}>
            <FiTrash className="w-5 h-5 text-error" />
          </button>
          <Modal
            open={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            title={`Deleting ${project.title}`}
          >
            <ConfirmDelete
              resourceName={project.title}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={() =>
                removeProject(project._id, {
                  onSuccess: setIsDeleteOpen(false),
                })
              }
              disabled={false}
            />
          </Modal>
        </td>
      )}
    </Table.Row>
  );
}

export default ProjectTableRow;
