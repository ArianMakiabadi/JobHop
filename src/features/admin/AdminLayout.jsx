import { FiFileText, FiFolder, FiHome, FiUsers } from "react-icons/fi";
import AppLayout from "../../UI/AppLayout";
import SideBar from "../../UI/SideBar";
import CustomNavLink from "../../UI/CustomNavLink";

function AdminLayout() {
  return (
    <AppLayout>
      <SideBar>
        <CustomNavLink to={"dashboard"}>
          <FiHome />
          <span>Home</span>
        </CustomNavLink>

        <CustomNavLink to={"users"}>
          <FiUsers />
          <span>Users</span>
        </CustomNavLink>

        <CustomNavLink to={"projects"}>
          <FiFolder />
          <span>Projects</span>
        </CustomNavLink>

        <CustomNavLink to={"proposals"}>
          <FiFileText />
          <span>Proposals</span>
        </CustomNavLink>
      </SideBar>
    </AppLayout>
  );
}

export default AdminLayout;
