import UserAvatar from "../features/authentication/UserAvatar";
import useUser from "../features/authentication/useUser";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const { isLoading } = useUser();

  return (
    <div className="flex items-center bg-secondary-0 py-2 xl:px-4 border-b border-secondary-100">
      <p className="hidden xl:block text-primary-800 font-extrabold text-3xl">
        JobHop!
      </p>
      <div
        className={`container xl:max-w-screen-xl flex items-center justify-end h-6 gap-x-8
          ${isLoading ? "blur-sm opacity-30" : ""}
          `}
      >
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
