import { useNavigate } from "react-router-dom";
import useAuthorize from "../features/authentication/useAuthorize";
import { useEffect } from "react";
import Loading from "./Loading";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated, isAuthorized, isVerified } =
    useAuthorize();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/auth");
    if (!isVerified && !isLoading) navigate("/pending");
    if (!isAuthorized && !isLoading) navigate("/unauthorized");
  }, [isAuthenticated, isLoading, isAuthorized, isVerified, navigate]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-secondary-100">
        <Loading />
      </div>
    );

  if (isAuthenticated && isAuthorized) return children;
}

export default ProtectedRoute;
