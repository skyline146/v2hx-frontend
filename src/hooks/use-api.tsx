import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

import api from "../api";

interface IUseApi {
  url: string;
  method: string;
  autoRun?: boolean;
}

export const useApi = ({ url, method, autoRun = true }: IUseApi) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async <T extends object>(body?: T) => {
    setLoading(true);

    api
      .request({ url, method, data: body })
      .then((res: AxiosResponse) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!autoRun) {
      return;
    }

    sendRequest();
  }, []);

  return { data, loading, sendRequest };
};
