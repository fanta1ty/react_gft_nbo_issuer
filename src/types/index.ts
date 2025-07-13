import { PHONE_COUNTRIES } from "@/constants";

export type GenderType = "M" | "F";

export type CertificateType = {
  id: string;
  title: string;
  description: string;
};

export type StudentType = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  country: string;
  dateOfBirth: string;
  certificates: CertificateType[];
  email: string;
  city: string;
  phone: string;
  gender: GenderType;
  startDate: string;
  assignedDate?: string;
  score?: number;
};

export enum GenderEnum {
  MALE = "Male",
  FEMALE = "Female",
}

export type CertificateSchemaType = {
  bigInt: string;
  createdAt: string;
  description: string;
  hash: string;
  id: string;
  title: string;
  type: string;
  url: string;
  version: string;
};

export type PhoneCountryKey = keyof typeof PHONE_COUNTRIES;
