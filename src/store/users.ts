import { create } from "zustand";
import { produce } from "immer";

export interface User {
  username: string;
  expire_date: string;
  hdd: string;
  mac_address: string;
  last_hdd: string;
  last_mac_address: string;
  last_entry_date: Date;
  warn: number;
  ban: boolean;
}

interface UserState {
  users: User[];
  total: number;
}

type Action = {
  setUsers: (users: User[]) => void;
  setTotal: (total: number) => void;
  updateUser: (data: User) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUsersStore = create<UserState & Action>((set) => ({
  users: [],
  total: 0,
  setUsers: (users: User[]) => set(() => ({ users })),
  setTotal: (total: number) => set(() => ({ total })),
  updateUser: (data: User) =>
    set((state) => ({
      users: state.users.map((user) => (user.username === data.username ? data : user)),
    })),
}));
