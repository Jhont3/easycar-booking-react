import React, { useContext, useEffect, useState } from "react";
import styles from "./modules/adminPage.module.css";
import { MdArrowBackIosNew } from "react-icons/md";
import Swal from "sweetalert2";
import { LoginPageContext } from "../context";
import { bookingApi } from "../api";

const initialValues = {
  cName: "",
  cDescription: "",
  cCategory: "",
  cCity: "",
  cFeatures: [],
  cImages: [],
  cPoliciesId: "",
};

export const AdminPage = () => {

  const { handleCreateCar } = useContext(LoginPageContext);

  const [arrFeatures, setarrFeatures] = useState([]);
  const [arrImages, setarrImages] = useState([]);

  const [formValues, setformValues] = useState(initialValues);
  const {
    cName,
    cDescription,
    cCategory,
    cCity,
    cFeatures,
    cImages,
    cPoliciesId,
    // cRules,
    // cSecurity,
    // cPolicy,
  } = formValues;


  function onChange(event) {
    const { value, name } = event.target;
    setformValues({ ...formValues, [name]: value });
  }

  //Object pre add FormValues
  const [infoInpToAdd, setinfoInpToAdd] = useState({
    cImagesToAdd: "",
    cTitleImg: "",
    cFeaturesToAdd: "",
  });

  const { cImagesToAdd, cFeaturesToAdd, cTitleImg } = infoInpToAdd;

  function onChangePreList(e) {
    const { value, name } = e.target;
    setinfoInpToAdd({ ...infoInpToAdd, [name]: value });
  }

  const onNavigateBack = () => {
    navigate(-1);
  };

  const handleBookingSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: "The process has been completed successfully.",
      icon: "success",
      confirmButtonText: "continue",
      allowOutsideClick: false,
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

  const [categoriesCars, setcategoriesCars] = useState(undefined);
  const [citiesCars, setcitiesCars] = useState(undefined);
  const [featuresCars, setfeaturesCars] = useState(undefined);
  const [rentPolicies, setrentPolicies] = useState(undefined);

  useEffect(() => {
    bookingApi
      .get("/categories")
      .then((response) => {
        setcategoriesCars([
          { title: "Choose a category", id: 9999 },
          ...response.data,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    bookingApi
      .get("/cities")
      .then((response) => {
        setcitiesCars([{ name: "Choose a city", id: 9999 }, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });

    bookingApi
      .get("/features")
      .then((response) => {
        setfeaturesCars([
          { name: "Choose a feature", id: 9999 },
          ...response.data,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });

    bookingApi
      .get("/rentPolicies")
      .then((response) => {
        setrentPolicies([
          { id: "Select group policies id" },
          ...response.data,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchFeatByName = (name) =>
    featuresCars.find((feature) => feature.name === name);

  function nameInArray(namesArray, nameToCheck) {
    return namesArray.some((element) => element.name === nameToCheck);
  }

  function urlInArray(namesArray, nameToCheck) {
    return namesArray.some((element) => element.url === nameToCheck);
  }

  const addFeatToForm = (e) => {
    e.preventDefault();

    if (cFeaturesToAdd === "") {
      handleBookingfailure();
      return;
    }

    if (nameInArray(arrFeatures, cFeaturesToAdd)) return;

    formValues.cFeatures = [...cFeatures, searchFeatByName(cFeaturesToAdd)];
    setarrFeatures([...arrFeatures, searchFeatByName(cFeaturesToAdd)]);
  };

  const delFeatToForm = (e) => {
    e.preventDefault();
    setarrFeatures(arrFeatures.filter(({ name }) => name !== e.target.value));
  };

  const addImgToForm = (e) => {
    e.preventDefault();

    if (cTitleImg == "" || cImagesToAdd == "") {
      handleBookingfailure();
      return;
    }

    if (urlInArray(arrImages, cImagesToAdd)) return;

    const newImage = {
      title: cTitleImg,
      url: cImagesToAdd,
    };

    setarrImages([...arrImages, newImage]);
    formValues.cImages = [...arrImages, newImage];
    return;
  };

  const delImgToForm = (e) => {
    e.preventDefault();
    setarrImages(arrImages.filter(({ title }) => title !== e.target.value));
  };

  function onSubmit(event) {
    event.preventDefault();

    if (
      cName === "" ||
      cDescription === "" ||
      cCategory === "" ||
      cCity === "" ||
      cPoliciesId === ""
    ) {
      handleBookingfailure();
      return;
    }

    let citySel = citiesCars.findIndex((x) => x.name === cCity);
    let categorySel = categoriesCars.findIndex((x) => x.title === cCategory);

    handleCreateCar({
      title: cName,
      description: cDescription,
      categories_id: categorySel,
      cities_id: citySel,
      featureSet: cFeatures,
      images: cImages,
      rentPolicy: cPoliciesId,
    })
      .then((response) => {
        if (!response.title) {
          handleBookingfailure();
          return;
        }
        handleBookingSuccess();
      })
      .catch((error) => {
        handleBookingfailure();
        console.error(error);
      });

    onResetForm();
  }

  return (
    <>
      <header className={styles.sub_header_1}>
        <p>Administration</p>
        <button onClick={onNavigateBack}>
          <MdArrowBackIosNew className={styles.back_arrow} />
        </button>
      </header>

      <section>
        <h2 className={styles.subtitle_create}>Create Car</h2>
        <form onSubmit={onSubmit}>
          <article className={styles.form_first_container}>
            <div className={styles.first_second_block_form}>
              <div>
                <label htmlFor="formName">Car Name</label>
                <input
                  name="cName"
                  type="text"
                  value={cName}
                  onChange={onChange}
                  classID="formName"
                  placeholder="Introduce name"
                />
              </div>
              <div>
                <label htmlFor="formCategory">Category </label>
                <select
                  classID="formCategory"
                  name="cCategory"
                  value={cCategory}
                  onChange={onChange}
                >
                  {categoriesCars?.length > 0
                    ? categoriesCars.map((categ) => (
                        <option
                          value={categ?.title}
                          key={categ?.id}
                          id={categ?.id}
                        >
                          {categ?.title}
                        </option>
                      ))
                    : undefined}
                </select>
              </div>
            </div>

            <div className={styles.first_second_block_form}>
              <div>
                <label htmlFor="formCity">City </label>
                <select
                  classID="formCity"
                  name="cCity"
                  value={cCity}
                  onChange={onChange}
                >
                  {citiesCars?.length > 0
                    ? citiesCars.map((city) => (
                        <option value={city?.name} key={city?.id} id={city?.id}>
                          {city?.name}
                        </option>
                      ))
                    : undefined}
                </select>
              </div>
            </div>
            <div className={styles.textarea_description}>
              <label htmlFor="formDescription">Description </label>
              <textarea
                name="cDescription"
                placeholder="Write here"
                classID="formDescription"
                onChange={onChange}
                value={cDescription}
              ></textarea>
            </div>
          </article>

          <h3 className={styles.subtitle_secundary}>Add Attributes</h3>
          <div className={styles.cont_form_atributes}>
            <div className={styles.first_block_form_atributes}>
              <div>
                <label htmlFor="formNameAtrib">Name </label>
                <select
                  classID="formNameAtrib"
                  name="cFeaturesToAdd"
                  value={cFeaturesToAdd}
                  onChange={onChangePreList}
                >
                  {featuresCars?.length > 0
                    ? featuresCars.map((feat) => (
                        <option value={feat?.name} key={feat?.id} id={feat?.id}>
                          {feat?.name}
                        </option>
                      ))
                    : undefined}
                </select>
              </div>
              <div>
                <label htmlFor="formIconAtrib">Icon </label>
                <input
                  type="text"
                  value=""
                  classID="formIconAtrib"
                  placeholder="Select and add a name"
                  disabled
                />
              </div>
            </div>

            <div className={styles.cont_add_button}>
              <button
                className={styles.add_button}
                onClick={(e) => addFeatToForm(e)}
              >
                +
              </button>
            </div>
          </div>

          {arrFeatures.map((feat) => (
            <div key={feat.id}>
              <br />
              <div className={styles.cont_form_atributes}>
                <div className={styles.first_block_form_atributes}>
                  <div>
                    <label htmlFor="formNameAtrib">Name </label>
                    <select
                      classID="formNameAtrib"
                      name="cFeaturesToAdd"
                      value={cFeaturesToAdd}
                      disabled
                    >
                      <option value={feat?.name} key={feat?.id}>
                        {feat?.name}
                      </option>
                      ))
                    </select>
                  </div>
                  <div>
                    <label htmlFor="formIconAtrib">Icon </label>
                    <input
                      type="text"
                      value={feat?.icon}
                      classID="formIconAtrib"
                      placeholder="Select and add a name"
                      disabled
                    />
                  </div>
                </div>

                <div className={styles.cont_add_button}>
                  <div>
                    <img
                      src={feat?.icon}
                      style={{ width: 30, marginRight: 14 }}
                    />
                  </div>
                  <button
                    className={styles.add_button}
                    onClick={(e) => delFeatToForm(e)}
                    value={feat?.name}
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
          ))}

          <h3 className={styles.subtitle_secundary}>Product Policies</h3>
          <div className={styles.cont_car_policies}>
            <div className={styles.cont_car_policies_id}>
              <label htmlFor="formPolId">Policies id: </label>
              <select
                value={cPoliciesId}
                name="cPoliciesId"
                classID="formPolId"
                onChange={onChange}
              >
                {rentPolicies?.length > 0
                  ? rentPolicies.map((policy) => (
                      <option value={policy?.id} key={policy?.id}>
                        {policy?.id}
                      </option>
                    ))
                  : undefined}
              </select>
            </div>
            {/* aca va {} policies */}
            <div>
              <label htmlFor="formPolRules">Car rules </label>
              <textarea
                placeholder="Select policies id"
                value=""
                onChange={onChange}
                classID="formIconAtrib"
                disabled
              ></textarea>
            </div>
            <div>
              <label htmlFor="formPolSecurity" classID="formIconAtrib">
                Health and security
              </label>
              <textarea
                placeholder="Select policies id"
                value=""
                onChange={onChange}
                classID="formPolSecurity"
                disabled
              ></textarea>
            </div>
            <div>
              <label htmlFor="formPolCancellation">Cancellation policies</label>
              <textarea
                placeholder="Select policies id"
                value=""
                onChange={onChange}
                classID="formPolCancellation"
                disabled
              ></textarea>
            </div>
          </div>

          <h3 className={styles.subtitle_secundary}>Upload Images</h3>
          <div className={styles.cont_upl_imgs}>
            <div>
              <input
                name="cImagesToAdd"
                value={cImagesToAdd}
                type="text"
                classID="formImages"
                placeholder="Insert url image"
                onChange={onChangePreList}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Insert title"
                name="cTitleImg"
                value={cTitleImg}
                onChange={onChangePreList}
              />
            </div>
            <div className={styles.cont_add_button}>
              <button
                className={styles.add_button}
                onClick={(e) => addImgToForm(e)}
              >
                +
              </button>
            </div>
          </div>
          {arrImages?.map((imgObj, i) => (
            <div key={i}>
              <br />

              <div className={styles.cont_upl_imgs}>
                <div>
                  <input value={imgObj?.url} type="text" disabled />
                </div>
                <div>
                  <input type="text" value={imgObj?.title} disabled />
                </div>
                <div className={styles.cont_add_button}>
                  <button
                    className={styles.add_button}
                    value={imgObj?.title}
                    onClick={(e) => delImgToForm(e)}
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.cont_button_submit}>
            <button
              className={styles.buttonSubmit}
              style={{ marginBottom: 70 }}
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
