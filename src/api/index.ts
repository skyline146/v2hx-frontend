import axios from "axios";
import { notification } from "../components";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && location.pathname === "/") return;

    notification({
      message: err.response?.data?.message || err.message,
      type: "Error",
    });

    throw err;
  }
);

export default api;
