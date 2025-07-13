export enum CompanySizeType {
  SAMPLE_SIZE1 = "SAMPLE_SIZE1",
  SAMPLE_SIZE2 = "SAMPLE_SIZE2",
  SAMPLE_SIZE3 = "SAMPLE_SIZE3",
}

export enum CountryType {
  SAMPLE_COUNTRY1 = "SAMPLE_COUNTRY1",
  SAMPLE_COUNTRY2 = "SAMPLE_COUNTRY2",
  SAMPLE_COUNTRY3 = "SAMPLE_COUNTRY3",
}

export enum CompanyAddressType {
  SAMPLE_ADDRESS1 = "sample_street1, sample_apt, sample_postal_code",
  SAMPLE_ADDRESS2 = "sample_street2, sample_apt, sample_postal_code",
  SAMPLE_ADDRESS3 = "sample_street3, sample_apt, sample_postal_code",
}

export type CompanyInformationType = {
  companyLogo: File;
  companyName: string;
  phone: string;
  companyWebsite: string;
  country: string;
  city: string;
  companyAddress: string;
  companyDescriptionAbout: string;
  email: string;
  postalCode: string;
  taxIdentificationNumber: string;
};

export enum NationalityType {
  SAMPLE_NATIONALITY1 = "SAMPLE_NATIONALITY1",
  SAMPLE_NATIONALITY2 = "SAMPLE_NATIONALITY2",
  SAMPLE_NATIONALITY3 = "SAMPLE_NATIONALITY3",
}

export type PersonalDetailsType = {
  avatar: File | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  nationalId: string;
  dateOfBirth: Date | null;
  password: string;
  confirmPassword: string;
  did: string;
  sessionId: string;
};

export type FormDataType = {
  companyInformation: CompanyInformationType;
  personalDetails: PersonalDetailsType;
};
