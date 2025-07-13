import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { GenderType } from "@/types";

export type FormDataType = {
  avatar: File;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
  city: string;
  nationalId: string;
  dateOfBirth: Date;
  gender: GenderType;
};

type UserData = Pick<
  FormDataType,
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "password"
  | "country"
  | "city"
  | "nationalId"
  | "gender"
  | "avatar"
> & {
  dateOfBirth: string;
};

type ValuesType = UserData;

type ResponseType = { id: string };

type ErrorType = AxiosError<{ message: string }>;

const usePostUser = (
  options: UseMutationOptions<ResponseType, ErrorType, ValuesType> = {},
) => {
  return useMutation<ResponseType, ErrorType, ValuesType>({
    mutationFn: async (body: UserData) => {
      const { data } = await apiService().post("/v1/users/register", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
    ...options,
  });
};

export default usePostUser;
