import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { RepresentativeStatus } from "@/constants";

export type RepresentativeType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: RepresentativeStatus;
  isAdmin: boolean;
  createdAt: string;
  expiredAt: string;
  roles: string[];
};

const useGetRepresentative = (
  hookOptions?: UseQueryOptions<RepresentativeType[], AxiosError>,
) => {
  return useQuery<RepresentativeType[], AxiosError>({
    queryKey: ["representatives"],
    queryFn: async () => {
      const { data } = await apiService().get("/v1/representatives");

      // return data;
      // TODO
      // for now all data from api have the same id
      // create different id
      return data.map((re: RepresentativeType, idx: number) => {
        return {
          ...re,
          id: re.id + idx,
        };
      });
    },
    ...hookOptions,
  });
};

export default useGetRepresentative;
