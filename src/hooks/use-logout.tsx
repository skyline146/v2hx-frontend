import { useNavigate } from "react-router-dom";

import api from "../api";
import { useUserStore } from "../store";
import { API_URLS } from "../helpers/enums";

export const useLogout = () => {
  const { clearUser } = useUserStore((state) => state);
  const navigate = useNavigate();

  return () =>
    api.get(API_URLS.LOGOUT).then(() => {
      clearUser();
      navigate("/");
    });
};
