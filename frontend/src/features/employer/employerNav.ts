import { HiCollection, HiHome } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import type { NavItem } from "../../types";

export const employerNav: NavItem[] = [
  { to: "/employer/dashboard", icon: HiHome, label: "Home" },
  { to: "/employer/projects", icon: HiCollection, label: "Projects" },
  { to: "edit-profile", icon: FiSettings, label: "Edit Profile" },
];
