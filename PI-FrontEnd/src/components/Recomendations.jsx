import { Card } from "../components/Card";
import styles from "../components/modules/card.module.css";

export function Recomendations({
  listOfCarsByCategoryId,
  selectedOptionCity,
  randomCars,
  listDispCarsByDates,
  listDispCarsByDatesAndCity
}) {
  return (
    <>
      <section className={styles.recomendations_container}>
        <h2 className={styles.nameList}>
          {listOfCarsByCategoryId?.length > 0
            ? listOfCarsByCategoryId[0].category.title
            : "Recomendations"}
        </h2>
        <div className={styles.listCard}>
          {listOfCarsByCategoryId?.length > 0
            ? listOfCarsByCategoryId.map((car) => (
                <Card car={car} key={car.id} />
              ))
            : undefined}
          {selectedOptionCity?.length > 0
            ? selectedOptionCity.map((selectedOptionCity) => (
                <Card
                  selectedOptionCity={selectedOptionCity}
                  key={selectedOptionCity.id}
                />
              ))
            : undefined}
          {listDispCarsByDates?.length > 0
            ? listDispCarsByDates.map((selectedCarDisp) => (
                <Card
                selectedCarDisp={selectedCarDisp}
                  key={selectedCarDisp.id}
                />
              ))
            : undefined}
          {listDispCarsByDatesAndCity?.length > 0
            ? listDispCarsByDatesAndCity.map((selectedCarDispByCity) => (
                <Card
                selectedCarDispByCity={selectedCarDispByCity}
                  key={selectedCarDispByCity.id}
                />
              ))
            : undefined}
          {randomCars?.length > 0
            ? randomCars
                .slice(0, 8)
                .map((itemRand) => (
                  <Card itemRand={itemRand} key={itemRand.id} />
                ))
            : undefined}            
        </div>
      </section>
    </>
  );
}
