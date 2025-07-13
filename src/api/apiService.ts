import axios, {
  AxiosError,
  type AxiosRequestConfig,
  // type AxiosInstance,
} from "axios";

export type CustomAxiosError = AxiosError<{ message: string }>;

// const apiInterceptor = (instance: AxiosInstance) => {
//   instance.interceptors.request.use(
//     async (request) => {
//       if (request.headers) {
//         request.headers["authorization"] = "";
//       }

//       return request;
//     },
//     (error: Error) => {
//       return Promise.reject(error);
//     },
//   );
// };

const BASE_URL = import.meta.env.VITE_ISSUER_API_URL;

const apiService = () => {
  const params: AxiosRequestConfig = {
    baseURL: BASE_URL,
  };

  const instance = axios.create(params);

  // apiInterceptor(instance);

  return instance;
};

export default apiService;
