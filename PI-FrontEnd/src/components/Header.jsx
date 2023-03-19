import React, { useCallback, useContext, useEffect } from "react";
import styles from "./modules/header.module.css";
import imgLogo from "/images/Logoultimo.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginPageContext } from "../context/LoginPageContext";
import { HamburgerDropdown } from "./HamburgerDropdown";
import { RiAdminLine } from "react-icons/ri";
import { DataAPIContext } from "../context";
import { MyAnimation } from "./MyAnimation";

export function Header() {
  const { user, activeBtn, goToLoginPg, goToRegisterPg, convertInfoToken } =
    useContext(LoginPageContext);

  const { innerWidth } = useContext(DataAPIContext);

  const convertInfoUser = useCallback(() => {
    localStorage.getItem("token") && convertInfoToken();
  }, []);

  useEffect(() => {
    convertInfoUser();
  }, []);

  const { onLoginPg, onRegisterPg } = activeBtn;

  const handleLogOut = () => {
    localStorage.clear();
  };

  const navigate = useNavigate();

  return (
    <div className={`${styles.container_header}`}>
      <div>
        <Link to="/home" className={`${styles.container_logo}`}>
          <img src={imgLogo} className={`${styles.logo}`} />
        </Link>
      </div>
      {localStorage.getItem("token") ? (
        <section className={styles.login}>
          {localStorage.getItem("rol") == 1 ? (
            <RiAdminLine
              style={{ fontSize: 30 }}
              onClick={() => navigate("/admin")}
            />
          ) : undefined}
          <div className={styles.welcome}>
            {innerWidth > 760 && <h2>Hello {user.name}</h2>}
            <span>{user.name.toUpperCase().charAt(0)}</span>
          </div>
          <Link
            className={styles.link}
            onClick={() => handleLogOut()}
            to="/home"
          >
            Logout
          </Link>
        </section>
      ) : (
        <div className={`${styles.container_buttons}`}>
          <button
            onClick={goToLoginPg}
            className={`${styles.btn} ${styles.custom_btn} ${
              onLoginPg ? "btn_hd" : ""
            }`}
          >
            <span>Login</span>
          </button>
          <button
            onClick={goToRegisterPg}
            className={`${styles.btn} ${styles.custom_btn} ${
              onRegisterPg ? "btn_hd" : ""
            }`}
          >
            <span>Sign up</span>
          </button>
        </div>
      )}

      <div className={`${styles.container_icon}`}>
        <HamburgerDropdown />
      </div>
    </div>
  );
}
