import { useContext } from "react";
import { LoginPageContext } from "../context";
import styles from "./modules/imagesCarGrid.module.css";

export const ImagesCarGrid = ({ eachOne }) => {
  const { onImgClick } = useContext(LoginPageContext);

  return (
    <div>
      <img src={eachOne.url} className={styles.img_Item} onClick={onImgClick} />
    </div>
  );
};
