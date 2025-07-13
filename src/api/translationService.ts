import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export type CustomAxiosError = AxiosError<{ message: string }>;

const BASE_URL = import.meta.env.VITE_TRANSLATION_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const translationService = () => {
  const params: AxiosRequestConfig = {
    baseURL: BASE_URL,
    headers: {
      "x-api-key": API_KEY,
    },
  };

  const instance = axios.create(params);
  return instance;
};

export default translationService;
