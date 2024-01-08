import api from "../base";
import { API_URLS } from "shared/config";
import { AddPlayer, IPlayerlist, IPlayerRow } from "shared/lib/types";

export const add = async (data: AddPlayer): Promise<string> => {
  return api.post(API_URLS.PLAYERLIST.ADD, data);
};

export const get = async (params?: { search_value?: string }): Promise<IPlayerlist> => {
  return api.get(API_URLS.PLAYERLIST.BASE, { params });
};

export const update = async (player: IPlayerRow): Promise<void> => {
  return api.patch(API_URLS.PLAYERLIST.BASE + `/${player.id}`, player);
};

export const remove = async (id: string): Promise<void> => {
  return api.delete(API_URLS.PLAYERLIST.BASE + `/${id}`);
};
