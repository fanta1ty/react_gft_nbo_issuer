export type CertificateSectionFormDataType = {
  certificateId: string;
  credentialSubject: Record<string, string | number | boolean>;
  hasLoadCertificateSchema: boolean;
};
