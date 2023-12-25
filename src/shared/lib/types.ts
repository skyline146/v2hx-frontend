import { User } from "shared/api/users/models";

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
