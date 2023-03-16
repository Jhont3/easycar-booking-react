import styles from "./modules/home.module.css";
import { Recomendations, Categories, Hero } from "../components/";
import { useEffect, useContext } from "react";
import { LoginPageContext } from "../context/LoginPageContext";
import { DataAPIContext } from "../context/DataAPIContext";

export const Home = () => {
  const { setactiveBtn, activeBtn } =
    useContext(LoginPageContext);
  const { listOfCarsByCategoryId, selectedOptionCity, randomCars, listDispCarsByDates, listDispCarsByDatesAndCity } =
    useContext(DataAPIContext);

  useEffect(() => {
    setactiveBtn({
      ...activeBtn,
      onLoginPg: false,
      onRegisterPg: false,
    });
  }, []);

  return (
    <>
      <Hero />
      <Categories />
      <Recomendations
        listOfCarsByCategoryId={listOfCarsByCategoryId}
        selectedOptionCity={selectedOptionCity}
        randomCars={randomCars}
        listDispCarsByDates={listDispCarsByDates}
        listDispCarsByDatesAndCity={listDispCarsByDatesAndCity}
      />
    </>
  );
};
