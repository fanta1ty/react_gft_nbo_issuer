import i18next from "i18next";
import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: i18next.t("required"),
  },
});

const AddRepresentativeDialogSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  superAdmin: yup.boolean().required(),
});

export default AddRepresentativeDialogSchema;
