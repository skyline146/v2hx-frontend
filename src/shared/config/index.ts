export const BASE_API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const API_URLS = {
  LOGIN: "/auth/login-web",
  LOGOUT: "/auth/logout-web",
  IS_LOGGED: "/auth/is-logged",
  USERS: "/users",
  ADD_FREE_DAY: "/users/add-free-day",
  CHANGE_USERNAME: "/users/change-username",
  CHANGE_PASSWORD: "/users/change-password",
  INFO: "/info",
};

//subscription times
const day = 24 * 60 * 60 * 1000;

export const SUBSCRIPTION = {
  DAY: new Date(day).getTime(),
  WEEK: new Date(7 * day).getTime(),
  MONTH: new Date(30 * day).getTime(),
  LIFETIME: "Lifetime",
};
