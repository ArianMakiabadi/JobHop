import { HiCollection, HiHome } from "react-icons/hi";
import AppLayout from "../../UI/AppLayout";
import CustomNavLink from "../../UI/CustomNavLink";
import SideBar from "../../UI/SideBar";
import { FiFileText, FiSettings } from "react-icons/fi";

function FreelancerLayout() {
  return (
    <AppLayout>
      <SideBar>
        <CustomNavLink to={"dashboard"}>
          <HiHome />
          <span>Home</span>
        </CustomNavLink>

        <CustomNavLink to={"projects"}>
          <HiCollection />
          <span>Projects</span>
        </CustomNavLink>

        <CustomNavLink to={"proposals"}>
          <FiFileText />
          <span>Proposals</span>
        </CustomNavLink>
        <CustomNavLink to={"edit-profile"}>
          <FiSettings />
          <span>Edit Profile</span>
        </CustomNavLink>
      </SideBar>
    </AppLayout>
  );
}

export default FreelancerLayout;
