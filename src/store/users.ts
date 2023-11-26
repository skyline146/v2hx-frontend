import { create } from "zustand";
import { UserRow } from "shared/lib/types";
// import { produce } from "immer";

interface UserState {
  users: UserRow[];
  total: number;
}

type Action = {
  setUsers: (users: UserRow[]) => void;
  setTotal: (total: number) => void;
  updateUser: (data: UserRow) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUsersStore = create<UserState & Action>((set) => ({
  users: [],
  total: 0,
  setUsers: (users: UserRow[]) => set(() => ({ users })),
  setTotal: (total: number) => set(() => ({ total })),
  updateUser: (data: UserRow) =>
    set((state) => ({
      users: state.users.map((user) => (user.username === data.username ? data : user)),
    })),
}));
