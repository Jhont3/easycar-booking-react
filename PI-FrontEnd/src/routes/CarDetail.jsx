import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginPageContext, DataAPIContext } from "../context";
import { Carousel } from "react-carousel-minimal";
import { MdArrowBackIosNew, MdLocationOn } from "react-icons/md";
import { FiShare2, FiHeart } from "react-icons/fi";
import styles from "./modules/carDetail.module.css";
import {
  CarRating,
  ImagesCarSimple,
  ImagesCarGrid,
  AdaptableCalendar,
} from "../components";
import Modal from "react-modal";
import { bookingApi } from "../api";

export function CarDetail() {
  const [detailInfo, setDetailInfo] = useState(undefined);

  const { setactiveBtn, activeBtn, isModalOpen, setIsModalOpen, setvalCarDetBtnRedd } =
    useContext(LoginPageContext);
  const { innerWidth, textWithLineBreaksLi, getDataBookings, bookingByCar } =
    useContext(DataAPIContext);


  const [arrImgsAltered, setarrImgsAlter] = useState([]);

  useEffect(() => {
    detailInfo?.images &&
      setarrImgsAlter(
        detailInfo.images.map((item) => {
          return { image: item.url };
        })
      );
  }, [detailInfo]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  function onCloseModal() {
    setIsModalOpen(false);
  }

  const captionStyle = {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#161a1d",
  };

  const slideNumberStyle = {
    fontSize: "0.1rem",
    color: "#161a1d",
  };

  useEffect(() => {
    setactiveBtn({
      ...activeBtn,
      onLoginPg: false,
      onRegisterPg: false,
    });
  }, []);

  const params = useParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  function valWithoutToken() {
    setvalCarDetBtnRedd(true)
    navigate(`/login`)
  }

  const goToBooking = () => {
    localStorage.getItem("token")
      ? navigate(`/cars/${id}/booking`)
      : valWithoutToken();
  };

  async function getDataDetail() {
    try {
      const response = await bookingApi.get(`/cars/${id}`);
      const data = response.data;
      setDetailInfo(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    params?.id && getDataDetail();
  }, [params]);

  useEffect(() => {
    id && getDataBookings(id);
  }, []);

  const textWithLineBreaks = (textToModif) => (
    <>
      {textToModif.split("*").map((text, i) => (
        <React.Fragment key={i}>
          <p key={i}>{text}</p>
          <br />
        </React.Fragment>
      ))}
    </>
  );

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

      <article className={styles.sub_header2}>
        <div>
          <div style={{ width: 30 }}>
            <MdLocationOn style={{ fontSize: 20 }} />
          </div>
          {detailInfo ? (
            <p>
              {detailInfo.city.name}, {detailInfo.city.department}
            </p>
          ) : undefined}
        </div>
        <div>
          <CarRating />
        </div>
      </article>
      <div className={styles.cont_icons_grid_imgs}>
        <span className={styles.icons_grid}>
          <FiShare2 style={{ fontSize: "2.4rem", color: "#bcf" }} /> &nbsp;
          <FiHeart style={{ fontSize: "2.4rem", color: "#bcf" }} />
        </span>
        <section
          className={
            detailInfo && innerWidth > 768
              ? styles.grid_images
              : styles.grid_images_phone
          }
        >
          {detailInfo && innerWidth > 768
            ? detailInfo.images
                .slice(0, 5)
                .map((eachOne) => (
                  <ImagesCarGrid key={eachOne.id} eachOne={eachOne} />
                ))
            : undefined}
          {detailInfo && innerWidth <= 768 ? (
            <ImagesCarSimple images={detailInfo.images} />
          ) : undefined}
        </section>
      </div>
      <div className={styles.cont_car_review}>
        <h3>Review</h3>
        <br />
        <div>
          {detailInfo ? textWithLineBreaks(detailInfo.description) : undefined}
        </div>
        <br />
      </div>
      <div className={styles.car_subtitle}>
        <h3>Car Features</h3>
        <hr />
        <br />
      </div>
      <div className={styles.cont_car_features}>
        <ol>
          {detailInfo?.featuresSet?.map((feature) => (
            <>
              <li key={feature.id}>
                <span>
                  <img src={feature?.icon} alt="icon" style={{ width: 20 }} />
                </span>
                &nbsp;
                {feature?.name}
              </li>
              <br />
            </>
          ))}
        </ol>
      </div>

      <div className={styles.cont_calendars}>
        <h3 className={styles.dates_subtitle}>Available dates</h3>
        <div className={styles.cont_regist_calends}>
          <div className={styles.calendars}>
            {innerWidth > 760 && (
              <AdaptableCalendar
                numberOfMonths={2}
                readOnly={true}
                rangeHover={false}
                reservations={bookingByCar}
              />
            )}
            {innerWidth < 760 && (
              <AdaptableCalendar
                numberOfMonths={1}
                readOnly={true}
                rangeHover={false}
                reservations={bookingByCar}
              />
            )}
          </div>
          <div className={styles.cont_reserve_calendar}>
            <p>Choose an available date to rent the best cars!!!</p>
            <button onClick={goToBooking}>Start booking</button>
          </div>
        </div>
      </div>

      <div>
        <h3 className={styles.rent_tittle}>Rent policy</h3>
        <hr />
        <br />
        <div className={styles.cont_rent_policy}>
          <div>
            <h4>Contract agreement</h4>
            <br />
            <ul>
              {detailInfo &&
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
      </div>
      <div>
        {detailInfo ? (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
          >
            <Carousel
              data={arrImgsAltered}
              time={3000}
              width="80vw"
              height="60vh"
              captionStyle={captionStyle}
              radius="1rem"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="4rem"
              slideBackgroundColor="white"
              slideImageFit="contain"
              thumbnails={true}
              thumbnailWidth="15%"
            />
          </Modal>
        ) : undefined}
      </div>
    </>
  );
}
