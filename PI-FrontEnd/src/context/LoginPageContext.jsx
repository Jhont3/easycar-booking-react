import React, { useState, createContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { bookingApi } from "../api";
import { parseToken } from "../utils";

const LoginPageContext = createContext();

const initialUser = {
  name: "",
  lastName: "",
  email: "",
  rolId: "",
  uid: "",
};

const LoginPageContextprovider = ({ children }) => {
  const navigate = useNavigate();

  const goToLoginPg = () => {
    navigate(`/login`);
  };
  const goToRegisterPg = () => {
    navigate(`/register`);
  };

  const [user, setUser] = useState(initialUser);

  const [activeBtn, setactiveBtn] = useState({
    onLoginPg: false,
    onRegisterPg: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onImgClick = () => {
    setIsModalOpen(true);
  };

  const [dataFormLogin, setdataFormLogin] = useState({});

  const [userLogged, setuserLogged] = useState(false);
  const [adminLogged, setadminLogged] = useState(false);
  const [valCarDetBtnRedd, setvalCarDetBtnRedd] = useState(false)

  function convertInfoToken() {
    let modUser = parseToken(localStorage.getItem("token"));
    setUser({
      ...user,
      name: modUser.name,
      lastName: modUser.lastName,
      email: modUser.sub,
      rolId: modUser.role,
      uid: modUser.id,
    });
    localStorage.setItem("rol", modUser.role);
    localStorage.setItem("uid", modUser.id);
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const { data } = await bookingApi.post("/login", {
        username,
        password,
      });
      localStorage.setItem("token", data);
      localStorage.setItem("token-init-date", new Date().getTime());
      convertInfoToken();
      setuserLogged(true);
      user.rolId == 1 && setadminLogged(true);
      navigate(`/home`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async ({ name, lastName, email, password, city }) => {
    try {
      const { data } = await bookingApi.post("/clients", {
        name,
        lastName,
        email,
        password,
        city,
      });
      localStorage.setItem("token", data);
      localStorage.setItem("token-init-date", new Date().getTime());
      convertInfoToken();
      setuserLogged(true);
      navigate(`/home`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBooking = async ({
    starTime,
    checkIn,
    checkOut,
    cars_id,
    client_id,
    city,
  }) => {
    try {
      const { data } = await bookingApi.post("/booking", {
        starTime,
        checkIn,
        checkOut,
        cars_id,
        client_id,
        city,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCar = async ({
    title,
    description,
    categories_id,
    cities_id,
    featureSet,
    images,
    rentPolicy,
  }) => {
    try {
      const { data } = await bookingApi.post("/cars", {
        title,
        description,
        categories_id,
        cities_id,
        featureSet,
        images,
        rentPolicy,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const convertInfoUser = useCallback(() => {
    localStorage.getItem("token") && convertInfoToken();
  }, []);

  useEffect(() => {
    convertInfoUser();
  }, []);

  return (
    <LoginPageContext.Provider
      value={{
        user,
        activeBtn,
        setactiveBtn,
        goToLoginPg,
        goToRegisterPg,
        isModalOpen,
        onImgClick,
        setIsModalOpen,
        handleLogin,
        setdataFormLogin,
        dataFormLogin,
        setUser,
        handleRegister,
        convertInfoToken,
        handleBooking,
        handleCreateCar,
        userLogged,
        adminLogged,
        valCarDetBtnRedd,
        setvalCarDetBtnRedd,
      }}
    >
      {children}
    </LoginPageContext.Provider>
  );
};

export { LoginPageContext, LoginPageContextprovider };
