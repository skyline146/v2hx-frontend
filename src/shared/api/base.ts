import axios from "axios";
import { API_URLS, BASE_API_URL } from "shared/config";
import { notification } from "shared/lib";
import history from "history/browser";

const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

const refreshTokens = async () => {
  try {
    await axios.post(BASE_API_URL + API_URLS.AUTH.REFRESH, null, { withCredentials: true });
    return true; // Токен успешно обновлен
  } catch (error) {
    return false; // Обновление токена не удалось
  }
};

api.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    const originalRequest = err.config;

    // if (err.response.status === 401 && location.pathname === "/login" && !originalRequest._retry)
    //   return;

    // Проверяем, является ли ошибка статусом 401 и не был ли уже попыток обновления токена
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const isTokensRefreshed = await refreshTokens();

      if (isTokensRefreshed) {
        // Токен обновлен, повторяем исходный запрос
        return (await axios(originalRequest)).data;
      } else {
        if (location.pathname === "/") return;
        // Не удалось обновить токен, перенаправляем на страницу входа
        // window.location.replace("/login");
        history.push("/login");
        return Promise.reject(err);
      }
    }

    notification({
      message: err.response?.data?.message || err.message,
      type: "Error",
    });

    throw err;
  }
);

export default api;
