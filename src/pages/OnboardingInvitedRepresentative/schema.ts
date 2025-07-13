import getCustomYup from "@/utils/getCustomYup";
import { PersonalDetailsType } from "./types";
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

const schema = yup.object({
  personalDetails: personalInfoSchema,
});

export default schema;
