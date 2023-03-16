import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginPageContext } from "../context";

export const PrivateRouteAdmin = () => {
  const { adminLogged } = useContext(LoginPageContext);

  return adminLogged || localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
