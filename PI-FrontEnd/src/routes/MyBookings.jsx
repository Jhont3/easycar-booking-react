import { useEffect, useState } from "react";
import styles from "./modules/myBookings.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useParams } from "react-router-dom";
import { bookingApi } from "../api";
import { Card } from "../components";
import Swal from "sweetalert2";
import { AstronautLoading } from "../components/AstronautLoading";

export const MyBookings = () => {
  const { id } = useParams();
  const [myReservations, setmyReservations] = useState([]);
  console.log(myReservations, "myreserva");

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

  const handleDeleteBooking = async (id) => {
    try {
      await bookingApi.delete("/booking/" + id);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteBooking();
        Swal.fire("Deleted!", "Your booking has been deleted.", "success");
      }
    });
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
        {myReservations?.length > 0 ? (
          <h2 className={styles.reservation_subtitle}>My reservations:</h2>
        ) : undefined}
        <div className={styles.cont_reserved_cars}>
          {myReservations?.length > 0 ? (
            myReservations?.map((reservation) => {
              return (
                <>
                  <div className={styles.each_reservation}>
                    <div>
                      <span className={styles.subtitle_secundary}>
                        Reservation {reservation.id}:
                      </span>
                      <button className={styles.delete_button}>X</button>
                      &nbsp;
                      <button className={styles.info_button}>i</button>
                      <div className={styles.range_date_text}>
                        Date range: {reservation.checkIn} -{" "}
                        {reservation.checkOut}
                      </div>
                    </div>
                    <Card car={reservation.car} key={reservation.car.id} />
                  </div>
                </>
              );
            })
          ) : (
            <>
              <div className={styles.cont_checking}>
                <p >Too many space... No bookings yet...</p> 
                <AstronautLoading />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};
