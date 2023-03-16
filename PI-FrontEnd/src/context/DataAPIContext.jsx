import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { bookingApi } from "../api";
import { DateObject } from "react-multi-date-picker";

const DataAPIContext = createContext();

const DataAPIContextProvider = ({ children }) => {
  //This state contains the result of the query about categories made to the server
  const [categories, setCategories] = useState([]);

  //This state contains the list of Cars filtered by their categories_id
  const [listOfCarsByCategoryId, setListOfCarsByCategoryId] = useState([]);

  // State with screen width measurement
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const [selectedOptionCity, setselectedOptionCity] = useState([]);


  const [randomCars, setrandomCars] = useState([]);

  const getDataCars = useCallback(async () => {
    try {
      const response = await bookingApi.get("/cars/random");
      const data = response.data;
      setrandomCars(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getDataCars();
  }, [getDataCars]);

  //TODO change fetch
  // //Getting category information from the server for rendering in the UI.
  // useEffect(() => {
  //   fetch("http://localhost:8080/categories")
  //     .then((response) => response.json())
  //     .then((data) => setCategories(data))
  //     .catch((error) => console.error(error));
  // }, []);

  useEffect(() => {
    bookingApi
      .get("/categories")
      .then((response) => {
        const data = response.data;
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function listOfCarsWithImages(id) {
    bookingApi.get('/cars/category/' + id)
      .then((response) => {
        const data = response.data;
  
        async function getImagesByCarId(CarId) {
          const response = await bookingApi.get('/images/car/' + CarId);
          return response.data;
        }
  
        async function main() {
          for (const car of data) {
            const listOfCarImages = await getImagesByCarId(car.id);
            car.images = listOfCarImages;
          }
          setListOfCarsByCategoryId(data);
        }
  
        main();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //getting screen width as a side effect
  useEffect(() => {
    function handleResize() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [valueDatepicker, setvalueDatepicker] = useState("", new DateObject());
  const [valueAdaptCalendar, setvalueAdaptCalendar] = useState(
    "",
    new DateObject()
  );


  const [listDispCarsByDates, setlistDispCarsByDates] = useState(undefined);

  const fetchCarByDates = async (checkIn, checkOut) => {
    if (checkIn == undefined || checkOut == undefined) {
      return;
    }
    try {
      const { data } = await bookingApi.get(
        `/cars/dates?checkIn=${checkIn}&checkOut=${checkOut}`
      );
      setlistDispCarsByDates(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [listDispCarsByDatesAndCity, setlistDispCarsByDatesAndCity] =
    useState(undefined);

  const fetchCarByDatesAndCity = async (checkIn, checkOut, id) => {
    if (checkIn == undefined || checkOut == undefined) {
      return;
    }
    try {
      const { data } = await bookingApi.get(
        `/cars/dates/city/${id}?checkIn=${checkIn}&checkOut=${checkOut}`
      );

      setlistDispCarsByDatesAndCity(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [bookingByCar, setbookingByCar] = useState(undefined);

  async function getDataBookings(id) {
    try {
      const response = await bookingApi.get(`/booking/car/${id}`);
      const data = response.data;
      setbookingByCar(data);
    } catch (error) {
      console.error(error);
    }
  }

  const textWithLineBreaksLi = (textToModif) => (
    <>
      {textToModif.split("*").map((text, i) => (
        <React.Fragment key={i}>
          <li key={i}>{text}</li>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <DataAPIContext.Provider
      value={{
        innerWidth,
        categories,
        listOfCarsByCategoryId,
        listOfCarsWithImages,
        setselectedOptionCity,
        selectedOptionCity,
        randomCars,
        setrandomCars,
        setListOfCarsByCategoryId,
        fetchCarByDates,
        valueDatepicker,
        setvalueDatepicker,
        listDispCarsByDates,
        setlistDispCarsByDates,
        fetchCarByDatesAndCity,
        listDispCarsByDatesAndCity,
        setlistDispCarsByDatesAndCity,
        valueAdaptCalendar,
        setvalueAdaptCalendar,
        textWithLineBreaksLi,
        getDataBookings,
        bookingByCar
      }}
    >
      {children}
    </DataAPIContext.Provider>
  );
};

export { DataAPIContext, DataAPIContextProvider };
