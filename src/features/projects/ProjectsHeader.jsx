import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import CreateProjectForm from "./CreateProjectForm";
import Modal from "../../UI/Modal";

function ProjectsHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center pb-8">
      <h1 className="font-semibold text-2xl">Your projects</h1>
      <Modal
        title="Add a new project"
        open={open}
        onClose={() => setOpen(false)}
      >
        <CreateProjectForm onClose={() => setOpen(false)} />
      </Modal>
      <button
        className="btn btn--primary py-2 flex items-center gap-1"
        onClick={() => setOpen(true)}
      >
        <p className="font-semibold">New project</p>
        <HiPlus className="w-4 h-4" />
      </button>
    </div>
  );
}

export default ProjectsHeader;
