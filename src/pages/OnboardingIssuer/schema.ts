import getCustomYup from "@/utils/getCustomYup";
import { PersonalDetailsType, CompanyInformationType } from "./types";
import { t } from "i18next";
import { PHONE_COUNTRIES } from "@/constants";
import { type TestContext } from "yup";
const yup = getCustomYup();

const LIMIT_AVATAR_SIZE_IN_MB = 2;
const LIMIT_DOCUMENT_SIZE_IN_MB = 5;

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

export const personalInfoSchema = yup.object<PersonalDetailsType>().shape({
  avatar: yup
    .mixed<File>()
    .required(t("uploadAvatar"))
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
  email: yup.string().email().required(),
  phone: yup
    .string()
    .required()
    .test("valid-phone-format", createPhoneValidationTest()),
  nationality: yup.string().required(),
  nationalId: yup.string().required(),
  dateOfBirth: yup.date().required().nullable(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], t("passwordsMismatch")),
  did: yup.string().required(),
  sessionId: yup.string().required(),
});

export const companyInfoSchema = yup.object<CompanyInformationType>().shape({
  companyLogo: yup
    .mixed<File>()
    .required(t("uploadAvatar"))
    .test(
      "fileSize",
      t("documentFileSize", { size: LIMIT_AVATAR_SIZE_IN_MB }),
      (file) => file.size < LIMIT_AVATAR_SIZE_IN_MB * 1024 * 1024,
    )
    .test("fileType", t("invalidImageFile"), (file) => {
      return file.type.includes("image");
    }),
  companyName: yup.string().required(),
  phone: yup
    .string()
    .required()
    .test("valid-phone-format", createPhoneValidationTest()),
  confirmPhone: yup
    .string()
    .required()
    .oneOf([yup.ref("phone")], t("phoneMismatch"))
    .test("valid-phone-format", createPhoneValidationTest()),
  companyWebsite: yup.string().url().required(),
  country: yup.string().required(),
  city: yup.string().required(),
  companyAddress: yup.string().required(),
  companyDescriptionAbout: yup.string().required(),
  email: yup.string().email().required(),
  confirmEmail: yup
    .string()
    .email()
    .required()
    .oneOf([yup.ref("email")], t("emailMismatch")),
  postalCode: yup.string().required(),
  taxIdentificationNumber: yup.string().required(),
});

export const documentsSchema = yup.object().shape({
  ministerOfEducation: yup
    .mixed<File>()
    .required(t("fileRequired"))
    .test(
      "fileSize",
      t("documentFileSize", { size: LIMIT_DOCUMENT_SIZE_IN_MB }),
      (file) => file.size < LIMIT_DOCUMENT_SIZE_IN_MB * 1024 * 1000,
    ),
  other: yup
    .mixed<File>()
    .optional()
    .test(
      "fileSize",
      t("documentFileSize", { size: LIMIT_DOCUMENT_SIZE_IN_MB }),
      (file) => (file?.size ?? 0) < LIMIT_DOCUMENT_SIZE_IN_MB * 1024 * 1000,
    ),
});

const schema = yup.object({
  personalDetails: personalInfoSchema,
  companyInformation: companyInfoSchema,
  documents: documentsSchema,
});

export default schema;
