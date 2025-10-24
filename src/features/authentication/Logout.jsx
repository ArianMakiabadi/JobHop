import { FiLogOut } from "react-icons/fi";
import useLogout from "./useLogout";
import Loading from "../../UI/Loading";

function Logout() {
  const { isPending, logout } = useLogout();
  return isPending ? (
    <Loading />
  ) : (
    <button onClick={logout}>
      <FiLogOut className="h-5 w-5 text-secondary-500 hover:text-error" />
    </button>
  );
}

export default Logout;
