import React, { useState, useEffect, useContext } from "react";
import styles from "./modules/hero.module.css";
import { DataAPIContext } from "../context/DataAPIContext";
import { AdaptableDatePicker } from "./AdaptableDatePicker";
import { IoSearchCircle } from "react-icons/io5";
import { BiMap } from "react-icons/bi";
import { bookingApi } from "../api";

export const Hero = () => {
  const [city, setCity] = useState("");
  const [cityIsEmpty, setcityIsEmpty] = useState(false);
  const [dateIsEmpty, setdateIsEmpty] = useState(false);

  const {
    innerWidth,
    setselectedOptionCity,
    fetchCarByDates,
    valueDatepicker,
    fetchCarByDatesAndCity,
  } = useContext(DataAPIContext);

  function onSubmitForm(e) {
    e.preventDefault();

    let citySel = citiesFetch.findIndex((x) => x.name === city);

    if (valueDatepicker !== "" && city !== "Choose a city" && city !== "") {
      fetchCarByDatesAndCity(valueDatepicker[0], valueDatepicker[1], citySel);
      setcityIsEmpty(false);
      setdateIsEmpty(false);
      return;
    }

    if (valueDatepicker !== "" && (city === "" || city === "Choose a city")) {
      fetchCarByDates(valueDatepicker[0], valueDatepicker[1]);
      setcityIsEmpty(false);
      setdateIsEmpty(false);
      return;
    }

    if (city !== "Choose a city" && city !== "" && valueDatepicker === "") {
      getDataCarsByCity(citySel);
      setcityIsEmpty(false);
      setdateIsEmpty(false);
      return;
    }

    if (city === "" || city === "Choose a city") {
      setcityIsEmpty(true);
    }

    valueDatepicker === "" && setdateIsEmpty(true);

  }

  const [citiesFetch, setcitiesFetch] = useState(undefined);


  async function getDataCities() {
    try {
      const response = await bookingApi.get('/cities');
      const data = response.data;
      setcitiesFetch([{ name: "Choose a city", id: 999 }, ...data]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDataCities();
  }, []);


  async function getDataCarsByCity(citySel) {
    try {
      const response = await bookingApi.get(`cars/city/${citySel}`);
      const data = response.data;
      setselectedOptionCity(data);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <section className={styles.hero__container}>
      <div className={styles.hero__info}>
        <h1 className={styles.hero__title}>Find a car for your needs</h1>
        <p className={styles.hero__text}>in the best car rental in Colombia</p>
      </div>

      <form action="" className={styles.hero__form} onSubmit={onSubmitForm}>
        <div className={styles.city__selector__container}>
          <label htmlFor="cities" style={{ fontWeight: "bold", fontSize: 16 }}>
            <BiMap style={{ fontSize: "2rem" }} />
            &nbsp;Where
          </label>
          <select
            name="cities"
            id="cities"
            onChange={(e) => setCity(e.target.value)}
          >
            {citiesFetch
              ? citiesFetch.map((city) => (
                  <option value={city?.name} key={city?.id} id={city?.id}>
                    {city?.name}
                  </option>
                ))
              : undefined}
          </select>
          {cityIsEmpty && <small className={styles.error}>Choose a city</small>}
        </div>
        <div>
          {innerWidth > 732 && <AdaptableDatePicker numberOfMonths={2} />}
          {innerWidth < 732 && <AdaptableDatePicker numberOfMonths={1} />}
          {dateIsEmpty && (
            <small className={styles.error}>Choose a date range</small>
          )}
        </div>

        <button className={styles.btn}>
          {innerWidth > 732 ? (
            <IoSearchCircle className={styles.search_icon} />
          ) : (
            "Search a Car"
          )}
        </button>
      </form>
    </section>
  );
};
