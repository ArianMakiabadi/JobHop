import UserAvatar from "../features/authentication/UserAvatar";
import useUser from "../features/authentication/useUser";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const { isLoading } = useUser();

  return (
    <div className="bg-secondary-0 py-2 px-8 border-b border-secondary-100">
      <div
        className={`container xl:max-w-screen-xl flex items-center justify-end gap-x-8
          ${isLoading ? "blur-sm opacity-30" : ""}
          `}
      >
        <UserAvatar />
        <HeaderMenu />
      </div>
    </div>
  );
}

export default Header;
