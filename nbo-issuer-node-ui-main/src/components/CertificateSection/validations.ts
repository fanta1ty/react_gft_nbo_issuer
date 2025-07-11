import type {
  FieldType,
  NumberFieldType,
  StringFieldType,
} from "@/api/useLoadSchemaContext";
import getCustomYup from "@/utils/getCustomYup";
import validateSchemaFieldFactory from "@/utils/validateSchemaFieldFactory";
import { CertificateSectionFormDataType } from "./types";
import i18next from "i18next";
import { isValid } from "date-fns";

const yup = getCustomYup();

const staticSchema = yup.object().shape({
  certificateId: yup.string().required(i18next.t("requiredField")),
  credentialSubject: yup.object(),
  hasLoadCertificateSchema: yup.boolean().isTrue(), // prevent the form being submited if the schema is not loaded
});

export const validateStaticField = (
  fieldName: keyof CertificateSectionFormDataType,
) => {
  return validateSchemaFieldFactory(staticSchema, fieldName);
};

export const validateDynamicField = (field: FieldType, isRequired: boolean) => {
  return function (value: unknown) {
    const schema = getDynamicFieldSchema(field, isRequired);

    return schema
      .validate(value)
      .then(() => true)
      .catch((e) => e.message);
  };
};

const getDynamicFieldSchema = (fieldType: FieldType, isRequired: boolean) => {
  if (fieldType.type === "number" || fieldType.type === "integer") {
    return getNumberSchema(fieldType, isRequired);
  }
  if (fieldType.type === "boolean") {
    return getBooleanSchema(isRequired);
  }
  const stringFieldType = fieldType as StringFieldType;
  if (stringFieldType.format === "email") {
    return getEmailSchema(isRequired);
  }
  if (
    stringFieldType.format === "date" ||
    stringFieldType.format === "date-time"
  ) {
    return getDateSchema(isRequired);
  }
  return getStringSchema(isRequired);
};

const getBooleanSchema = (isRequired: boolean) => {
  let schema = yup.boolean();
  if (isRequired) {
    schema = schema.required();
  }
  return schema;
};

const getStringSchema = (isRequired: boolean) => {
  let schema = yup.string();
  if (isRequired) {
    schema = schema.required();
  }
  return schema;
};

const getNumberSchema = (fieldType: NumberFieldType, isRequired: boolean) => {
  let schema = yup
    .number()
    .transform((currentValue, originalValue) => {
      return originalValue === "" ? null : currentValue;
    })
    .nullable();

  if (fieldType.type === "integer") {
    schema = schema.integer();
  }

  if (fieldType.minimum !== undefined) {
    schema = schema.min(
      fieldType.minimum,
      i18next.t("minimumError", { minimum: fieldType.minimum }),
    );
  }
  if (fieldType.maximum !== undefined) {
    schema = schema.max(
      fieldType.maximum,
      i18next.t("maximumError", { maximum: fieldType.maximum }),
    );
  }
  if (isRequired) {
    schema = schema.required();
  } else {
    schema = schema.optional();
  }

  return schema;
};

const getDateSchema = (isRequired: boolean) => {
  let schema = yup
    .string() // use string() instead of date() because the form value is a string, not a Date object
    .test("is-valid-date", i18next.t("invalidDate"), (value) => {
      if (value && value !== "") {
        return isValid(new Date(value));
      }
      return true;
    });

  if (isRequired) {
    schema = schema.required();
  }
  return schema;
};

const getEmailSchema = (isRequired: boolean) => {
  let schema = yup.string().email();
  if (isRequired) {
    schema = schema.required();
  }
  return schema;
};
