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
  discord_username: string;
  hdd: string;
  mac_address: string;
  last_hdd: string;
  last_mac_address: string;
  warn: number;
  ban: boolean;
}
