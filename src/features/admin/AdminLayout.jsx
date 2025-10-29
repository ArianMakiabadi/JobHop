import RoleLayout from "../../layouts/RoleLayout";
import { adminNav } from "./adminNav";

function AdminLayout() {
  return <RoleLayout navItems={adminNav} />;
}

export default AdminLayout;
