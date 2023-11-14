// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URLS } from "../helpers/enums";

export const useIsLogged = () => {
  const [isLogged, setIsLogged] = useState<null | string>(null);

  useEffect(() => {
    async function getLogged() {
      await axios
        .get(API_URLS.IS_LOGGED, { withCredentials: true })
        .then((res) => {
          console.log(res);

          setIsLogged(res.data);
        })
        .catch((err) => console.log(err));
    }

    getLogged();
  }, []);

  return isLogged;
};
