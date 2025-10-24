import { HiOutlineTrash } from "react-icons/hi";
import Table from "../../UI/Table";
import toLocalDateShort from "../../utils/toLocalDateShort";
import truncateText from "../../utils/truncateText";
import { TbPencilMinus } from "react-icons/tb";
import Modal from "../../UI/Modal";
import { useState } from "react";
import ConfirmDelete from "../../UI/ConfirmDelete";
import useRemoveProject from "./useRemoveProject";
import CreateProjectForm from "./CreateProjectForm";
import ToggleProjectStatus from "./ToggleProjectStatus";
import ProjectAssignee from "./ProjectAssignee";

function ProjectTableRow({ project, index }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { removeProject } = useRemoveProject();

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{truncateText(project.title, 25)}</td>
      <td>{project.category.title}</td>
      <td>{project.budget} €</td>
      <td>{toLocalDateShort(project.deadline)}</td>
      <td>
        <div className="flex flex-wrap items-center justify-center gap-1 max-w-[200px]">
          {project.tags.map((tag, index) => (
            <span className="badge badge--secondary text-[0.6rem]" key={index}>
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td>
        <ProjectAssignee project={project} />
      </td>
      <td>
        <ToggleProjectStatus project={project} />
      </td>
      <td>
        <div className="flex items-center gap-x-4">
          <button onClick={() => setIsEditOpen(true)}>
            <TbPencilMinus className="w-5 h-5 text-primary-600 hover:text-primary-500" />
          </button>
          <Modal
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            title={`Edit ${project.title}?`}
          >
            <CreateProjectForm
              projectToEdit={project}
              onClose={() => setIsEditOpen(false)}
            />
          </Modal>
          <button onClick={() => setIsDeleteOpen(true)}>
            <HiOutlineTrash className="w-5 h-5 text-error hover:text-red-300" />
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
        </div>
      </td>
    </Table.Row>
  );
}

export default ProjectTableRow;
