import { HiCollection, HiHome } from "react-icons/hi";
import AppLayout from "../../UI/AppLayout";
import CustomNavLink from "../../UI/CustomNavLink";
import SideBar from "../../UI/SideBar";

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
      </SideBar>
    </AppLayout>
  );
}

export default EmployerLayout;
