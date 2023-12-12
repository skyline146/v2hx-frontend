import api from "../base";
import { API_URLS } from "shared/config";
import { LoginData, UserNewData, IUserRow } from "shared/lib/types";

export const create = async (): Promise<LoginData> => {
  return api.post(API_URLS.USERS);
};

export type GetUsers = {
  page: number;
  search_value?: string;
};

export const get = async (params: GetUsers): Promise<{ users: IUserRow[]; total: number }> => {
  return api.get(API_URLS.USERS, { params });
};

export const getOnline = async (): Promise<{ users: IUserRow[]; total: number }> => {
  return api.get(API_URLS.ONLINE_USERS);
};

export const update = async (user: IUserRow): Promise<void> => {
  return api.patch(API_URLS.USERS + `/${user.username}`, user);
};

export const changeUsername = async (data: Partial<UserNewData>): Promise<string> => {
  return api.post(API_URLS.CHANGE_USERNAME, data);
};

export const changePassword = async (data: Partial<UserNewData>): Promise<string> => {
  return api.post(API_URLS.CHANGE_PASSWORD, data);
};

export const resetPassword = async (username: string): Promise<{ password: string }> => {
  return api.post(API_URLS.USERS + `/${username}/reset-password`);
};

export const remove = async (username: string): Promise<void> => {
  return api.delete(API_URLS.USERS + `/${username}`);
};

export const addFreeDay = async (): Promise<void> => {
  return api.patch(API_URLS.ADD_FREE_DAY);
};
