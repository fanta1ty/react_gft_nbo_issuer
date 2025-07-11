import * as yup from "yup";

export const schema = yup.object().shape({
  templateName: yup.string().required(),
  description: yup.string().required(),
});
