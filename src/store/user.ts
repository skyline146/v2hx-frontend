import { create } from "zustand";
import { produce } from "immer";

interface User {
  username: string;
  admin: boolean;
  expire_date: string;
}

interface UserState {
  user: User;
}

type Action = {
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUsername: (username: string) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<UserState & Action>((set) => ({
  user: { username: "", admin: false, expire_date: "" },
  setUser: (user: User) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: {} as User })),
  updateUsername: (username: string) =>
    set(
      produce((state: UserState) => {
        state.user.username = username;
      })
    ),
}));
