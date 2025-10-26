import useUser from "../features/authentication/useUser";

function SideBar({ children }) {
  const { user } = useUser();
  const firstLetter = user.name[0].toUpperCase();

  return (
    <div className="flex flex-col bg-secondary-0 row-start-1 row-span-2 p-4">
      <ul className="flex flex-col gap-y-2">{children}</ul>
      <div className="flex flex-row gap-2 items-center mt-auto mb-2">
        <div
          className="relative flex items-center justify-center rounded-full w-10 h-10
         text-secondary-0 text-lg bg-secondary-300 "
        >
          <p>{firstLetter}</p>
          <span className="absolute bottom-0.5 right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
        </div>
        <div>
          <p className="text-secondary-700 font-bold">{user.name}</p>
          <p className="text-secondary-400 text-xs">
            {user.role.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
