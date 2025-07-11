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
  personalDetails: PersonalDetailsType;
};
