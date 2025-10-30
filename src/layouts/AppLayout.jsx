import { Outlet } from "react-router-dom";
import Header from "../UI/Header";
import { FiMenu } from "react-icons/fi";

function AppLayout({ children, isSidebarOpen, toggleSidebar }) {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1fr] xl:grid-cols-[15rem_1fr] grid-rows-[auto_1fr] h-full">
        {/* Mobile Header */}
        <div className="xl:hidden bg-secondary-0 py-2 px-4 border-b border-secondary-100 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-secondary-100 transition"
          >
            <FiMenu className="text-secondary-500" size={22} />
          </button>
          <Header />
        </div>

        {/* Desktop Header */}
        <div className="hidden xl:block xl:col-span-2">
          <Header />
        </div>

        {/* Sidebar (hidden on mobile, slides in) */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-64 transform bg-secondary-0 border-r border-secondary-100
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            xl:relative xl:translate-x-0 xl:w-[15rem]
            rounded-tr-2xl rounded-br-2xl overflow-hidden xl:rounded-none xl:overflow-visible
          `}
        >
          {/* Close on mobile click */}
          <div className="h-full flex flex-col">{children}</div>
        </div>

        {/* Overlay on mobile */}
        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-secondary-500 bg-opacity-40 z-30 xl:hidden"
          ></div>
        )}

        {/* Main Content */}
        <div className="bg-secondary-100 p-6 overflow-y-auto">
          <div className="mx-auto max-w-screen-xl flex flex-col gap-y-6 xl:gap-y-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
