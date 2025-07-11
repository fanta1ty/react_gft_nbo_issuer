import * as yup from "yup";
import type { ObjectSchema } from "yup";
import type { ValuesType } from "@/api/usePostCertificates";
import i18next from "i18next";

yup.setLocale({
  mixed: {
    required: i18next.t("requiredField"),
  },
});

const schema: ObjectSchema<ValuesType> = yup.object({
  certificateName: yup
    .string()
    .required()
    .max(50, i18next.t("maxErrorMessage", { maxLength: 50 })),
  cid: yup.string().required(),
  certificateDescription: yup
    .string()
    .required()
    .max(300, i18next.t("maxErrorMessage", { maxLength: 300 })),
});

export default schema;
