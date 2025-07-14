import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";

export type UserType = {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
};

export type ResponseType = UserType;

type ValuesType = {
  email: string;
  authToken: string;
};

const useGetUserByEmail = (
  options: UseMutationOptions<
    ResponseType,
    AxiosError<string>,
    ValuesType
  > = {},
) => {
  return useMutation({
    mutationFn: async (values: ValuesType) => {
      // const { email, authToken } = values;
      // const { data } = await apiService().get(`/v1/users/by-email/${email}`, {
      //   headers: {
      //     Authorization: "Basic " + authToken,
      //   },
      // });
      const data = {
        email: "thinh.ducnguyen@gft.com",
        firstName: "Thinh",
        isAdmin: true,
        lastName: "Nguyen",
        headers: {
          Authorization: "Basic " + "abcd1234",
        },
      };
      return data;
    },
    ...options,
  });
};

export default useGetUserByEmail;
