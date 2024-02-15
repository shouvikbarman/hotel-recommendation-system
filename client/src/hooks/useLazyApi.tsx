import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const useLazyApi = <T,>() => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | unknown>(null);

  const fetchData = async (url: string, options?: AxiosRequestConfig) => {
    try {
      const fullUrl = BASE_URL + url;
      const response: AxiosResponse<T> = await axios(fullUrl, {
        ...options,
        withCredentials: true,
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useLazyApi;
