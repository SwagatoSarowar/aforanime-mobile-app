import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export function useInfiniteFetch(
  url: string,
  limit: number = 10,
  options?: AxiosRequestConfig
) {
  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [url],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(`${url}?limit=${limit}&page=${pageParam}`, {
        ...options,
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  return {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
}
