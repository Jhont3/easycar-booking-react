import axios from "axios";
import { getEnvVariables } from "../utils";

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

  return config;
});

export default bookingApi;
