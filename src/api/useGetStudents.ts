import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { type GenderType } from "@/types";
import apiService from "./apiService";
import {
  type CertificateType,
  type UserCredentialType,
} from "./useGetCertificates";

export type StudentCertificateType = Omit<
  CertificateType,
  "userCredentials"
> & {
  userCredentials: Pick<UserCredentialType, "credential">[];
};

export type StudentType = {
  avatar: string;
  certificates: StudentCertificateType[];
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: GenderType;
  id: string;
  isAdmin: boolean;
  lastName: string;
  nationalId: string;
  password: string;
  phone: string;
  userDid: string;
};

export type ResponseType = StudentType[] | undefined;

const useGetStudents = (
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await apiService().get("/v1/users");

      return data;
    },
    ...hookOptions,
  });
};

export default useGetStudents;
