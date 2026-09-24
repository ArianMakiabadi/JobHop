import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";

function HeaderMenu() {
  return (
    <ul className="flex items-center justify-center gap-x-4 ">
      <li className="flex">
        <DarkModeToggle />
      </li>
      <li className="flex">
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
