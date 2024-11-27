import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export function useFetch(url: string, options?: AxiosRequestConfig) {
  const {
    data,
    refetch,
    error: fetchError,
    isError,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const res = await axios.get(url, { ...options });
      return res.data;
    },
  });

  return { data, refetch, fetchError, isError, isSuccess, isPending };
}
