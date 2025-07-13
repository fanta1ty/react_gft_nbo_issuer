import { isValid } from "date-fns";
import i18next from "i18next";
import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: i18next.t("required"),
  },
});

const schema = yup.object().shape({
  userId: yup.string().required(),
  certificateId: yup.string().required(),
  startDate: yup
    .date()
    .typeError(i18next.t("validations_invalidDate"))
    .required(),
  endDate: yup
    .date()
    .typeError("Invalid date")
    .required()
    .when(["startDate"], ([startDate], schema) => {
      if (isValid(startDate)) {
        return schema.min(startDate, i18next.t("laterThanStartDate"));
      }
      return schema;
    }),
  score: yup
    .number()
    .transform((currentValue, originalValue) => {
      return originalValue === "" ? null : currentValue;
    })
    .nullable()
    .required(i18next.t("requiredNumber"))
    .min(0, i18next.t("betweenRange", { min: 0, max: 100 }))
    .max(100, i18next.t("betweenRange", { min: 0, max: 100 })),
});

export default schema;
