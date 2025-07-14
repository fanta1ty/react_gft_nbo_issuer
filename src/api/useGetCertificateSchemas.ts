import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";
import { CertificateSchemaType } from "@/types";

const mockCertificateSchemasResponse: CertificateSchemaType[] = [
  {
    id: "schema_001",
    hash: "0xabc123def456789012345678901234567890abcdef123456789012345678901234",
    bigInt: "12345678901234567890123456789012345678901234567890123456789012345678",
    url: "https://schemas.example.com/academic-degree/v1.0",
    type: "JsonSchema",
    createdAt: "2023-01-15T10:30:00.000Z",
    title: "Academic Degree Certificate",
    description: "Schema for academic degree certificates including bachelor's, master's, and doctoral degrees with comprehensive student information",
    version: "1.0",
  },
  {
    id: "schema_002",
    hash: "0xdef456abc789012345678901234567890abcdef123456789012345678901234567",
    bigInt:
      "23456789012345678901234567890123456789012345678901234567890123456789",
    url: "https://schemas.example.com/professional-cert/v2.1",
    type: "JsonSchema",
    createdAt: "2023-02-20T09:15:00.000Z",
    title: "Professional Certification",
    description:
      "Schema for professional certifications from technology companies and training providers including AWS, Microsoft, Google, and Cisco certifications",
    version: "2.1",
  },
  {
    id: "schema_003",
    hash: "0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012",
    bigInt:
      "34567890123456789012345678901234567890123456789012345678901234567890",
    url: "https://schemas.example.com/skill-assessment/v1.5",
    type: "JsonSchema",
    createdAt: "2023-03-10T11:45:00.000Z",
    title: "Skill Assessment Certificate",
    description:
      "Schema for skill-based assessments and competency evaluations covering programming, data analysis, design, and project management skills",
    version: "1.5",
  },
  {
    id: "schema_004",
    hash: "0x456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012345",
    bigInt:
      "45678901234567890123456789012345678901234567890123456789012345678901",
    url: "https://schemas.example.com/employment/v1.2",
    type: "JsonSchema",
    createdAt: "2023-04-05T14:20:00.000Z",
    title: "Employment Record",
    description:
      "Schema for employment records and work experience verification including position details, employment duration, and performance metrics",
    version: "1.2",
  },
  {
    id: "schema_005",
    hash: "0x789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    bigInt:
      "56789012345678901234567890123456789012345678901234567890123456789012",
    url: "https://schemas.example.com/training/v2.0",
    type: "JsonSchema",
    createdAt: "2023-05-12T16:00:00.000Z",
    title: "Training Completion Certificate",
    description:
      "Schema for training course completion certificates and workshops from platforms like Udemy, Coursera, and edX",
    version: "2.0",
  },
  {
    id: "schema_006",
    hash: "0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abc",
    bigInt:
      "67890123456789012345678901234567890123456789012345678901234567890123",
    url: "https://schemas.example.com/license/v1.3",
    type: "JsonSchema",
    createdAt: "2023-07-22T15:45:00.000Z",
    title: "Professional License",
    description:
      "Schema for professional licenses and regulatory certifications including medical, legal, engineering, and driving licenses",
    version: "1.3",
  },
  {
    id: "schema_007",
    hash: "0xcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    bigInt:
      "78901234567890123456789012345678901234567890123456789012345678901234",
    url: "https://schemas.example.com/health-certificate/v1.1",
    type: "JsonSchema",
    createdAt: "2023-06-18T12:30:00.000Z",
    title: "Health Certificate",
    description:
      "Schema for health-related certifications and medical clearances including vaccination records and fitness certifications",
    version: "1.1",
  },
  {
    id: "schema_008",
    hash: "0xef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
    bigInt:
      "89012345678901234567890123456789012345678901234567890123456789012345",
    url: "https://schemas.example.com/vendor-certification/v2.3",
    type: "JsonSchema",
    createdAt: "2023-08-14T10:20:00.000Z",
    title: "Vendor Certification",
    description:
      "Schema for vendor-specific certifications from companies like Adobe, Salesforce, Oracle, and SAP",
    version: "2.3",
  },
  {
    id: "schema_009",
    hash: "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123",
    bigInt:
      "90123456789012345678901234567890123456789012345678901234567890123456",
    url: "https://schemas.example.com/language-proficiency/v1.4",
    type: "JsonSchema",
    createdAt: "2023-09-25T14:15:00.000Z",
    title: "Language Proficiency Certificate",
    description:
      "Schema for language proficiency certificates including TOEFL, IELTS, and other language assessment certifications",
    version: "1.4",
  },
  {
    id: "schema_010",
    hash: "0x23456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012345",
    bigInt:
      "01234567890123456789012345678901234567890123456789012345678901234567",
    url: "https://schemas.example.com/project-completion/v1.0",
    type: "JsonSchema",
    createdAt: "2023-10-30T16:45:00.000Z",
    title: "Project Completion Certificate",
    description:
      "Schema for project completion certificates documenting successful project delivery and achievement milestones",
    version: "1.0",
  },
];

const useGetCertificateSchemas = (
  hookOptions?: UseQueryOptions<CertificateSchemaType[], AxiosError>,
) => {
  return useQuery<CertificateSchemaType[], AxiosError>({
    queryKey: ["schemas"],
    queryFn: async () => {
      // const { data } = await apiService().get("/v1/schemas");

      // return data;
      return mockCertificateSchemasResponse;
    },
    ...hookOptions,
  });
};

export default useGetCertificateSchemas;
