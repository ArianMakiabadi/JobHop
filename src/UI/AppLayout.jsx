import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[15rem_1fr]">
      <div className="bg-red-200 col-span-2">App header</div>
      <div className="bg-red-300">App sidebar</div>
      <div className="bg-blue-300">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
