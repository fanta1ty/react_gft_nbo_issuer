import { CustomAxiosError } from "@/api/apiService";

const getErrorMessage = (
  error: CustomAxiosError | Error,
  defaultMessage?: string,
) => {
  return (
    (error as CustomAxiosError).response?.data?.message ||
    error.message ||
    defaultMessage
  );
};

export default getErrorMessage;
