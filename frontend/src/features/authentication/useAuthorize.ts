import { useLocation } from "react-router-dom";
import useUser from "./useUser";
import type { UserRole } from "../../types";

export default function useAuthorize() {
  const { isLoading, user } = useUser();
  const { pathname } = useLocation();
  let isAuthorized = false; // is trying to access his own panel or someone else
  let isAuthenticated = false; // is phone number, name and email provided
  let isVerified = false; // verified by admin
  if (user) isAuthenticated = true;
  if (user && user.status === 2) isVerified = true;

  const desiredRole = pathname.split("/").at(1);
  const ROLES: Record<string, UserRole> = {
    admin: "ADMIN",
    freelancer: "FREELANCER",
    employer: "EMPLOYER",
  };

  if (desiredRole && Object.keys(ROLES).includes(desiredRole)) {
    if (user && user.role === ROLES[desiredRole]) isAuthorized = true;
  }
  return { isLoading, isAuthenticated, isAuthorized, isVerified };
}
