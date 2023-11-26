import axios from "axios";
import { BASE_API_URL } from "shared/config";
import { notification } from "shared/lib";

const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res.data,
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
