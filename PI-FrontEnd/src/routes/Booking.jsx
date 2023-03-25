import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AdaptableCalendar } from "../components/AdaptableCalendar";
import { DataAPIContext, LoginPageContext } from "../context";
import {
  MdArrowBackIosNew,
  MdCheckCircleOutline,
  MdLocationOn,
} from "react-icons/md";
import { Rating } from "@smastrom/react-rating";
import styles from "./modules/booking.module.css";
import { bookingApi } from "../api";

const initialValues = {
  nameUForm: "",
  lastNameUForm: "",
  emailUForm: "",
  cityUForm: "",
};

export const Booking = () => {
  const [formValues, setformValues] = useState(initialValues);
  const { emailUForm, nameUForm, lastNameUForm, cityUForm } = formValues;

  const [detailInfo, setDetailInfo] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDataDetail();
  }, []);

  const { user, setactiveBtn, activeBtn, convertInfoToken, handleBooking } =
    useContext(LoginPageContext);
  const {
    innerWidth,
    valueAdaptCalendar,
    setvalueAdaptCalendar,
    textWithLineBreaksLi,
    getDataBookings,
    bookingByCar,
  } = useContext(DataAPIContext);

  const convertInfoUser = useCallback(() => {
    localStorage.getItem("token") && convertInfoToken();
  }, []);

  useEffect(() => {
    convertInfoUser();
  }, []);

  async function getDataDetail() {
    try {
      const response = await bookingApi.get(`/cars/${id}`);
      const data = response.data;
      setDetailInfo(data);
    } catch (error) {
      console.error(error);
    }
  }

  const onNavigateBack = () => {
    navigate(-1);
  };

  const goToCarIdPg = () => {
    navigate(`/cars/${id}`);
  };

  const handleBookingSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: "The process has been completed successfully.",
      icon: "success",
      confirmButtonText: "continue",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        return goToCarIdPg();
      }
    });
  };

  const handleBookingfailure = () => {
    Swal.fire({
      icon: "error",
      title: "Send failed",
      text: "Something went wrong",
      footer: "Please check info and try again",
    });
  };

  useEffect(() => {
    setactiveBtn({
      ...activeBtn,
      onLoginPg: false,
      onRegisterPg: false,
    });
    createHourArray();
  }, []);

  function onChange(event) {
    const { value, name } = event.target;
    setformValues({ ...formValues, [name]: value });
  }

  function createHourArray() {
    return Array.from(
      { length: 24 },
      (_, i) => `${i + 1 < 11 ? "0" : ""}${i}:00`
    );
  }
  const hourArray = createHourArray();

  const [rating, setRating] = useState(5);

  useEffect(() => {
    {
      user.name == "" && convertInfoToken();
    }
    const { name, lastName, email } = user;
    setformValues({
      ...formValues,
      nameUForm: name,
      lastNameUForm: lastName,
      emailUForm: email,
    });
  }, [user]);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    const selectedOptionText = event.target.selectedOptions[0].textContent;
    setSelectedOption(selectedOptionText);
  };

  const onResetForm = () => {
    setvalueAdaptCalendar("");
  };

  function onSubmit(event) {
    event.preventDefault();

    if (
      selectedOption === "" ||
      valueAdaptCalendar[0] === undefined ||
      valueAdaptCalendar[1] === undefined ||
      formValues?.cityUForm === ""
    ) {
      handleBookingfailure();
      return;
    }

    handleBooking({
      starTime: selectedOption,
      checkIn: valueAdaptCalendar[0]?.format(),
      checkOut: valueAdaptCalendar[1]?.format(),
      cars_id: id,
      client_id: localStorage.getItem("uid"),
      city: formValues?.cityUForm,
    })
      .then((response) => {
        if (!response.client_id) {
          handleBookingfailure();
          return;
        }
        onResetForm();
        handleBookingSuccess();
      })
      .catch((error) => {
        handleBookingfailure();
        console.error(error);
      });
  }

  useEffect(() => {
    id && getDataBookings(id);
  }, []);

  return (
    <>
      <header className={styles.sub_header_1}>
        {detailInfo ? (
          <div>
            <p>{detailInfo.category.title}</p>
            <p>{detailInfo.title}</p>
          </div>
        ) : undefined}
        <button onClick={onNavigateBack}>
          <MdArrowBackIosNew className={styles.back_arrow} />
        </button>
      </header>
      <section className={styles.all_info_form}>
        <article className={styles.first_grid_area}>
          <h3 className={styles.title_booking}>Complete your info</h3>
          <form className={styles.form_booking}>
            <div>
              <label htmlFor="formName">First Name</label>
              <input
                name="nameUForm"
                type="text"
                classID="formName"
                onChange={onChange}
                value={nameUForm}
                autoComplete="off"
                disabled
              />
            </div>
            <div>
              <label htmlFor="formLastName">Last Name</label>
              <input
                name="lastNameUForm"
                type="text"
                classID="formLastName"
                onChange={onChange}
                value={lastNameUForm}
                autoComplete="off"
                disabled
              />
            </div>
            <div>
              <label htmlFor="formEmail">Email</label>
              <input
                name="emailUForm"
                type="email"
                classID="formEmail"
                onChange={onChange}
                value={emailUForm}
                autoComplete="off"
                disabled
              />
            </div>

            <div className={styles.input_city}>
              <label htmlFor="formCity">City</label>
              <input
                id={styles.formCity}
                name="cityUForm"
                type="text"
                classID="formCity"
                onChange={onChange}
                value={cityUForm}
                autoComplete="off"
                required
              />
            </div>
          </form>
        </article>

        <article className={styles.second_grid_area}>
          <h3 className={styles.title_booking}>Select the reservation date</h3>
          <div className={styles.cont_calendar}>
            {innerWidth > 732 && (
              <AdaptableCalendar
                numberOfMonths={2}
                reservations={bookingByCar}
              />
            )}
            {innerWidth < 732 && (
              <AdaptableCalendar
                numberOfMonths={1}
                reservations={bookingByCar}
              />
            )}
          </div>
        </article>

        <div className={styles.third_grid_area}>
          <h3 className={styles.title_booking}>Select your arrival time</h3>
          <form className={styles.form_booking_hour}>
            <p>
              <MdCheckCircleOutline style={{ fontSize: 24, color: "green" }} />
              &nbsp;Your car will be ready for check in at {selectedOption}{" "}
              hours
            </p>
            <label htmlFor="OptionsTime">
              Indicate your estimated arrival time
            </label>
            <select onChange={handleSelectChange} classID="OptionsTime">
              <option key={999}>Select a time</option>
              {hourArray?.map((hour) => (
                <option key={hour}>{hour}</option>
              ))}
            </select>
          </form>
        </div>
        <article className={styles.fourth_grid_area}>
          <div className={styles.cont_confirm_form}>
            <div>
              <h3 className={styles.title_confirm_booking}>
                Reservation detail
              </h3>
              <div className={styles.cont_img_booking}>
                <img src={detailInfo?.images[0].url} alt="selected car" />
              </div>
            </div>
            <div className={styles.info_car_in_form}>
              <div>
                {detailInfo ? (
                  <div className={styles.info_car_selected}>
                    <p>{detailInfo.category.title}</p>
                    <p>{detailInfo.title}</p>
                  </div>
                ) : undefined}
                <div>
                  <Rating
                    style={{ maxWidth: 80 }}
                    value={rating}
                    onChange={setRating}
                    readOnly
                  />
                </div>
              </div>
              <div className={styles.cont_car_location}>
                <MdLocationOn style={{ fontSize: 20 }} />
                {detailInfo ? (
                  <p>
                    {detailInfo.city.name}, {detailInfo.city.department}
                  </p>
                ) : undefined}
              </div>
              <hr />
              <form className={styles.form_booking_conf} onSubmit={onSubmit}>
                <div>
                  <label htmlFor="CheckInForm">Check in</label>
                  <input
                    classID="CheckInForm"
                    type="text"
                    name="CheckIn"
                    placeholder="__/__/____"
                    value={valueAdaptCalendar[0]?.format()}
                    readOnly
                  />
                </div>
                <hr />
                <div>
                  <label htmlFor="CheckOutForm">Check out</label>
                  <input
                    classID="CheckOutForm"
                    type="text"
                    name="CheckOut"
                    placeholder="__/__/____"
                    value={valueAdaptCalendar[1]?.format()}
                    readOnly
                  />
                </div>
                <hr />
                <button className={styles.button_confirm_form}>
                  Confirm booking
                </button>
              </form>
            </div>
          </div>
        </article>
      </section>
      <article className={styles.cont_rent_polity2}>
        <h3 className={styles.rent_tittle}>Rent policy</h3>
        <hr />
        <br />
        <div className={styles.cont_rent_policy}>
          <div>
            <h4>Contract agreement</h4>
            <br />
            <ul>
              {detailInfo?.rentPolicy?.contractAgreement &&
                textWithLineBreaksLi(detailInfo.rentPolicy.contractAgreement)}
            </ul>
          </div>
          <div>
            <h4>Car insurance and security</h4>
            <br />
            <ul>
              {detailInfo &&
                textWithLineBreaksLi(detailInfo.rentPolicy.carInsurance)}
            </ul>
          </div>
          <div>
            <h4>Cancelation politics</h4>
            <br />
            <ul>
              {detailInfo &&
                textWithLineBreaksLi(
                  detailInfo.rentPolicy.cancellationPolitics
                )}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
};
