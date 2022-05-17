import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  let loggedInUser = localStorage.getItem("token");
  const user: any = loggedInUser && jwt_decode(loggedInUser);
  if (!user) {
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;
