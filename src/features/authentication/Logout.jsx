import { FiLogOut } from "react-icons/fi";

function Logout() {
  return (
    <button>
      <FiLogOut className="h-5 w-5 text-secondary-500 hover:text-error" />
    </button>
  );
}

export default Logout;
