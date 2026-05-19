import { FiInbox } from "react-icons/fi";

function Empty({ resourceName }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
      <FiInbox size={42} className="mb-3 text-gray-400" />
      <p className="text-lg font-medium">No {resourceName} found</p>
    </div>
  );
}

export default Empty;
