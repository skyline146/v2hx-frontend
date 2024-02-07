import { create } from "zustand";
import { produce } from "immer";

import { User } from "shared/api/users/models";
import { SubscriptionType } from "shared/config";

interface UserStore extends User {
  is_authenticated: boolean;
  is_authenticating: boolean;
}

interface UserState {
  user: UserStore;
  loading: boolean;
}

type Action = {
  setUser: (user: User) => void;
  setIsAuthenticating: (is_authenticating: boolean) => void;
  clearUser: () => void;
  updateUser: (data: Partial<User>) => void;
  toggleLoading: () => void;
};

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<UserState & Action>((set) => ({
  user: {
    username: "",
    admin: false,
    expire_date: "",
    subscription_type: SubscriptionType.No,
    is_active_subscription: false,
    invitation_code: "",
    code_activations: 0,
    is_code_activated: true,
    is_authenticated: false,
    is_authenticating: true,
  },
  loading: false,
  setUser: (user: User) =>
    set(
      produce((state: UserState) => {
        state.user = { ...user, is_authenticating: false, is_authenticated: true };
      })
    ),
  setIsAuthenticating: (is_authenticating: boolean) =>
    set(
      produce((state: UserState) => {
        state.user.is_authenticating = is_authenticating;
      })
    ),
  clearUser: () => set(() => ({ user: {} as UserStore })),
  updateUser: (user: Partial<User>) =>
    set(
      produce((state: UserState) => {
        state.user = { ...state.user, ...user };
      })
    ),
  toggleLoading: () => set((state) => ({ loading: !state.loading })),
}));
