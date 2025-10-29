import {
  FiFileText,
  FiFolder,
  FiHome,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

export const adminNav = [
  { to: "dashboard", icon: FiHome, label: "Home" },
  { to: "users", icon: FiUsers, label: "Users" },
  { to: "projects", icon: FiFolder, label: "Projects" },
  { to: "proposals", icon: FiFileText, label: "Proposals" },
  { to: "categories", icon: BiCategory, label: "Categories" },
  { to: "edit-profile", icon: FiSettings, label: "Edit Profile" },
];
