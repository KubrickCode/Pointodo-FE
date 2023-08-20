import { useMutation, useQuery } from "react-query";
import axios, { AxiosRequestConfig } from "axios";

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
      (error.response.data.message !== "유효하지 않은 토큰입니다" &&
        error.response.data.message !== "만료된 토큰입니다")
    ) {
      throw error;
    }

    if (error.response.status === 500) {
      alert("서버 내부 오류 발생");
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
    staleTime: 1000 * 60 * 5,
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
