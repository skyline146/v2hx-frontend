import api from "../base";
import { API_URLS } from "shared/config";
import { User } from "../users/models";
import { LoginData } from "shared/lib/types";

export const login = async (data: LoginData): Promise<User> => {
  return api.post(API_URLS.LOGIN, data);
};

export const isLogged = (): Promise<User> => {
  return api.get(API_URLS.IS_LOGGED);
};

export const logout = (): Promise<boolean> => {
  return api.post(API_URLS.LOGOUT);
};
