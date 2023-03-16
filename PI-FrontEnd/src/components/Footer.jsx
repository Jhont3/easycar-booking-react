import React from "react";
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";
import styles from "./modules/footer.module.css";

export const Footer = () => {
  return (
    <div className={`${styles.footer}`}>
      <div className={`${styles.container_copy}`}>
        <p>©️2023 Digital Booking</p>
      </div>
      <div className={`${styles.container_icons}`}>
        <a href="https://www.facebook.com/">
          <BsFacebook className={`${styles.icon_size}`} />
        </a>
        <a href="https://www.linkedin.com/">
          <BsLinkedin className={`${styles.icon_size}`} />
        </a>
        <a href="https://www.twitter.com/">
          <BsTwitter className={`${styles.icon_size}`} />
        </a>
        <a href="https://www.instagram.com/">
          <BsInstagram className={`${styles.icon_size}`} />
        </a>
      </div>
    </div>
  );
};
