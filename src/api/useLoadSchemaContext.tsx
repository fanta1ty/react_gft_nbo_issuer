import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type NumberFieldType = {
  type: "number" | "integer";
  minimum?: number;
  maximum?: number;
  title: string;
  description: string;
};

export type StringFieldType = {
  type: "string";
  format?: "date" | "email" | "date-time";
  title: string;
  description: string;
};

export type BooleanFieldType = {
  type: "boolean";
  title: string;
  description: string;
  format?: string;
};

export type FieldType = NumberFieldType | StringFieldType | BooleanFieldType;

export type CredentialSubject = {
  title: string;
  description: string;
  required: string[];
  properties: Record<string, FieldType>;
};

type ResponseType = {
  properties: {
    credentialSubject: CredentialSubject;
  };
};

const useLoadSchemaContext = (
  url: string | undefined,
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: [url],
    queryFn: async () => {
      const response = await axios.get(url as string, {
        headers: {
          Authorization: null,
        },
        timeout: 15000,
      });
      const { data } = response;
      return data;
    },
    enabled: !!url,
    retry(failureCount, error) {
      if (error.code === "ECONNABORTED") {
        return false;
      }
      return failureCount < 3;
    },
    ...hookOptions,
  });
};

const skipProperties = [
  "id",
  "image",
  "courseName",
  "nationalId",
  "nationalID",
  "studentName",
  "studentEmail",
];

export const filterUnnecessaryProperties = (
  credentialSubject: CredentialSubject,
) => {
  const { properties } = credentialSubject;
  const newProperties: CredentialSubject["properties"] = {};
  for (const key in properties) {
    if (!skipProperties.includes(key)) {
      newProperties[key] = properties[key];
    }
  }
  return {
    ...credentialSubject,
    properties: newProperties,
  };
};

export default useLoadSchemaContext;
