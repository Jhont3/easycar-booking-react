import { useContext } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import opacity from "react-element-popper/animations/opacity";
import { BsCalendarDate } from "react-icons/bs";
import "react-multi-date-picker/styles/colors/red.css";
import { DataAPIContext } from "../context/DataAPIContext";
import { BiReset } from "react-icons/bi";

export const AdaptableDatePicker = ({ numberOfMonths }) => {
  const { valueDatepicker, setvalueDatepicker } = useContext(DataAPIContext);

  return (
    <div>
      <h2 style={{ marginBottom: 4 }}>
        <BsCalendarDate style={{ fontSize: "2rem" }} />
        &nbsp; Check in - Check out &nbsp;
        <BiReset onClick={() => setvalueDatepicker('')}/>
      </h2>
      <DatePicker
        range
        numberOfMonths={numberOfMonths}
        minDate={new Date()}
        value={valueDatepicker}
        onChange={setvalueDatepicker}
        format="YYYY-MM-DD"
        className="red"
        maxDate={new DateObject().add(90, "days")}
        placeholder="Choose a date range"
        animations={[opacity({ from: 0.2, to: 1, duration: 1000 })]}
      />
    </div>
  );
};
