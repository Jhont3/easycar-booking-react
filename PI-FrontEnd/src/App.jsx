import { Navigate, Route, Routes } from "react-router-dom";
import { Footer, Header } from "./components";

import { DataAPIContextProvider } from "./context/DataAPIContext";
import {
  AdminPage,
  CarDetail,
  Home,
  LoginPage,
  PrivateRouteAdmin,
  PrivateRouteLogged,
  RegisterPage,
  Booking,
} from "./routes";


export const App = () => {
  return (
    <>
      <div>
        <DataAPIContextProvider>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<Navigate to="/home" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route element={<PrivateRouteLogged />}>
              <Route element={<Booking />} path="/cars/:id/booking" exact />
            </Route>
            <Route element={<PrivateRouteAdmin />}>
              <Route element={<AdminPage />} path="/admin" exact />
            </Route>
          </Routes>
          <Footer />
        </DataAPIContextProvider>
      </div>
    </>
  );
};
