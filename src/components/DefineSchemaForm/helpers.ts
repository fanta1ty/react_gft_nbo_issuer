import { SchemaFieldType, SchemaType } from "@/@types";
import { FormDataType, SupportedTypeEnum } from "./types";

export const formValuesToSchemaFields = ({ fields }: FormDataType) => {
  const schemaFields: Array<SchemaFieldType> = fields.map((field) => {
    const typeFormat = getTypeAndFormat(field.type);

    return {
      key: field.fieldName,
      title: field.title,
      required: field.isRequired,
      description: field.description,
      titleAr: field.titleAr,
      descriptionAr: field.descriptionAr,
      ...typeFormat,
    };
  });
  return schemaFields;
};

export const schemaFieldsToFormValues = (
  schemaFields: Array<SchemaFieldType>,
) => {
  const fields = schemaFields.map((schemaField) => ({
    fieldName: schemaField.key,
    type: getFormFieldType(schemaField),
    title: schemaField.title,
    description: schemaField.description,
    titleAr: schemaField.titleAr,
    descriptionAr: schemaField.descriptionAr,
    isRequired: schemaField.required,
  }));
  return { fields };
};

const getTypeAndFormat = (formType: SupportedTypeEnum) => {
  switch (formType) {
    case SupportedTypeEnum.STRING:
      return { type: "string" };
    case SupportedTypeEnum.DATE:
      return { type: "string", format: "date" };
    case SupportedTypeEnum.DATE_TIME:
      return { type: "string", format: "date-time" };
    case SupportedTypeEnum.NUMBER:
      return { type: "number", minimum: 0, maximum: 100 };
    case SupportedTypeEnum.INTEGER:
      return { type: "integer", minimum: 0, maximum: 100 };
    case SupportedTypeEnum.BOOLEAN:
      return { type: "boolean" };
    default: {
      return { type: "string" };
    }
  }
};

const getFormFieldType = ({
  type,
  format,
}: Pick<SchemaFieldType, "type" | "format">) => {
  if (type === "integer") {
    return SupportedTypeEnum.INTEGER;
  } else if (type === "number") {
    return SupportedTypeEnum.NUMBER;
  } else if (type === "boolean") {
    return SupportedTypeEnum.BOOLEAN;
  } else if (type === "string" && format === "date") {
    return SupportedTypeEnum.DATE;
  } else if (type === "string" && format === "date-time") {
    return SupportedTypeEnum.DATE_TIME;
  } else {
    return SupportedTypeEnum.STRING;
  }
};

export const createDefaultValues = (schema: SchemaType) => {
  const hasSchemaFields = schema.schemaFields && schema.schemaFields.length > 0;
  const defaultValues = hasSchemaFields
    ? schemaFieldsToFormValues(schema.schemaFields)
    : {
        fields: [
          {
            fieldName: "field1",
            type: SupportedTypeEnum.STRING,
            title: "",
            description: "",
            titleAr: "",
            descriptionAr: "",
            isRequired: false,
          },
        ],
      };

  return defaultValues;
};
