import { create } from "zustand";
import { produce } from "immer";

interface UserProfileData {
  username: string;
  admin: boolean;
  expire_date: string;
}

interface UserState {
  user: UserProfileData;
  loading: boolean;
}

type Action = {
  setUser: (user: UserProfileData) => void;
  clearUser: () => void;
  updateUsername: (username: string) => void;
  toggleLoading: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<UserState & Action>((set) => ({
  user: { username: "", admin: false, expire_date: "" },
  loading: false,
  setUser: (user: UserProfileData) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: {} as UserProfileData })),
  updateUsername: (username: string) =>
    set(
      produce((state: UserState) => {
        state.user.username = username;
      })
    ),
  toggleLoading: () => set((state) => ({ loading: !state.loading })),
}));
