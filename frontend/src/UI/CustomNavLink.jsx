import { NavLink } from "react-router-dom";

export default function CustomNavLink({ children, to, closeSidebar }) {
  const navLinkClass =
    "flex items-center gap-2 hover:bg-primary-100/50 hover:text-primary-600 px-2 py-1.5 rounded-xl transition-all duration-300";

  return (
    <li>
      <NavLink
        to={to}
        onClick={closeSidebar}
        className={({ isActive }) =>
          isActive
            ? `${navLinkClass} bg-primary-200/50 text-primary-700`
            : `${navLinkClass} text-secondary-700`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
