import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "shared/api";
import { User } from "shared/api/users/models";
import { useUserStore } from "store";
import { checkSubscription } from "..";

import { LoginData } from "shared/lib/types";

export const useAuth = () => {
  const { clearUser, setUser, setIsAuthenticating } = useUserStore((state) => state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setUserData = (user: User) => {
    const {
      username,
      admin,
      expire_date,
      invitation_code,
      code_activations,
      is_code_activated,
      subscription_type,
    } = user;

    const userData: User = {
      username,
      admin,
      expire_date,
      subscription_type,
      is_active_subscription: admin ? true : checkSubscription(user),
      invitation_code,
      code_activations,
      is_code_activated,
    };

    setUser(userData);
  };

  const login = async (data: LoginData) => {
    await authApi.login(data).then((user) => {
      setUserData(user);
      navigate("/profile");
    });
  };

  const isLogged = async () => {
    await authApi
      .isLogged()
      .then((user) => {
        if (!user) return;

        setUserData(user);
      })
      .finally(() => setIsAuthenticating(false));
  };

  const logout = async () => {
    setLoading(true);
    await authApi
      .logout()
      .then(() => {
        clearUser();
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleLoading = () => {
    setLoading((loading) => !loading);
  };

  return { login, logout, isLogged, loading, toggleLoading };
};
