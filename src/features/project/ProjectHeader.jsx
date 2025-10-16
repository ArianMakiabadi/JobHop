import { HiArrowLeft } from "react-icons/hi";
import useMoveBack from "../../hooks/useMoveBack";

function ProjectHeader({ project }) {
  const moveBack = useMoveBack();
  return (
    <div className="flex items-center gap-x-4 mb-4">
      <HiArrowLeft
        onClick={moveBack}
        className="h-5 w-5 text-secondary-500 hover:cursor-pointer"
      />
      <h1 className="font-bold text-secondary-700 text-lg">{`Proposals for ${project.title}`}</h1>
    </div>
  );
}

export default ProjectHeader;
