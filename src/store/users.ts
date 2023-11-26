import { create } from "zustand";
import { IUserRow } from "shared/lib/types";
// import { produce } from "immer";

interface UserState {
  users: IUserRow[];
  total: number;
}

type Action = {
  setUsers: (users: IUserRow[]) => void;
  setTotal: (total: number) => void;
  updateUser: (data: IUserRow) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUsersStore = create<UserState & Action>((set) => ({
  users: [],
  total: 0,
  setUsers: (users: IUserRow[]) => set(() => ({ users })),
  setTotal: (total: number) => set(() => ({ total })),
  updateUser: (data: IUserRow) =>
    set((state) => ({
      users: state.users.map((user) => (user.username === data.username ? data : user)),
    })),
}));
