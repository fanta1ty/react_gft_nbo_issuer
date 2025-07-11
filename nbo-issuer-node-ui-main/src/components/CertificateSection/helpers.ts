import type { CredentialSubject, FieldType } from "@/api/useLoadSchemaContext";
import type { TFunction } from "i18next";

// Known fields in a prefer order
const KNOWN_FIELDS = [
  "expirationDate",
  "certificationNumber",
  "startDate",
  "endDate",
  "score",
];

/**
 * Get sorted fields from credentialSubject's properties, prioritizing known fields at the beginning of the list
 * with the predefined order
 */
export function getSortedDynamicFields(
  properties: CredentialSubject["properties"],
) {
  const orderMap = Object.fromEntries(
    KNOWN_FIELDS.map((value, index) => [value, index]),
  );

  const fields = Object.entries(properties);
  fields.sort((fieldA, fieldB) => {
    const fieldNameA = fieldA[0];
    const fieldNameB = fieldB[0];
    const indexA = orderMap[fieldNameA];
    const indexB = orderMap[fieldNameB];

    // If both field names are in KNOWN_FIELDS, sort based on their order
    if (indexA !== undefined && indexB !== undefined) {
      return indexA - indexB;
    }
    // If only one field is in KNOWN_FIELDS, prioritize it
    if (indexA !== undefined) {
      return -1;
    }
    if (indexB !== undefined) {
      return 1;
    }
    // If none of the field are in KNOWN_FIELDS, maintain their relative order
    return 0;
  });

  return fields;
}
export const getTextFieldType = (field: FieldType) => {
  if (field.type === "integer") {
    return "number";
  }
  if (field.type === "string" && field.format === "email") {
    return "email";
  }
  return "text";
};

export const getFieldDefaultValue = (field: FieldType) => {
  if (field.type === "boolean") {
    return false;
  }
  return "";
};

export const getTextFieldLabel = (
  fieldName: string,
  fieldType: FieldType,
  t: TFunction,
) => {
  switch (fieldName) {
    case "expirationDate":
      return t("input_expiration_date");
    case "startDate":
      return t("course_start_date_Lbl");
    case "endDate":
      return t("course_end_date_Lbl");
    case "certificationNumber":
      return t("input_certificateNumberLabel");
    case "score":
      return t("input_scoreLabel");
    case "studentEmail":
      return t("input_emailLabel");
    default: {
      return fieldType.title;
    }
  }
};
