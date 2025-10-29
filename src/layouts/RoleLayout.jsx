import { useState } from "react";
import SideBar from "../UI/SideBar";
import CustomNavLink from "../UI/CustomNavLink";
import AppLayout from "./AppLayout";

function RoleLayout({ navItems }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <AppLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <SideBar>
        {navItems.map(({ to, icon: Icon, label }) => (
          <CustomNavLink key={to} to={to} closeSidebar={closeSidebar}>
            <Icon />
            <span>{label}</span>
          </CustomNavLink>
        ))}
      </SideBar>
    </AppLayout>
  );
}

export default RoleLayout;
