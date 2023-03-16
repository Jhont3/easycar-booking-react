import React, { useContext } from "react";
import styles from "./modules/categories.module.css";
import Carousel from "@itseasy21/react-elastic-carousel";
import { GoIssueOpened } from "react-icons/go";
import { DataAPIContext } from "../context/DataAPIContext";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 468, itemsToShow: 2 },
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
];

export function Categories() {
  const { innerWidth, categories, listOfCarsWithImages } =
    useContext(DataAPIContext);

  return (
    <>
      <section className={styles.section_categories}>
        <h2 className={styles.h2_categories}> Choose Category </h2>
        <div className={styles.row}>
          {categories?.length > 0 ? (
            <Carousel
              breakPoints={breakPoints}
              className={styles.carousel}
              showArrows={innerWidth < 887 ? true : false}
              pagination={false}
            >
              {categories.map((category) => (
                <article
                  className={styles.card}
                  onClick={() => listOfCarsWithImages(category.id)}
                  key={category.id}
                >
                  <img src={category.url} className={styles.img_categories} />
                  <p className={styles.title_card}>{category.title}</p>
                  <p className={styles.p_categories}>{category.description}</p>
                </article>
              ))}
            </Carousel>
          ) : (
            <div>
              <p style={{ textAlign: "center" }}>
                <GoIssueOpened /> Waiting for server response
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
