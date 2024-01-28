import { User } from "shared/api/users/models";

export type FeaturesList = {
  title: string;
  icon: string;
  columns: { name: string; features: string[] }[];
}[];

export type UserNewData = {
  newUsername: string;
  password: string;
  newPassword: string;
};

export type LoginData = {
  username: string;
  password: string;
};

export type Info = {
  status: string;
  cheat_version: string;
  loader_version: string;
};

export interface IUserRow extends User {
  subscription_type: string;
  hdd: string;
  last_hdd: string;
  mac_address: string;
  last_mac_address: string;
  warn: number;
  ban: boolean;
  last_entry_date: string;
  ip: string;
  last_ip: string;
  discord_id: string;
  online: boolean;
}

export interface IUsersTable {
  users: IUserRow[];
  total: number;
}

export type Player = {
  xuid: string;
  gamertag: string;
  type: number;
  reason: string;
};

export type AddPlayer = Omit<Player, "xuid">;

export interface IPlayerRow extends Player {
  id: string;
  added_by: string;
}

export interface IPlayerlist {
  players: IPlayerRow[];
  total: number;
}
