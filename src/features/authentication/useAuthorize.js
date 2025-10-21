import { useLocation } from "react-router-dom";
import useUser from "./useUser";

export default function useAuthorize() {
  const { isLoading, user } = useUser();
  const { pathname } = useLocation();
  let isAuthorized = false;
  let isAuthenticated = false;
  if (user) isAuthenticated = true;

  const desiredRole = pathname.split("/").at(1);
  const ROLES = {
    admin: "ADMIN",
    freelancer: "FREELANCER",
    employer: "EMPLOYER",
  };

  if (Object.keys(ROLES).includes(desiredRole)) {
    if (user && user.role === ROLES[desiredRole]) isAuthorized = true;
  }
  return { isLoading, isAuthenticated, isAuthorized };
}
