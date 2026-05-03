import {useUserContext} from "../context/userContext";
import {Navigate, Outlet} from "react-router-dom";

export function ProtectedRoute() {
  const {User} = useUserContext();

  if (!User?.AccessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
