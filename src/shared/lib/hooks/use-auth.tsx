import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "shared/api";
import { LoginData } from "shared/lib/types";
import { User } from "shared/api/users/models";
import { useUserStore } from "store";

export const useAuth = () => {
  const { clearUser, setUser } = useUserStore((state) => state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setUserData = (user: User) => {
    const { username, admin, expire_date } = user;
    const userData = {
      username,
      admin,
      expire_date,
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
        setUserData(user);
        if (location.pathname === "/") navigate("/profile");
      })
      .catch(() => navigate("/"));
  };

  const logout = async () => {
    setLoading(true);
    await authApi
      .logout()
      .then(() => {
        clearUser();
        navigate("/");
      })
      .finally(() => setLoading(false));
  };

  const toggleLoading = () => {
    setLoading((loading) => !loading);
  };

  return { login, logout, isLogged, loading, toggleLoading };
};
