import { HiCollection, HiHome } from "react-icons/hi";
import { FiFileText, FiSettings } from "react-icons/fi";

export const freelancerNav = [
  { to: "dashboard", icon: HiHome, label: "Home" },
  { to: "projects", icon: HiCollection, label: "Projects" },
  { to: "proposals", icon: FiFileText, label: "Proposals" },
  { to: "edit-profile", icon: FiSettings, label: "Edit Profile" },
];
