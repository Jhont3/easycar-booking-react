import { useEffect, useState } from "react";
import styles from "./modules/myBookings.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useParams } from "react-router-dom";
import { bookingApi } from "../api";
import { Card } from "../components";

export const MyBookings = () => {
  const { id } = useParams();
  const [myReservations, setmyReservations] = useState([]);
  const [reservedCars, setreservedCars] = useState(undefined);
  console.log(myReservations, "myreserva");
  console.log(reservedCars, "mycars");

  useEffect(() => {
    bookingApi
      .get("/booking/client/" + id)
      .then((response) => {
        setmyReservations(response.data);
        const arrayCars = response.data.map((element) => {
          return element.car;
        });
        setreservedCars(arrayCars);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onNavigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      <section>
        <header className={styles.sub_header_1}>
          <div>
            <p>{myReservations[0]?.client?.role?.name}</p>
            <p>
              {myReservations[0]?.client?.name}&nbsp;
              {myReservations[0]?.client?.lastName}
            </p>
          </div>
          <button onClick={onNavigateBack}>
            <MdArrowBackIosNew className={styles.back_arrow} />
          </button>
        </header>
        <h2 className={styles.reservation_subtitle}>My reservations:</h2>
        <div className={styles.cont_reserved_cars}>
          {reservedCars?.map((car) => (
            <>
              <div className={styles.each_reservation}>
                <div>
                  <span className={styles.subtitle_secundary}>
                    Reservation:
                  </span>
                  <button className={styles.add_button}>X</button>
                  &nbsp;
                  <button className={styles.add_button}>i</button>
                </div>
                <Card car={car} key={car.id} />
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
};
