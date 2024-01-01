import { create } from "zustand";
import { produce } from "immer";

interface User {
  username: string;
  admin: boolean;
  expire_date: string;
  is_authenticated: boolean;
  is_authenticating: boolean;
}

interface UserState {
  user: User;
  loading: boolean;
}

type Action = {
  setUser: (user: Omit<User, "is_authenticating">) => void;
  setIsAuthenticating: (is_authenticating: boolean) => void;
  clearUser: () => void;
  updateUsername: (username: string) => void;
  toggleLoading: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<UserState & Action>((set) => ({
  user: {
    username: "",
    admin: false,
    expire_date: "",
    is_authenticated: false,
    is_authenticating: true,
  },
  loading: false,
  setUser: (user: Omit<User, "is_authenticating">) =>
    set(() => ({ user: { ...user, is_authenticating: false } })),
  setIsAuthenticating: (is_authenticating: boolean) =>
    set(
      produce((state: UserState) => {
        state.user.is_authenticating = is_authenticating;
      })
    ),
  clearUser: () => set(() => ({ user: {} as User })),
  updateUsername: (username: string) =>
    set(
      produce((state: UserState) => {
        state.user.username = username;
      })
    ),
  toggleLoading: () => set((state) => ({ loading: !state.loading })),
}));
