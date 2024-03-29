import api from "../base";
import { API_URLS } from "shared/config";
import { AddPlayer, IPlayerlist, IPlayerRow, Player } from "shared/lib/types";

export type GetPlayerlist = {
  page: number;
  search_value?: string;
};

export const add = async (data: AddPlayer): Promise<string> => {
  return api.post(API_URLS.PLAYERLIST.ADD, data);
};

export const get = async (params: GetPlayerlist): Promise<IPlayerlist> => {
  return api.get(API_URLS.PLAYERLIST.BASE, { params });
};

export const findOne = async (gamertag: string): Promise<Omit<Player, "xuid">> => {
  return api.get(API_URLS.PLAYERLIST.BASE + `/${gamertag}`);
};

export const update = async (player: IPlayerRow): Promise<void> => {
  return api.patch(API_URLS.PLAYERLIST.BASE + `/${player.id}`, player);
};

export const remove = async (id: string): Promise<void> => {
  return api.delete(API_URLS.PLAYERLIST.BASE + `/${id}`);
};
