import axios from "axios";
import { getEnvVariables } from "../utils";

function getInfoID() {
  let idUser = localStorage.getItem("uid") ? localStorage.getItem("uid") : undefined;
  return idUser
}

function getInfoSelecResv() {
  let idBook = localStorage.getItem("selectedBooking") ? localStorage.getItem("selectedBooking") : undefined;
  return idBook
}

const { VITE_API_URL } = getEnvVariables();

const bookingApi = axios.create({
  baseURL: VITE_API_URL,
});

bookingApi.interceptors.request.use((config) => {
  if (
    config?.method === "post" &&
    (config?.url === "/booking" || config?.url === "/cars")
  ) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  if (config?.method === "get"  && config?.url === "/booking/client/" + getInfoID()) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  if (config?.method === "delete"  && config?.url === "/booking/" + getInfoSelecResv()) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  return config;
});

export default bookingApi;
