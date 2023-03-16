import styles from "./modules/registerPage.module.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginPageContext } from "../context/LoginPageContext";

const initialValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  repeatedpass: "",
  city: "",
};

export const RegisterPage = () => {
  const [formValues, setformValues] = useState(initialValues);
  const [showErrorName, setShowErrorName] = useState(false);
  const [showErrorLastname, setShowErrorLastname] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showErrorRepeatedpass, setShowErrorRepeatedpass] = useState(false);

  const { name, lastName, email, password, repeatedpass, city } = formValues;

  const { setactiveBtn, activeBtn, handleRegister } =
    useContext(LoginPageContext);

  useEffect(() => {
    setactiveBtn({
      ...activeBtn,
      onRegisterPg: true,
      onLoginPg: false,
    });
  }, []);

  function onChange(event) {
    const { value, name } = event.target;
    setformValues({ ...formValues, [name]: value });
  }

  const onResetForm = () => {
    setformValues(initialValues);
  };

  function onBlurHandler(validation, setState) {
    if (validation()) {
      setState(false);
    }
  }

  function validateName() {
    if (name.trim().length === 0) {
      setShowErrorName(true);
      return false;
    }
    return true;
  }

  function validateLastName() {
    if (lastName.trim().length === 0) {
      setShowErrorLastname(true);
      return false;
    }
    return true;
  }

  function validateEmail() {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!pattern.test(email)) {
      setShowErrorEmail(true);
      return false;
    }
    return true;
  }

  function validatePassword() {
    if (password.trim().length <= 6) {
      setShowErrorPassword(true);
      return false;
    }
    return true;
  }

  function validateRepeatedpass() {
    if (repeatedpass.trim().length <= 6 || repeatedpass !== password) {
      setShowErrorRepeatedpass(true);
      return false;
    }
    return true;
  }


  function onSubmit(event) {
    event.preventDefault();
    const valName = validateName();
    const valLastName = validateLastName();
    const valEmail = validateEmail();
    const valPassword = validatePassword();
    const valRepass = validateRepeatedpass();
    if (valName && valLastName && valEmail && valPassword && valRepass) {
      handleRegister({
        name: name,
        lastName: lastName,
        email: email,
        password,
        city,
      });
    }
    onResetForm();
  }

  return (
    <div className={styles.form_Container}>
      <h3 className={styles.subtitle}>Create account</h3>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.fistInputBlock}>
          <div className={styles.form_control}>
            <label htmlFor="formName">Name</label>
            <input
              name="name"
              type="text"
              classID="formName"
              onChange={onChange}
              onBlur={() => onBlurHandler(validateName, setShowErrorName)}
              value={name}
            />
            {showErrorName && (
              <small className={styles.error}>Error Name</small>
            )}
          </div>

          <div className={styles.form_control}>
            <label htmlFor="formLastname">Last name</label>
            <input
              name="lastName"
              type="text"
              classID="formLastname"
              onChange={onChange}
              onBlur={() =>
                onBlurHandler(validateLastName, setShowErrorLastname)
              }
              value={lastName}
            />
            {showErrorLastname && (
              <small className={styles.error}>Error Last Name</small>
            )}
          </div>
        </div>

        <div className={styles.form_control}>
          <label htmlFor="formEmail">Email</label>
          <input
            name="email"
            type="email"
            classID="formEmail"
            onChange={onChange}
            onBlur={() => onBlurHandler(validateEmail, setShowErrorEmail)}
            value={email}
            autoComplete="on"
          />
          {showErrorEmail && (
            <small className={styles.error}>Error Email</small>
          )}
        </div>

        <div className={styles.form_control}>
          <label htmlFor="formPassword">Password</label>
          <input
            name="password"
            type="password"
            classID="formPassword"
            onChange={onChange}
            onBlur={() => onBlurHandler(validatePassword, setShowErrorPassword)}
            value={password}
            autoComplete="current-password"
          />
          {showErrorPassword && (
            <small className={styles.error}>Error Password</small>
          )}
        </div>

        <div className={styles.form_control}>
          <label htmlFor="formPassword2">Confirm password</label>
          <input
            name="repeatedpass"
            type="password"
            classID="formPassword2"
            onChange={onChange}
            onBlur={() =>
              onBlurHandler(validateRepeatedpass, setShowErrorRepeatedpass)
            }
            value={repeatedpass}
            autoComplete="current-password"
          />
          {showErrorRepeatedpass && (
            <small className={styles.error}>Error Confirm password</small>
          )}
        </div>

        <div className={styles.btn_container}>
          <button className={styles.btn}>Create account</button>
          <span>
            Have you one already? &nbsp; <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
