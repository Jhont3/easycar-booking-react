import { useContext, useEffect, useState } from "react";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";
import { DateObject } from "react-multi-date-picker";
import { DataAPIContext } from "../context";
import { rangeDateToDates } from "../utils";
import Swal from "sweetalert2";

export const AdaptableCalendar = ({
  numberOfMonths,
  readOnly,
  rangeHover,
  reservations,
}) => {
  const { valueAdaptCalendar, setvalueAdaptCalendar } =
    useContext(DataAPIContext);

  const currentDate = new Date();

  const [totalReservations, settotalReservations] = useState(undefined);

  const convRangeDateBookings = () => {
    const allReservations = [];
    reservations?.forEach((dateRange) => {
      allReservations.push(
        ...rangeDateToDates(dateRange.checkIn, dateRange.checkOut)
      );
    });
    settotalReservations(allReservations);
  };

  const infoBooking = () => {
    Swal.fire({
      title: "<strong>Information</strong>",
      icon: "info",
      text: "This date is already reserved",
      confirmButtonText: "In another ocasion!!",
      allowOutsideClick: false,
    });
  };

  useEffect(() => {
    convRangeDateBookings();
  }, [reservations]);

  const isDateIncluded = (date) => {
    for (let i = 0; i < totalReservations.length; i++) {
      let reservationDate = new Date(`${totalReservations[i]}T00:00:00Z`);
      const dateOnly = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const reservationOnly = new Date(
        reservationDate.getUTCFullYear(),
        reservationDate.getUTCMonth(),
        reservationDate.getUTCDate()
      );

      if (dateOnly.getTime() === reservationOnly.getTime()) {
        return true;
      }
    }
    return false;
  };

  return (
    <Calendar
      range
      rangeHover={rangeHover}
      numberOfMonths={numberOfMonths}
      minDate={currentDate}
      maxDate={new DateObject().add(60, "days")}
      value={valueAdaptCalendar}
      onChange={setvalueAdaptCalendar}
      className="red"
      format="YYYY-MM-DD"
      mapDays={({ date }) => {
        const dateToCompare = new Date(
          `${date.year}-${date.month}-${date.day}`
        );
        if (isDateIncluded(dateToCompare))
          return {
            disabled: true,
            style: { color: "#ccc" },
            onClick: () => infoBooking(),
          };
      }}
      readOnly={readOnly}
      disabled={false}
    />
  );
};
