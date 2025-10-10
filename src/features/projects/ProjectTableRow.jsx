import { HiOutlineTrash } from "react-icons/hi";
import Table from "../../UI/Table";
import toLocalDateShort from "../../utils/toLocalDateShort";
import truncateText from "../../utils/TruncateText";
import { TbPencilMinus } from "react-icons/tb";
import Modal from "../../UI/Modal";
import { useState } from "react";
import ConfirmDelete from "../../UI/ConfirmDelete";

function ProjectTableRow({ project, index }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
      <td>
        <div className="flex items-center gap-x-4">
          <button onClick={() => setIsEditOpen(true)}>
            <TbPencilMinus className="w-5 h-5 text-primary-900 hover:text-primary-700" />
          </button>
          <Modal
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            title="test title"
          >
            this is modal
          </Modal>
          <button onClick={() => setIsDeleteOpen(true)}>
            <HiOutlineTrash className="w-5 h-5 text-error hover:text-red-400" />
          </button>
          <Modal
            open={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            title={`Deleting ${project.title}`}
          >
            <ConfirmDelete
              resourceName={project.title}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={() => {}}
              disabled={false}
            />
          </Modal>
        </div>
      </td>
    </Table.Row>
  );
}

export default ProjectTableRow;
