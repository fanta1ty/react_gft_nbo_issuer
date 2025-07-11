import getCustomYup from "@/utils/getCustomYup";
import { ValidationError } from "yup";
import { t } from "i18next";
import { SupportedTypeEnum } from ".";

const yup = getCustomYup();

export const UNIQUE_FIELD_NAME_ERROR = "unique-fieldName-error";

const fieldSchema = yup.object().shape({
  fieldName: yup
    .string()
    .matches(/^[a-zA-Z0-9_-]+$/, t("validation_field_name_invalid"))
    .required(),
  type: yup.string().oneOf(Object.values(SupportedTypeEnum)).required(),
  title: yup.string().required(),
  titleAr: yup.string().required(),
  description: yup.string().required(),
  descriptionAr: yup.string().required(),
  isRequired: yup.boolean().required(),
});

const schema = yup.object().shape({
  fields: yup
    .array()
    .of(fieldSchema)
    .required()
    .test(
      UNIQUE_FIELD_NAME_ERROR,
      t("validation_field_name_unique"),
      function (fields) {
        const duplicatedIndexes = findDuplicatedIndexes(fields);
        if (duplicatedIndexes.length <= 0) {
          return true;
        }
        const errors = duplicatedIndexes.map((duplicateIndex) =>
          this.createError({
            path: `fields.${duplicateIndex}.fieldName`,
            message: t("validation_field_name_unique"),
          }),
        );
        return new ValidationError(errors);
      },
    ),
});

const findDuplicatedIndexes = (fields: Array<{ fieldName: string }>) => {
  const duplicatedIndexes: Array<number> = [];
  const fieldNameMap: Record<string, number> = {};

  (fields || []).forEach(({ fieldName }, index) => {
    if (fieldNameMap[fieldName] === undefined) {
      fieldNameMap[fieldName] = index;
    } else {
      duplicatedIndexes.push(fieldNameMap[fieldName], index);
    }
  });

  return [...new Set(duplicatedIndexes)];
};

export default schema;
