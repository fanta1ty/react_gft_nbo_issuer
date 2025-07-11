import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import translationService from "./translationService";

export type SchemaTranslationType = {
  [key: string]: string;
};

export type ResponseType = SchemaTranslationType | undefined;

type ArgsType = {
  language: string;
};

const useGetSchemaTranslation = (
  args: ArgsType,
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  const { language } = args ?? {};
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["schema-translation", language],
    queryFn: async () => {
      const { data } = await translationService().get(
        `/v1/translations?language_code=${language}`,
      );

      return data;
    },
    ...hookOptions,
  });
};

export default useGetSchemaTranslation;
