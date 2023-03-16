import Carousel from "@itseasy21/react-elastic-carousel";
import styles from "./modules/imagesCarSimple.module.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 769, itemsToShow: 2 },
];

export const ImagesCarSimple = ({ images }) => {
  return (
    <Carousel breakPoints={breakPoints} showArrows={false} pagination={true}>
      {images.map((cardlist) => (
        <article className={styles.card} key={cardlist.id}>
          <img src={cardlist.url} className={styles.img_categories} />
        </article>
      ))}
    </Carousel>
  );
};
