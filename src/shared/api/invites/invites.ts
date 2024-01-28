import api from "../base";
import { API_URLS } from "shared/config";
import { User } from "../users/models";

export const create = async (data: { code: string }): Promise<string> => {
  return api.post(API_URLS.INVITES.BASE, data);
};

export const accept = async (data: { code: string }): Promise<User> => {
  return api.post(API_URLS.INVITES.ACCEPT, data);
};
