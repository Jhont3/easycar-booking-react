import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./modules/myBookings.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { bookingApi } from "../api";
import { Card } from "../components";
import Swal from "sweetalert2";
import { AstronautLoading } from "../components/AstronautLoading";
import { DataAPIContext } from "../context";

export const MyBookings = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getResevByClient, myReservations } = useContext(DataAPIContext);

  useEffect(() => {
    getResevByClient(id);
  }, []);

  const [copyMyReservations, setcopyMyReservations] = useState([]);
  console.log(copyMyReservations, "copy reservations");

  useEffect(() => {
    setcopyMyReservations(myReservations);
  }, [myReservations]);

  const onNavigateBack = () => {
    navigate(-1);
  };

  const handleDeleteBooking = async (idReserve) => {
    try {
      await bookingApi.delete("/booking/" + idReserve);
    } catch (error) {
      console.error(error);
    }
  };

  const delCarOfView = (e) => {
    e.preventDefault();
    setcopyMyReservations(
      copyMyReservations.filter(({ checkIn }) => checkIn !== e.target.value)
    );
  };

  const onDelete = (e) => {
    e.preventDefault();
    localStorage.setItem("selectedBooking", e.target.id);
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
        handleDeleteBooking(e.target.id);
        delCarOfView(e)
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
          {copyMyReservations?.length > 0 ? (
            copyMyReservations?.map((reservation, i) => {
              return (
                <>
                  <div className={styles.each_reservation}>
                    <div>
                      <span className={styles.subtitle_secundary}>
                        Reservation {i + 1}:
                      </span>
                      <button
                        className={styles.delete_button}
                        value={reservation?.checkIn}
                        onClick={(e) => onDelete(e)}
                        id={reservation?.id}
                      >
                        X
                      </button>
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
                <p>Too many space... Checking info...</p>
                <AstronautLoading />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};
