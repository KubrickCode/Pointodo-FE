import { useMutation, useQuery } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import { EXPIRED_ACCESS_TOKEN } from "../shared/messages/auth.error";
import { INTERNAL_SERVER_ERROR } from "../shared/messages/global.error";
import { QUERY_STALE_TIME } from "../shared/constants/query.constant";
import { REFRESH_LINK } from "../shared/constants/auth.constant";

const host = window.location.origin + "/api";

export type MethodType = "post" | "patch" | "put" | "delete";

const api = axios.create({
  baseURL: host,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.data.message === EXPIRED_ACCESS_TOKEN) {
      const response = await api.post(REFRESH_LINK);
      if (!response.data) {
        localStorage.removeItem("themeStore");
        window.location.href = "/";
        return Promise.reject(error);
      }

      return api.request(error.config);
    }

    if (error.response.status === 500) {
      alert(INTERNAL_SERVER_ERROR);
    }

    throw error;
  }
);

export const useQueryGet = (link: string, key: string, queryOptions?: {}) => {
  const queryFunc = async () => {
    const response = await api.get(link);
    return response.data;
  };

  return useQuery([key, host + link], queryFunc, {
    retry: false,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
};

export const useQueryMutate = () => {
  const mutation = useMutation(
    async ({
      link,
      body,
      method,
      config,
    }: {
      link: string;
      body?: object;
      method: MethodType;
      config?: AxiosRequestConfig;
    }) => {
      const response = await api[method](link, body, config);
      return response.data;
    }
  );

  return {
    data: mutation,
    isLoading: mutation.isLoading,
    error: mutation.error,
    mutate: mutation.mutate,
  };
};
