export const BASE_API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const API_URLS = {
  AUTH: {
    LOGIN: "/auth/login-web",
    LOGOUT: "/auth/logout-web",
    IS_LOGGED: "/auth/is-logged",
    REFRESH: "/auth/refresh",
  },
  USERS: {
    BASE: "/users",
    ONLINE: "/users/online",
    ADD_FREE_DAY: "/users/add-free-day",
    CHANGE_USERNAME: "/users/change-username",
    CHANGE_PASSWORD: "/users/change-password",
  },
  INVITES: {
    BASE: "/invites",
    ACCEPT: "/invites/accept",
  },
  INFO: "/info",
  PLAYERLIST: {
    BASE: "/playerlist",
    ADD: "/playerlist/add",
  },
};

export const pages = {
  HOME: "/",
  PROFILE: "/profile",
  ADMIN: "/admin",
};

export enum playerType {
  Streamer = 1,
  Cheater = 2,
  Toxic = 3,
}

export enum playerBadge {
  "violet" = 1,
  "red" = 2,
  "green" = 3,
}

//subscription times
const day = 24 * 60 * 60 * 1000;

export const SUBSCRIPTION = {
  DAY: new Date(day).getTime(),
  WEEK: new Date(7 * day).getTime(),
  MONTH: new Date(30 * day).getTime(),
  LIFETIME: "Lifetime",
};

export enum SubscriptionType {
  No = "",
  Week = "Week",
  Month = "Month",
  Lifetime = "Lifetime",
}
