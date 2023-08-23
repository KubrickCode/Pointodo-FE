import { useMutation, useQuery } from "react-query";
import axios, { AxiosRequestConfig } from "axios";
import {
  EXPIRED_ACCESS_TOKEN,
  INVALID_ACCESS_TOKEN,
} from "../shared/messages/auth.error";
import { INTERNAL_SERVER_ERROR } from "../shared/messages/global.error";
import { QUERY_STALE_TIME } from "../shared/constants/query.constant";

const host = window.location.origin + "/api";

export type MethodType = "post" | "patch" | "put" | "delete";

const api = axios.create({
  baseURL: host,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      !error.response ||
      (error.response.data.message !== INVALID_ACCESS_TOKEN &&
        error.response.data.message !== EXPIRED_ACCESS_TOKEN)
    ) {
      throw error;
    }

    if (error.response.status === 500) {
      alert(INTERNAL_SERVER_ERROR);
    }

    const response = await api.get("/auth/refresh");
    if (!response.data.accessToken) {
      localStorage.removeItem("persistStore");
      localStorage.removeItem("accessToken");
      window.location.href = "/";
      return Promise.reject(error);
    }
    localStorage.setItem("accessToken", response.data.accessToken);
    error.config.headers[
      "Authorization"
    ] = `Bearer ${response.data.accessToken}`;
    return api.request(error.config);
  }
);

export const useQueryGet = (link: string, key: string, queryOptions?: {}) => {
  const queryFunc = async () => {
    const response = await api.get(link);
    return response.data;
  };

  return useQuery([key, host + link], queryFunc, {
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
