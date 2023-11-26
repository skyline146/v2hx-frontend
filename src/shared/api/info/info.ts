import api from "../base";
import { API_URLS } from "shared/config";
import { Info } from "shared/lib/types";

export const get = async (): Promise<Info> => {
  return api.get(API_URLS.INFO);
};

export const update = async (data: Info): Promise<Info> => {
  return api.patch(API_URLS.INFO, data);
};
