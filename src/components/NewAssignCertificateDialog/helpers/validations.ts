import getCustomYup from "@/utils/getCustomYup";
import { type CertificateSectionFormDataType } from "@/components/CertificateSection";
import validateSchemaFieldFactory from "@/utils/validateSchemaFieldFactory";
const yup = getCustomYup();

export type CandidateSectionFormType = {
  nationalId: string;
  firstName: string;
  lastName: string;
  hasAchievedCertificate: boolean;
};

export type FormDataType = CertificateSectionFormDataType &
  CandidateSectionFormType;

const staticSchema = yup.object().shape({
  nationalId: yup.string().nationalId().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  hasAchievedCertificate: yup.boolean().isFalse(),
});

export const validateStaticField = (
  fieldName: keyof CandidateSectionFormType,
) => {
  return validateSchemaFieldFactory(staticSchema, fieldName);
};
