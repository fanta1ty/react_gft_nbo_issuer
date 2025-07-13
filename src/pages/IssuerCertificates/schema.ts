import i18next from "i18next";
import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: i18next.t("validations_required"),
  },
});

const schema = yup.object().shape({
  file: yup.mixed<File>().required(),
});

export default schema;
