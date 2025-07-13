import { PHONE_COUNTRIES } from "@/constants";

export const getCountryCode = (phone: string) => {
  if (!phone) return null;
  const processedPhone = phone.replace(/\s+/g, "");
  let countryCode = null;

  Object.entries(PHONE_COUNTRIES).forEach(([countryKey, country]) => {
    const { code, longAmount } = country;
    if (
      processedPhone.startsWith(code) &&
      processedPhone.length === longAmount
    ) {
      countryCode = countryKey;
    }
  });
  return countryCode;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  if (
    phoneNumber &&
    phoneNumber.startsWith("+48") &&
    phoneNumber.length === 12
  ) {
    return `${phoneNumber.substring(0, 3)} ${phoneNumber.substring(
      3,
      6,
    )} ${phoneNumber.substring(6, 9)} ${phoneNumber.substring(9, 12)}`;
  } else if (
    phoneNumber &&
    phoneNumber.startsWith("+966") &&
    phoneNumber.length === 11
  ) {
    return `${phoneNumber.substring(0, 4)} ${phoneNumber.substring(
      4,
      7,
    )} ${phoneNumber.substring(7, 11)}`;
  } else {
    return phoneNumber;
  }
};
