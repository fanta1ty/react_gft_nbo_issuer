import i18next, { t } from "i18next";
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
  confirmEmail: yup
    .string()
    .email()
    .required()
    .oneOf([yup.ref("email")], t("emailMismatch")),
  superAdmin: yup.boolean().required(),
  permissions: yup
    .object()
    .shape({
      myProfile: yup.boolean().default(false),
      myIssuerProfile: yup.boolean().default(false),
      users: yup.boolean().default(false),
      certificates: yup.boolean().default(false),
      batchIssuance: yup.boolean().default(false),
      templateRepository: yup.boolean().default(false),
      accountSettings: yup.boolean().default(false),
      apiKeyManagement: yup.boolean().default(false),
    })
    .when("superAdmin", {
      is: false,
      then: (schema) =>
        schema.test(
          "at-least-one-permission",
          t("validation_at_least_one_permission_required"),
          (permissions) => {
            // Check if at least one permission is selected when role is Representative
            return Object.values(permissions || {}).some(
              (permission) => permission === true,
            );
          },
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export default AddRepresentativeDialogSchema;
