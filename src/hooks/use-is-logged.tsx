// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../store";
import { API_URLS } from "../helpers/enums";
import api from "../api";

export const useIsLogged = () => {
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(API_URLS.IS_LOGGED)
      .then((res) => {
        const { username, admin, expire_date } = res.data;
        const userData = {
          username,
          admin,
          expire_date,
        };
        setUser(userData);
        if (location.pathname === "/") navigate("/profile");
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  return { loading };
};
