export enum Status {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DEACTIVATED = "DEACTIVATED",
  PENDING = "PENDING",
  BLACKLISTED = "BLACKLISTED",
}

export type IssuerType = {
  id: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  about: string;
  companyWebsite: string;
  city: string;
  companyAddress: string;
  companyDescription: string;
  companyLogo: string;
  issuerIp: string;
  postalCode: string;
  taxIdentificationNumber: string;
  status: Status;
  did: string;
  legalName: string;
};

export type HolderType = {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  createdAt: string;
  city: string;
  country: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  type: "HOLDER";
  status: "PENDING" | "ACTIVE" | "BLACKLISTED";
};

export type EmployerType = {
  id: string;
  city: string;
  companyAddress: string;
  companyDescription: string;
  companyName: string;
  companyWebsite: string;
  country: string;
  email: string;
  issuerIp: string;
  phone: string;
  postalCode: string;
  status: Status;
  did: string;
  taxIdentificationNumber: string;
};

export type CertificateType = {
  id: string;
  title: string;
  description: string;
};

export type GenderType = "M" | "F";

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

export type RepresentativeType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  nationalId: string;
  dateOfBirth: Date | null;
  password: string;
  avatar: string;
  gender: GenderType;
  city: string;
};

export type OnboardsType = {
  companyName: string;
  email: string;
  phone: string;
  issuerIp: string;
  country: string;
  city: string;
  companyAddress: string;
  postalCode: string;
  taxIdentificationNumber: string;
  companyLogo: string;
  companyWebsite: string;
  companyDescription: string;
  reason: string;
  action: string;
  status: Status;
  representatives: RepresentativeType[];
  legalName: string;
};

export type SchemaFieldType = {
  key: string;
  description: string;
  title: string;
  type: string;
  format?: string;
  pattern?: string;
  minimum?: number;
  descriptionAr: string;
  titleAr: string;
  required: boolean;
};

export type TemplateIssuer = {
  companyLogo: string;
  companyName: string;
  id: string;
  legalName: string;
};

export type SchemaType = {
  jsonLdCid: string;
  vocabCid: string;
  jsonSchemaCid: string;
  schemaType: string;
  templateUrl: string;
  createdAt: string;
  modifiedAt: string;
  schemaId: string;
  issuers: TemplateIssuer[];
  schemaFields: SchemaFieldType[];
  status: Status;
  description: string;
};

export type Schema = {
  id: string;
  hash: string;
  bigInt: string;
  url: string;
  type: string;
  createdAt: string;
  title: string;
  description: string;
  version: string;
};
