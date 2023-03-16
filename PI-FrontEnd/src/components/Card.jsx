import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../components/modules/card.module.css";
import { DataAPIContext } from "../context";

export function Card({
  selectedOptionCity,
  car,
  itemRand,
  selectedCarDisp,
  selectedCarDispByCity,
}) {
  const [oneCarByCity, setOneCarByCity] = useState(undefined);

  const {
    setListOfCarsByCategoryId,
    setrandomCars,
    setselectedOptionCity,
    setlistDispCarsByDates,
    setlistDispCarsByDatesAndCity
  } = useContext(DataAPIContext);

  useEffect(() => {
    oneCarByCity && setrandomCars(undefined);
    oneCarByCity && setListOfCarsByCategoryId(undefined);
    oneCarByCity && setlistDispCarsByDates(undefined);
    oneCarByCity && setlistDispCarsByDatesAndCity(undefined);
  }, [oneCarByCity]);

  useEffect(() => {
    car && setselectedOptionCity(undefined);
    car && setrandomCars(undefined);
    car && setlistDispCarsByDates(undefined);
    car && setlistDispCarsByDatesAndCity(undefined);
  }, [car]);

  useEffect(() => {
    selectedOptionCity?.title && setOneCarByCity(selectedOptionCity);
  }, [selectedOptionCity]);

  useEffect(() => {
    selectedCarDisp && setrandomCars(undefined);
    selectedCarDisp && setListOfCarsByCategoryId(undefined);
    selectedCarDisp && setselectedOptionCity(undefined);
    selectedCarDisp && setlistDispCarsByDatesAndCity(undefined);
  }, [selectedCarDisp]);

  useEffect(() => {
    selectedCarDispByCity && setrandomCars(undefined);
    selectedCarDispByCity && setListOfCarsByCategoryId(undefined);
    selectedCarDispByCity && setselectedOptionCity(undefined);
    selectedCarDispByCity && setlistDispCarsByDates(undefined);
  }, [selectedCarDispByCity]);

  const textWithLineBreaks = (textToModif) => (
    <>
      {textToModif.split("*").map((text, i) => (
        <React.Fragment key={i}>
          <span>{text}</span>
          <br />
        </React.Fragment>
      ))}
    </>
  );

  return (
    <>
      {itemRand ? (
        <article className={styles.card}>
          <div className={styles.img_container}>
            <img src={itemRand.images[0]?.url} alt="Not Found" />
          </div>
          <div className={styles.card_info}>
            <h1 className={styles.h1}>{itemRand?.title}</h1>
            <span className={styles.category}>{itemRand?.category.title}</span>
            <h3 className={styles.h3}>{itemRand.city.name}</h3>
            <p className={styles.p}>
              {itemRand
                ? textWithLineBreaks(
                    itemRand.description.substring(
                      0,
                      itemRand.description.indexOf(".")
                    )
                  )
                : undefined}
            </p>
            <Link to={`/cars/${itemRand.id}`} className={styles.a}>
              Details
            </Link>
          </div>
        </article>
      ) : undefined}

      {oneCarByCity ? (
        <article className={styles.card}>
          <div className={styles.img_container}>
            <img src={oneCarByCity.images[0].url} alt="Not Found" />
          </div>
          <div className={styles.card_info}>
            <h1 className={styles.h1}>{oneCarByCity?.title}</h1>
            <span className={styles.category}>
              {oneCarByCity?.category.title}
            </span>
            <h3 className={styles.h3}>{oneCarByCity.city.name}</h3>
            <p className={styles.p}>
              {oneCarByCity
                ? textWithLineBreaks(
                    oneCarByCity.description.substring(
                      0,
                      oneCarByCity.description.indexOf(".")
                    )
                  )
                : undefined}
            </p>
            <Link to={`/cars/${oneCarByCity.id}`} className={styles.a}>
              Details
            </Link>
          </div>
        </article>
      ) : undefined}

      {selectedCarDisp ? (
        <article className={styles.card}>
          <div className={styles.img_container}>
            <img src={selectedCarDisp?.images[0].url} alt="Not Found" />
          </div>
          <div className={styles.card_info}>
            <h1 className={styles.h1}>{selectedCarDisp?.title}</h1>
            <span className={styles.category}>
              {selectedCarDisp?.category.title}
            </span>
            <h3 className={styles.h3}>{selectedCarDisp.city.name}</h3>
            <p className={styles.p}>
              {selectedCarDisp
                ? textWithLineBreaks(
                    selectedCarDisp?.description.substring(
                      0,
                      selectedCarDisp?.description.indexOf(".")
                    )
                  )
                : undefined}
            </p>
            <Link to={`/cars/${selectedCarDisp.id}`} className={styles.a}>
              Details
            </Link>
          </div>
        </article>
      ) : undefined}

      {selectedCarDispByCity ? (
        <article className={styles.card}>
          <div className={styles.img_container}>
            <img src={selectedCarDispByCity?.images[0].url} alt="Not Found" />
          </div>
          <div className={styles.card_info}>
            <h1 className={styles.h1}>{selectedCarDispByCity?.title}</h1>
            <span className={styles.category}>
              {selectedCarDispByCity?.category.title}
            </span>
            <h3 className={styles.h3}>{selectedCarDispByCity.city.name}</h3>
            <p className={styles.p}>
              {selectedCarDispByCity
                ? textWithLineBreaks(
                    selectedCarDispByCity?.description.substring(
                      0,
                      selectedCarDispByCity?.description.indexOf(".")
                    )
                  )
                : undefined}
            </p>
            <Link to={`/cars/${selectedCarDispByCity.id}`} className={styles.a}>
              Details
            </Link>
          </div>
        </article>
      ) : undefined}

      {car ? (
        <article className={styles.card}>
          <div className={styles.img_container}>
            <img src={car.images[0].url} alt="Not Found" />
          </div>
          <div className={styles.card_info}>
            <h1 className={styles.h1}>{car?.title}</h1>
            <span className={styles.category}>{car?.category.title}</span>
            <h3 className={styles.h3}>{car.city.name}</h3>
            <p className={styles.p}>
              {car
                ? textWithLineBreaks(
                    car.description.substring(0, car.description.indexOf("."))
                  )
                : undefined}
            </p>
            <Link to={`/cars/${car.id}`} className={styles.a}>
              Details
            </Link>
          </div>
        </article>
      ) : undefined}
    </>
  );
}
