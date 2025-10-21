import useToggleProjectStatus from "./useToggleProjectStatus";
import toast from "react-hot-toast";
import Loading from "../../UI/Loading";
import Toggle from "../../UI/Toggle";

function ToggleProjectStatus({ project }) {
  const enabled = project.status === "OPEN" ? true : false;

  const { isUpdating, toggleProject } = useToggleProjectStatus();

  const toggleHandler = () => {
    const status = project.status === "OPEN" ? "CLOSED" : "OPEN";
    toggleProject(
      { id: project._id, data: { status } },
      {
        onSuccess: () => {
          toast.success(
            status === "OPEN"
              ? "Project is now live and open!"
              : "Project has been closed."
          );
        },
      }
    );
  };

  return (
    <div className="w-[5rem]">
      {isUpdating ? (
        <Loading height={20} width={50} />
      ) : (
        <Toggle checked={enabled} onChange={toggleHandler} />
      )}
    </div>
  );
}

export default ToggleProjectStatus;
