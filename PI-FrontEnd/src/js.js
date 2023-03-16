import { bookingApi } from "./api";

async function getImagesByCarId(id) {
  try {
    const response = await bookingApi.get(`/images/car/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getCarListWithImages(list) {
  for (const car of list) {
    const listCarImages = await getImagesByCarId(car.id);
    car.images = listCarImages;
  }
}

async function auxiliaryFunction(id) {
  try {
    const response = await bookingApi.get(`/cars/category/${id}`);
    const data = response.data;
    const carListWithImages = getCarListWithImages(data);
    setCarListWithImages(carListWithImages);
  } catch (error) {
    console.error(error);
  }
}
