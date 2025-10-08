import useUser from "../features/authentication/useUser";

function Header() {
  const { data } = useUser();
  console.log(data);
  return <div className="bg-red-200">App header</div>;
}

export default Header;
