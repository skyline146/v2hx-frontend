import axios from "axios";
import { notification } from "../components";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    notification({
      message: err.response?.data?.message || err.message,
      type: "Error",
    });

    if (err.response?.status === 401) {
      if (location.pathname !== "/") {
        location.assign("/");
      }
    }

    throw err;
  }
);

export default api;
