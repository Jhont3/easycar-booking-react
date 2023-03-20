import axios from "axios";
import { getEnvVariables } from "../utils";

const { VITE_API_URL } = getEnvVariables();

const bookingApi = axios.create({
  baseURL: VITE_API_URL,
});

bookingApi.interceptors.request.use((config) => {
  console.log(config);
  if (
    config?.method === "post" &&
    (config?.url === "/booking" || config?.url === "/cars")
  ) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  if (
    (config?.method === "get" && config?.url === "/booking/client/1") ||
    config?.url === "/booking/client/2"
  ) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }
  return config;
});

export default bookingApi;
