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
  legalName: string;
  legalNameArabic: string;
  registrationNumber: string;
  registrationAuthority: string;
  vatNumber: string;
  website: string;
  corporateDomainName: string;
  salesTaxGroup: string;
  currency: string;
  methodOfPayment: string;
  ownership: string;
  poBox: string;
  postalCode: string;
  street: string;
  district: string;
  city: string;
  country: string;
  telephoneNumber: string;
  email: string;
  bankName: string;
  branch: string;
  bankAddress: string;
  accountName: string;
  accountNumber: string;
  ibanNumber: string;
  description: string;
};

export enum NationalityType {
  SAMPLE_NATIONALITY1 = "SAMPLE_NATIONALITY1",
  SAMPLE_NATIONALITY2 = "SAMPLE_NATIONALITY2",
  SAMPLE_NATIONALITY3 = "SAMPLE_NATIONALITY3",
}

export type PersonalDetailsType = {
  profilePicture: File | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  nationality: string;
  nationalId: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

export type FormDataType = {
  companyInformation: CompanyInformationType;
  personalDetails: PersonalDetailsType;
};
