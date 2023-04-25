import { Outlet, Navigate } from "react-router-dom";

import Auth from "../Auth/Auth";

const useAuth = () => {
  return Auth.isAuthenticated();
};

const ProtectedRoots = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoots;
