import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyAnimation } from "../components/MyAnimation";
import { LoginPageContext } from "../context/LoginPageContext";
import styles from "./modules/loginPage.module.css";

const initialValues = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const [formValues, setformValues] = useState(initialValues);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { setactiveBtn, activeBtn, handleLogin, valCarDetBtnRedd } =
    useContext(LoginPageContext);
  const { email, password } = formValues;

  useEffect(() => {
    setactiveBtn({
      ...activeBtn,
      onLoginPg: true,
      onRegisterPg: false,
    });
  }, []);

  function onChange(event) {
    const { value, name } = event.target;
    setformValues({ ...formValues, [name]: value });
  }

  function validateEmail() {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!pattern.test(email)) {
      setShowErrorMessage(true);
      return false;
    }
    return true;
  }

  function validatePassword() {
    if (password.trim().length <= 6) {
      setShowErrorMessage(true);
      return false;
    }
    return true;
  }

  const onResetForm = () => {
    setformValues(initialValues);
  };

  function onSubmit(event) {
    event.preventDefault();
    if (validateEmail() && validatePassword()) {
      setShowErrorMessage(false);
      handleLogin({ username: email, password: password });
    } else {
      setShowErrorMessage(true);
    }
    onResetForm();
  }

  return (
    <>
      <MyAnimation />
      <div className={styles.form_Container}>
        <h3 className={styles.subtitle}>Sign in</h3>
        {valCarDetBtnRedd && (
          <div>
            <h4 className={styles.error}>Please sign in to reserve a car</h4>
          </div>
        )}
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.form_control}>
            <label htmlFor="formEmail">Email</label>
            <input
              name="email"
              type="email"
              classID="formEmail"
              onChange={onChange}
              value={email}
              autoComplete="off"
            />
          </div>

          <div className={styles.form_control}>
            <label htmlFor="formPassword">Password</label>
            <input
              name="password"
              type="password"
              classID="formPassword"
              onChange={onChange}
              value={password}
              autoComplete="off"
            />
          </div>

          {showErrorMessage && (
            <span className={styles.error}>
              Please try again, your credentials are invalid
            </span>
          )}

          <div className={styles.btn_container}>
            <button type="submit" className={styles.btn}>
              Login
            </button>
            <span>
              Don't have an account yet? &nbsp;
              <Link to="/register">Create account</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};
