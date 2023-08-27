import { useMutation } from "react-query";
import axios from "axios";

export interface SignBody {
  email: string;
  password: string;
  confirmPassword?: string;
}

const host = window.location.origin + "/api";

const api = axios.create({
  baseURL: host,
});

export const useSign = (link: string) => {
  const mutation = useMutation(async (req: { body: SignBody }) => {
    const response = await api["post"](link, req.body);
    return response.data;
  });

  return {
    data: mutation,
    isLoading: mutation.isLoading,
    error: mutation.error,
    mutate: mutation.mutate,
  };
};
