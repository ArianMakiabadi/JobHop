import { HiCollection, HiHome } from "react-icons/hi";
import AppLayout from "../../UI/AppLayout";
import CustomNavLink from "../../UI/CustomNavLink";
import SideBar from "../../UI/SideBar";
import { FiSettings } from "react-icons/fi";

function EmployerLayout() {
  return (
    <AppLayout>
      <SideBar>
        <CustomNavLink to={"/employer/dashboard"}>
          <HiHome />
          <span>Home</span>
        </CustomNavLink>

        <CustomNavLink to={"/employer/projects"}>
          <HiCollection />
          <span>Projects</span>
        </CustomNavLink>

        <CustomNavLink to={"edit-profile"}>
          <FiSettings />
          <span>Edit Profile</span>
        </CustomNavLink>
      </SideBar>
    </AppLayout>
  );
}

export default EmployerLayout;
