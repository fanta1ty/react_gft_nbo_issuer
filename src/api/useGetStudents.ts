import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { type GenderType } from "@/types";
import apiService from "./apiService";
import {
  type CertificateType,
  type UserCredentialType,
} from "./useGetCertificates";

export type StudentCertificateType = Omit<
  CertificateType,
  "userCredentials"
> & {
  userCredentials: Pick<UserCredentialType, "credential">[];
};

export type StudentType = {
  avatar: string;
  certificates: StudentCertificateType[];
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: GenderType;
  id: string;
  isAdmin: boolean;
  lastName: string;
  nationalId: string;
  password: string;
  phone: string;
  userDid: string;
};

export type ResponseType = StudentType[] | undefined;

const mockApiResponse: StudentType[] = [
  {
    id: "usr_001",
    firstName: "Alice",
    lastName: "Cooper",
    email: "alice.cooper@university.edu",
    phone: "+1-555-0001",
    dateOfBirth: "1999-01-15",
    gender: "F",
    city: "Boston",
    country: "United States",
    nationalId: "111-22-3333",
    password: "$2b$10$hashedpassword001",
    isAdmin: false,
    avatar: "https://i.pravatar.cc/150?u=alice.cooper",
    userDid: "did:eth:0x1234567890abcdef1234567890abcdef12345678",
    createdAt: "2023-09-01T08:30:00.000Z",
    certificates: [
      {
        bigInt: "12345678901234567890",
        createdAt: "2023-05-15T14:00:00.000Z",
        description: "Bachelor of Science in Computer Science with honors",
        hash: "0xabc123def456789012345678901234567890abcdef",
        id: "cert_001",
        title: "Computer Science Bachelor's Degree",
        type: "academic_degree",
        url: "https://certificates.mit.edu/verify/cert_001",
        version: "1.0",
        userCredentials: [
          {
            credential: {
              createdAt: "2023-05-15T14:00:00.000Z",
              credentialSubject: {
                endDate: "2023-05-15T00:00:00.000Z",
                score: 95,
                startDate: "2019-09-01T00:00:00.000Z",
                type: "BachelorDegree",
                image: "https://certificates.mit.edu/images/cs_degree.jpg",
                courseName: "Computer Science",
                expirationDate: "2030-05-15T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2030-05-15T00:00:00.000Z",
              id: "cred_001",
              proofTypes: ["BbsBlsSignature2020"],
              revNonce: 123456,
              revoked: false,
              schemaHash: "0xabc123def456789012345678901234567890abcdef",
              schemaType: "AcademicDegree",
              schemaUrl: "https://schemas.example.com/academic-degree/v1.0",
              userID: "usr_001",
              status: "active",
            },
          },
          {
            credential: {
              createdAt: "2023-05-15T14:00:00.000Z",
              credentialSubject: {
                endDate: "2023-05-15T00:00:00.000Z",
                score: 92,
                startDate: "2019-09-01T00:00:00.000Z",
                type: "Transcript",
                image: "https://certificates.mit.edu/images/transcript.jpg",
                courseName: "Computer Science - Official Transcript",
                expirationDate: "2030-05-15T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2030-05-15T00:00:00.000Z",
              id: "cred_002",
              proofTypes: ["BbsBlsSignature2020"],
              revNonce: 123457,
              revoked: false,
              schemaHash: "0xdef456abc789012345678901234567890abcdef123",
              schemaType: "AcademicTranscript",
              schemaUrl: "https://schemas.example.com/academic-transcript/v1.0",
              userID: "usr_001",
              status: "active",
            },
          },
        ],
      },
      {
        bigInt: "23456789012345678901",
        createdAt: "2023-08-20T10:15:00.000Z",
        description: "Amazon Web Services Cloud Practitioner Certification",
        hash: "0xdef456abc789012345678901234567890abcdef123",
        id: "cert_002",
        title: "AWS Cloud Practitioner",
        type: "professional_certification",
        url: "https://certificates.aws.amazon.com/verify/cert_002",
        version: "1.2",
        userCredentials: [
          {
            credential: {
              createdAt: "2023-08-20T10:15:00.000Z",
              credentialSubject: {
                endDate: "2023-08-20T00:00:00.000Z",
                score: 88,
                startDate: "2023-07-01T00:00:00.000Z",
                type: "ProfessionalCertification",
                image:
                  "https://certificates.aws.amazon.com/images/cloud_practitioner.jpg",
                courseName: "AWS Cloud Practitioner",
                expirationDate: "2026-08-20T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2026-08-20T00:00:00.000Z",
              id: "cred_003",
              proofTypes: ["Ed25519Signature2018"],
              revNonce: 234567,
              revoked: false,
              schemaHash: "0xghi789def012345678901234567890abcdef456",
              schemaType: "ProfessionalCertification",
              schemaUrl: "https://schemas.example.com/professional-cert/v1.2",
              userID: "usr_001",
              status: "active",
            },
          },
        ],
      },
    ],
  },
  {
    id: "usr_002",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@techcorp.com",
    phone: "+1-555-0002",
    dateOfBirth: "1997-06-22",
    gender: "M",
    city: "San Francisco",
    country: "United States",
    nationalId: "222-33-4444",
    password: "$2b$10$hashedpassword002",
    isAdmin: true,
    avatar: "https://i.pravatar.cc/150?u=bob.johnson",
    userDid: "did:eth:0x2345678901bcdef12345678901bcdef123456789",
    createdAt: "2023-08-15T09:45:00.000Z",
    certificates: [
      {
        bigInt: "34567890123456789012",
        createdAt: "2023-12-10T16:30:00.000Z",
        description: "Master of Engineering in Software Engineering",
        hash: "0x123456789abcdef0123456789abcdef0123456789a",
        id: "cert_003",
        title: "Master of Engineering",
        type: "graduate_degree",
        url: "https://certificates.stanford.edu/verify/cert_003",
        version: "1.0",
        userCredentials: [
          {
            credential: {
              createdAt: "2023-12-10T16:30:00.000Z",
              credentialSubject: {
                endDate: "2023-12-10T00:00:00.000Z",
                score: 97,
                startDate: "2021-09-01T00:00:00.000Z",
                type: "MastersDegree",
                image:
                  "https://certificates.stanford.edu/images/masters_engineering.jpg",
                courseName: "Master of Engineering - Software Engineering",
                expirationDate: "2033-12-10T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2033-12-10T00:00:00.000Z",
              id: "cred_004",
              proofTypes: ["BbsBlsSignature2020"],
              revNonce: 345678,
              revoked: false,
              schemaHash: "0xjkl012ghi345678901234567890abcdef789",
              schemaType: "GraduateDegree",
              schemaUrl: "https://schemas.example.com/graduate-degree/v1.0",
              userID: "usr_002",
              status: "active",
            },
          },
          {
            credential: {
              createdAt: "2023-12-10T16:30:00.000Z",
              credentialSubject: {
                endDate: "2023-12-10T00:00:00.000Z",
                score: 94,
                startDate: "2022-09-01T00:00:00.000Z",
                type: "ThesisCompletion",
                image:
                  "https://certificates.stanford.edu/images/thesis_completion.jpg",
                courseName:
                  "Software Engineering Thesis - AI in Distributed Systems",
                expirationDate: "2033-12-10T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2033-12-10T00:00:00.000Z",
              id: "cred_005",
              proofTypes: ["BbsBlsSignature2020"],
              revNonce: 345679,
              revoked: false,
              schemaHash: "0xmno345jkl678901234567890abcdef012",
              schemaType: "ThesisVerification",
              schemaUrl: "https://schemas.example.com/thesis-verification/v1.0",
              userID: "usr_002",
              status: "active",
            },
          },
        ],
      },
    ],
  },
  {
    id: "usr_003",
    firstName: "Carol",
    lastName: "Smith",
    email: "carol.smith@design.agency",
    phone: "+1-555-0003",
    dateOfBirth: "1998-11-03",
    gender: "F",
    city: "New York",
    country: "United States",
    nationalId: "333-44-5555",
    password: "$2b$10$hashedpassword003",
    isAdmin: false,
    avatar: "https://i.pravatar.cc/150?u=carol.smith",
    userDid: "did:eth:0x3456789012cdef123456789012cdef1234567890",
    createdAt: "2023-07-20T11:20:00.000Z",
    certificates: [
      {
        bigInt: "45678901234567890123",
        createdAt: "2023-09-05T13:45:00.000Z",
        description:
          "Professional Certificate in User Experience and Interface Design",
        hash: "0x456789abcdef0123456789abcdef0123456789abc",
        id: "cert_004",
        title: "UX/UI Design Certificate",
        type: "professional_certification",
        url: "https://certificates.google.com/verify/cert_004",
        version: "2.1",
        userCredentials: [
          {
            credential: {
              createdAt: "2023-09-05T13:45:00.000Z",
              credentialSubject: {
                endDate: "2023-09-05T00:00:00.000Z",
                score: 91,
                startDate: "2023-06-01T00:00:00.000Z",
                type: "ProfessionalCertification",
                image: "https://certificates.google.com/images/ux_design.jpg",
                courseName: "UX/UI Design Professional Certificate",
                expirationDate: "2025-09-05T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2025-09-05T00:00:00.000Z",
              id: "cred_006",
              proofTypes: ["Ed25519Signature2018"],
              revNonce: 456789,
              revoked: false,
              schemaHash: "0xpqr678mno901234567890abcdef345",
              schemaType: "ProfessionalCertification",
              schemaUrl: "https://schemas.example.com/professional-cert/v2.1",
              userID: "usr_003",
              status: "active",
            },
          },
        ],
      },
      {
        bigInt: "56789012345678901234",
        createdAt: "2023-07-30T15:10:00.000Z",
        description: "Adobe Certified Expert in Creative Suite",
        hash: "0x789abcdef0123456789abcdef0123456789abcdef",
        id: "cert_005",
        title: "Adobe Creative Suite Expert",
        type: "vendor_certification",
        url: "https://certificates.adobe.com/verify/cert_005",
        version: "1.5",
        userCredentials: [
          {
            credential: {
              createdAt: "2023-07-30T15:10:00.000Z",
              credentialSubject: {
                endDate: "2023-07-30T00:00:00.000Z",
                score: 89,
                startDate: "2023-05-15T00:00:00.000Z",
                type: "VendorCertification",
                image:
                  "https://certificates.adobe.com/images/creative_suite.jpg",
                courseName: "Adobe Creative Suite Expert Certification",
                expirationDate: "2025-07-30T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2025-07-30T00:00:00.000Z",
              id: "cred_007",
              proofTypes: ["RsaSignature2018"],
              revNonce: 567890,
              revoked: false,
              schemaHash: "0xstu901pqr234567890abcdef678",
              schemaType: "VendorCertification",
              schemaUrl: "https://schemas.example.com/vendor-cert/v1.5",
              userID: "usr_003",
              status: "active",
            },
          },
        ],
      },
    ],
  },
  {
    id: "usr_004",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@startup.io",
    phone: "+1-555-0004",
    dateOfBirth: "1995-04-18",
    gender: "M",
    city: "Austin",
    country: "United States",
    nationalId: "444-55-6666",
    password: "$2b$10$hashedpassword004",
    isAdmin: false,
    avatar: "https://i.pravatar.cc/150?u=david.brown",
    userDid: "did:eth:0x456789013def1234567890123def12345678901",
    createdAt: "2023-06-10T12:00:00.000Z",
    certificates: [],
  },
  {
    id: "usr_005",
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@datalab.com",
    phone: "+1-555-0005",
    dateOfBirth: "1996-09-25",
    gender: "F",
    city: "Seattle",
    country: "United States",
    nationalId: "555-66-7777",
    password: "$2b$10$hashedpassword005",
    isAdmin: true,
    avatar: "https://i.pravatar.cc/150?u=emma.wilson",
    userDid: "did:eth:0x56789014ef123456789014ef1234567890145",
    createdAt: "2023-05-25T14:30:00.000Z",
    certificates: [
      {
        bigInt: "67890123456789012345",
        createdAt: "2023-10-12T11:25:00.000Z",
        description: "IBM Data Science Professional Certificate",
        hash: "0x9abcdef0123456789abcdef0123456789abcdef01",
        id: "cert_006",
        title: "Data Science Professional Certificate",
        type: "professional_certification",
        url: "https://certificates.ibm.com/verify/cert_006",
        version: "3.0",
        userCredentials: [
          {
            credential: {
              createdAt: "2023-10-12T11:25:00.000Z",
              credentialSubject: {
                endDate: "2023-10-12T00:00:00.000Z",
                score: 93,
                startDate: "2023-07-01T00:00:00.000Z",
                type: "ProfessionalCertification",
                image: "https://certificates.ibm.com/images/data_science.jpg",
                courseName: "IBM Data Science Professional Certificate",
                expirationDate: "2026-10-12T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2026-10-12T00:00:00.000Z",
              id: "cred_008",
              proofTypes: ["Ed25519Signature2018"],
              revNonce: 678901,
              revoked: false,
              schemaHash: "0xvwx234stu567890abcdef901",
              schemaType: "ProfessionalCertification",
              schemaUrl: "https://schemas.example.com/professional-cert/v3.0",
              userID: "usr_005",
              status: "active",
            },
          },
          {
            credential: {
              createdAt: "2023-10-12T11:25:00.000Z",
              credentialSubject: {
                endDate: "2023-10-12T00:00:00.000Z",
                score: 96,
                startDate: "2023-07-15T00:00:00.000Z",
                type: "SkillAssessment",
                image:
                  "https://certificates.ibm.com/images/python_proficiency.jpg",
                courseName: "Python for Data Science Proficiency",
                expirationDate: "2025-10-12T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2025-10-12T00:00:00.000Z",
              id: "cred_009",
              proofTypes: ["Ed25519Signature2018"],
              revNonce: 678902,
              revoked: false,
              schemaHash: "0xyz567vwx890abcdef234",
              schemaType: "SkillAssessment",
              schemaUrl: "https://schemas.example.com/skill-assessment/v2.0",
              userID: "usr_005",
              status: "active",
            },
          },
        ],
      },
      {
        bigInt: "78901234567890123456",
        createdAt: "2023-11-20T16:40:00.000Z",
        description: "Machine Learning Specialization from Stanford",
        hash: "0xbcdef0123456789abcdef0123456789abcdef012",
        id: "cert_007",
        title: "Machine Learning Specialization",
        type: "academic_specialization",
        url: "https://certificates.stanford.edu/verify/cert_007",
        version: "2.5",
        userCredentials: [
          {
            credential: {
              createdAt: "2023-11-20T16:40:00.000Z",
              credentialSubject: {
                endDate: "2023-11-20T00:00:00.000Z",
                score: 98,
                startDate: "2023-08-01T00:00:00.000Z",
                type: "AcademicSpecialization",
                image:
                  "https://certificates.stanford.edu/images/ml_specialization.jpg",
                courseName: "Machine Learning Specialization",
                expirationDate: "2027-11-20T00:00:00.000Z",
              },
              expired: false,
              expiresAt: "2027-11-20T00:00:00.000Z",
              id: "cred_010",
              proofTypes: ["BbsBlsSignature2020"],
              revNonce: 789012,
              revoked: false,
              schemaHash: "0xabc890xyz123456789def567",
              schemaType: "AcademicSpecialization",
              schemaUrl:
                "https://schemas.example.com/academic-specialization/v2.5",
              userID: "usr_005",
              status: "active",
            },
          },
        ],
      },
    ],
  },
];

const useGetStudents = (
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["users"],
    queryFn: async () => {
      // const { data } = await apiService().get("/v1/users");
      // return data;
      return mockApiResponse;
    },
    ...hookOptions,
  });
};

export default useGetStudents;
