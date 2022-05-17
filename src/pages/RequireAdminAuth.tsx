import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

export function RequireAdminAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  let loggedInUser = localStorage.getItem("token");
  const user: any = loggedInUser && jwt_decode(loggedInUser);
  if (!user.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
