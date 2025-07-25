import getCustomYup from "@/utils/getCustomYup";
import { PersonalDetailsType, CompanyInformationType } from "./types";
import { t } from "i18next";
import { PHONE_COUNTRIES } from "@/constants";
import { type TestContext } from "yup";
const yup = getCustomYup();

const LIMIT_AVATAR_SIZE_IN_MB = 2;

function createPhoneValidationTest() {
  return (value: string, context: TestContext) => {
    const isJustCountryCode = Object.values(PHONE_COUNTRIES).some(
      (country) => value === country.code,
    );
    if (isJustCountryCode) {
      return context.createError({
        message: t("required"),
      });
    }
    const country = Object.values(PHONE_COUNTRIES).find((country) =>
      value.startsWith(country.code),
    );
    if (!country) {
      return false;
    }
    const digitsOnly = value.substring(country.code.length).replace(/\D/g, "");
    if (digitsOnly.length !== country.amount) {
      return context.createError({
        message: t("invalidPhone", { amount: country.amount }),
      });
    }

    return true;
  };
}

function extractDomainFromEmail(email: string): string {
  return email.split("@")[1]?.toLowerCase() || "";
}

function normalizeDomain(domain: string): string {
  return domain
    .toLowerCase()
    .replace(/^@/, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "")
    .trim();
}

export const personalInfoSchema = yup.object<PersonalDetailsType>().shape({
  profilePicture: yup
    .mixed<File>()
    .nullable()
    .test(
      "fileSize",
      t("documentFileSize", { size: LIMIT_AVATAR_SIZE_IN_MB }),
      (file) => !file || file.size < LIMIT_AVATAR_SIZE_IN_MB * 1024 * 1024,
    )
    .test("fileType", t("invalidImageFile"), (file) => {
      return !file || file.type.includes("image");
    }),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup
    .string()
    .required()
    .test("valid-phone-format", createPhoneValidationTest()),
  dateOfBirth: yup.date().required(),
  nationality: yup.string().required(),
  nationalId: yup.string().required(),
  email: yup.string().email().required(),
  confirmEmail: yup
    .string()
    .email()
    .required()
    .oneOf([yup.ref("email")], t("emailMismatch")),
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one letter, one number, and one special character (@$!%*?&)",
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], t("passwordsMismatch")),
});

export const companyInfoSchema = yup.object<CompanyInformationType>().shape({
  companyLogo: yup
    .mixed<File>()
    .test(
      "fileSize",
      t("documentFileSize", { size: LIMIT_AVATAR_SIZE_IN_MB }),
      (file) => (file?.size ?? 0) < LIMIT_AVATAR_SIZE_IN_MB * 1024 * 1024,
    )
    .test("fileType", t("invalidImageFile"), (file) => {
      return file?.type.includes("image");
    }),
  legalName: yup.string().required(),
  legalNameArabic: yup.string().required(),
  registrationNumber: yup.string().required(),
  registrationAuthority: yup.string().required(),
  vatNumber: yup.string().required(),
  website: yup.string().url(),
  corporateDomainName: yup.string(),
  salesTaxGroup: yup.string(),
  currency: yup.string(),
  methodOfPayment: yup.string(),
  ownership: yup.string(),
  poBox: yup.string(),
  postalCode: yup.string(),
  street: yup.string(),
  district: yup.string(),
  city: yup.string(),
  country: yup.string(),
  telephoneNumber: yup.string(),
  email: yup.string().email(),
  bankName: yup.string(),
  branch: yup.string(),
  bankAddress: yup.string(),
  accountName: yup.string(),
  accountNumber: yup.string(),
  ibanNumber: yup.string(),
  description: yup.string(),
});

const schema = yup
  .object({
    personalDetails: personalInfoSchema,
    companyInformation: companyInfoSchema,
  })
  .test(
    "email-domain-match",
    "Email domain must match corporate domain",
    function (values) {
      const email = values?.personalDetails?.email;
      const corporateDomain = values?.companyInformation?.corporateDomainName;

      // Skip validation if either field is empty
      if (!email || !corporateDomain || corporateDomain === "@") {
        return true;
      }

      const emailDomain = extractDomainFromEmail(email);
      const normalizedCorporateDomain = normalizeDomain(corporateDomain);
      console.log("emailDomain: ", emailDomain);
      console.log("normalizedCorporateDomain: ", normalizedCorporateDomain);
      if (emailDomain !== normalizedCorporateDomain) {
        return this.createError({
          path: "personalDetails.email",
          message: t(
            "onboarding_issuer_information_email_domain_mismatch_Lbl",
            {
              domain: normalizedCorporateDomain,
            },
          ),
        });
      }

      return true;
    },
  );

export default schema;
