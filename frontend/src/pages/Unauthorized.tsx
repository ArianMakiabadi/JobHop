import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-secondary-700">
      <FaLock className="text-6xl text-primary-600 mb-4" />
      <h1 className="text-5xl font-bold mb-2">Access Denied</h1>
      <p className="text-base text-secondary-500 mb-8">
        You are not authorized to view this page.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 text-sm font-semibold bg-primary-600 text-secondary-0 rounded-md hover:bg-primary-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}

export default Unauthorized;
