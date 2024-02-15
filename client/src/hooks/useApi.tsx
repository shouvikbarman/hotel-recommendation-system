import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const useApi = <T,>(
  url: string,
  options?: AxiosRequestConfig,
  condition: boolean = true,
) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  console.log(BASE_URL);
  
  const fullUrl = BASE_URL + url;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | unknown>(null);

  const fetchData = async () => {
    try {
      if (condition) {
        const response: AxiosResponse<T> = await axios(fullUrl, {
          ...options,
          withCredentials: true,
        });
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  // Return the state and a function to trigger a re-fetch
  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useApi;
