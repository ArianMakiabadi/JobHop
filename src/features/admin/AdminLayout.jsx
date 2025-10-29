import {
  FiFileText,
  FiFolder,
  FiHome,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import AppLayout from "../../UI/AppLayout";
import SideBar from "../../UI/SideBar";
import CustomNavLink from "../../UI/CustomNavLink";
import { BiCategory } from "react-icons/bi";

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

        <CustomNavLink to={"categories"}>
          <BiCategory />
          <span>Categories</span>
        </CustomNavLink>

        <CustomNavLink to={"edit-profile"}>
          <FiSettings />
          <span>Edit Profile</span>
        </CustomNavLink>
      </SideBar>
    </AppLayout>
  );
}

export default AdminLayout;
