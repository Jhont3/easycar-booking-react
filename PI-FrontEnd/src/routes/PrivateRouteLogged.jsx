import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginPageContext } from "../context";

export const PrivateRouteLogged = () => {
  const { userLogged } = useContext(LoginPageContext);

  return userLogged || localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
