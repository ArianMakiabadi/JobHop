import { HiCollection, HiHome } from "react-icons/hi";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="bg-secondary-0 row-start-1 row-span-2 p-4">
      <ul className="flex flex-col gap-y-4">
        <li>
          <CustomNavLink to={"/employer/dashboard"}>
            <HiHome />
            <span>Home</span>
          </CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={"/employer/projects"}>
            <HiCollection />
            <span>Projects</span>
          </CustomNavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;

function CustomNavLink({ children, to }) {
  const navLinkClass =
    "flex items-center gap-2 hover:bg-primary-100/50 hover:text-primary-600 px-2 py-1.5 rounded-xl transition-all duration-300";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${navLinkClass} bg-primary-200/50 text-primary-700`
          : `${navLinkClass} text-secondary-700`
      }
    >
      {children}
    </NavLink>
  );
}
