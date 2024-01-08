import api from "../base";
import { API_URLS } from "shared/config";
import { LoginData, UserNewData, IUserRow, IUsersTable } from "shared/lib/types";

export const create = async (): Promise<LoginData> => {
  return api.post(API_URLS.USERS.BASE);
};

export type GetUsers = {
  page: number;
  search_value?: string;
};

export const get = async (params: GetUsers): Promise<IUsersTable> => {
  return api.get(API_URLS.USERS.BASE, { params });
};

export const getOnline = async (): Promise<IUsersTable> => {
  return api.get(API_URLS.USERS.ONLINE);
};

export const update = async (user: IUserRow): Promise<void> => {
  return api.patch(API_URLS.USERS.BASE + `/${user.username}`, user);
};

export const changeUsername = async (data: Partial<UserNewData>): Promise<string> => {
  return api.post(API_URLS.USERS.CHANGE_USERNAME, data);
};

export const changePassword = async (data: Partial<UserNewData>): Promise<string> => {
  return api.post(API_URLS.USERS.CHANGE_PASSWORD, data);
};

export const resetPassword = async (username: string): Promise<{ password: string }> => {
  return api.post(API_URLS.USERS.BASE + `/${username}/reset-password`);
};

export const remove = async (username: string): Promise<void> => {
  return api.delete(API_URLS.USERS.BASE + `/${username}`);
};

export const addFreeDay = async (): Promise<void> => {
  return api.patch(API_URLS.USERS.ADD_FREE_DAY);
};
