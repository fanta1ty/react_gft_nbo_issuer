import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiService from "./apiService";

type CredentialSubjectType = {
  endDate: string;
  score: number;
  startDate: string;
  type: string;
  image: string;
  courseName: string;
  expirationDate: string;
};

type CredentialType = {
  createdAt: string;
  credentialSubject: CredentialSubjectType;
  expired: boolean;
  expiresAt: string;
  id: string;
  proofTypes: string[];
  revNonce: number;
  revoked: boolean;
  schemaHash: string;
  schemaType: string;
  schemaUrl: string;
  userID: string;
  status: string;
};

export type UserType = {
  avatar: string;
  city: string;
  country: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  isAdmin: boolean;
  lastName: string;
  nationalId: string;
  password: string;
  phone: string;
};

export type UserCredentialType = {
  credential: CredentialType;
  user: UserType;
};

export type CertificateType = {
  bigInt: string;
  createdAt: string;
  description: string;
  hash: string;
  id: string;
  title: string;
  type: string;
  url: string;
  userCredentials: UserCredentialType[];
  version: string;
};

export type ResponseType = CertificateType[] | undefined;

const mockCertificatesResponse: CertificateType[] = [
  {
    bigInt: "12345678901234567890123456789012345678901234567890",
    createdAt: "2023-05-15T14:00:00.000Z",
    description:
      "Bachelor of Science in Computer Science from MIT. This degree represents comprehensive study in algorithms, data structures, software engineering, and computer systems.",
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
        user: {
          avatar: "https://i.pravatar.cc/150?u=alice.cooper",
          city: "Boston",
          country: "United States",
          dateOfBirth: "1999-01-15",
          email: "alice.cooper@university.edu",
          firstName: "Alice",
          gender: "F",
          id: "usr_001",
          isAdmin: false,
          lastName: "Cooper",
          nationalId: "111-22-3333",
          password: "$2b$10$hashedpassword001",
          phone: "+1-555-0001",
        },
      },
    ],
  },
  {
    bigInt: "23456789012345678901234567890123456789012345678901",
    createdAt: "2023-08-20T10:15:00.000Z",
    description:
      "AWS Cloud Practitioner certification validates foundational knowledge of AWS cloud services, basic architecture principles, security, and compliance.",
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
        user: {
          avatar: "https://i.pravatar.cc/150?u=alice.cooper",
          city: "Boston",
          country: "United States",
          dateOfBirth: "1999-01-15",
          email: "alice.cooper@university.edu",
          firstName: "Alice",
          gender: "F",
          id: "usr_001",
          isAdmin: false,
          lastName: "Cooper",
          nationalId: "111-22-3333",
          password: "$2b$10$hashedpassword001",
          phone: "+1-555-0001",
        },
      },
    ],
  },
  {
    bigInt: "34567890123456789012345678901234567890123456789012",
    createdAt: "2023-12-10T16:30:00.000Z",
    description:
      "Master of Engineering in Software Engineering from Stanford University. Advanced coursework in distributed systems, machine learning, and software architecture.",
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
        user: {
          avatar: "https://i.pravatar.cc/150?u=bob.johnson",
          city: "San Francisco",
          country: "United States",
          dateOfBirth: "1997-06-22",
          email: "bob.johnson@techcorp.com",
          firstName: "Bob",
          gender: "M",
          id: "usr_002",
          isAdmin: true,
          lastName: "Johnson",
          nationalId: "222-33-4444",
          password: "$2b$10$hashedpassword002",
          phone: "+1-555-0002",
        },
      },
    ],
  },
  {
    bigInt: "45678901234567890123456789012345678901234567890123",
    createdAt: "2023-09-05T13:45:00.000Z",
    description:
      "Google UX/UI Design Professional Certificate covers user research, wireframing, prototyping, and design systems using industry-standard tools.",
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
        user: {
          avatar: "https://i.pravatar.cc/150?u=carol.smith",
          city: "New York",
          country: "United States",
          dateOfBirth: "1998-11-03",
          email: "carol.smith@design.agency",
          firstName: "Carol",
          gender: "F",
          id: "usr_003",
          isAdmin: false,
          lastName: "Smith",
          nationalId: "333-44-5555",
          password: "$2b$10$hashedpassword003",
          phone: "+1-555-0003",
        },
      },
    ],
  },
  {
    bigInt: "56789012345678901234567890123456789012345678901234",
    createdAt: "2023-07-30T15:10:00.000Z",
    description:
      "Adobe Certified Expert in Creative Suite demonstrates mastery of Photoshop, Illustrator, InDesign, and other Adobe creative tools.",
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
            image: "https://certificates.adobe.com/images/creative_suite.jpg",
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
        user: {
          avatar: "https://i.pravatar.cc/150?u=carol.smith",
          city: "New York",
          country: "United States",
          dateOfBirth: "1998-11-03",
          email: "carol.smith@design.agency",
          firstName: "Carol",
          gender: "F",
          id: "usr_003",
          isAdmin: false,
          lastName: "Smith",
          nationalId: "333-44-5555",
          password: "$2b$10$hashedpassword003",
          phone: "+1-555-0003",
        },
      },
    ],
  },
  {
    bigInt: "67890123456789012345678901234567890123456789012345",
    createdAt: "2023-10-12T11:25:00.000Z",
    description:
      "IBM Data Science Professional Certificate covers Python, machine learning, data visualization, and statistical analysis for business applications.",
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
        user: {
          avatar: "https://i.pravatar.cc/150?u=emma.wilson",
          city: "Seattle",
          country: "United States",
          dateOfBirth: "1996-09-25",
          email: "emma.wilson@datalab.com",
          firstName: "Emma",
          gender: "F",
          id: "usr_005",
          isAdmin: true,
          lastName: "Wilson",
          nationalId: "555-66-7777",
          password: "$2b$10$hashedpassword005",
          phone: "+1-555-0005",
        },
      },
    ],
  },
  {
    bigInt: "78901234567890123456789012345678901234567890123456",
    createdAt: "2023-11-20T16:40:00.000Z",
    description:
      "Stanford Machine Learning Specialization covers supervised learning, unsupervised learning, and neural networks with practical applications.",
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
          schemaUrl: "https://schemas.example.com/academic-specialization/v2.5",
          userID: "usr_005",
          status: "active",
        },
        user: {
          avatar: "https://i.pravatar.cc/150?u=emma.wilson",
          city: "Seattle",
          country: "United States",
          dateOfBirth: "1996-09-25",
          email: "emma.wilson@datalab.com",
          firstName: "Emma",
          gender: "F",
          id: "usr_005",
          isAdmin: true,
          lastName: "Wilson",
          nationalId: "555-66-7777",
          password: "$2b$10$hashedpassword005",
          phone: "+1-555-0005",
        },
      },
    ],
  },
  {
    bigInt: "89012345678901234567890123456789012345678901234567",
    createdAt: "2023-06-18T09:30:00.000Z",
    description:
      "Cisco Certified Network Associate (CCNA) certification validates networking fundamentals, network access, IP connectivity, and security.",
    hash: "0xcdef012345678901234567890123456789abcdef23",
    id: "cert_008",
    title: "CCNA Certification",
    type: "vendor_certification",
    url: "https://certificates.cisco.com/verify/cert_008",
    version: "1.3",
    userCredentials: [
      {
        credential: {
          createdAt: "2023-06-18T09:30:00.000Z",
          credentialSubject: {
            endDate: "2023-06-18T00:00:00.000Z",
            score: 85,
            startDate: "2023-03-01T00:00:00.000Z",
            type: "VendorCertification",
            image: "https://certificates.cisco.com/images/ccna.jpg",
            courseName: "Cisco Certified Network Associate",
            expirationDate: "2026-06-18T00:00:00.000Z",
          },
          expired: false,
          expiresAt: "2026-06-18T00:00:00.000Z",
          id: "cred_011",
          proofTypes: ["RsaSignature2018"],
          revNonce: 890123,
          revoked: false,
          schemaHash: "0xdef123abc456789012345678901234567890abcdef",
          schemaType: "VendorCertification",
          schemaUrl: "https://schemas.example.com/vendor-cert/v1.3",
          userID: "usr_004",
          status: "active",
        },
        user: {
          avatar: "https://i.pravatar.cc/150?u=david.brown",
          city: "Austin",
          country: "United States",
          dateOfBirth: "1995-04-18",
          email: "david.brown@startup.io",
          firstName: "David",
          gender: "M",
          id: "usr_004",
          isAdmin: false,
          lastName: "Brown",
          nationalId: "444-55-6666",
          password: "$2b$10$hashedpassword004",
          phone: "+1-555-0004",
        },
      },
    ],
  },
  {
    bigInt: "90123456789012345678901234567890123456789012345678",
    createdAt: "2023-04-25T12:15:00.000Z",
    description:
      "Microsoft Azure Fundamentals certification demonstrates foundational knowledge of cloud services and Azure platform capabilities.",
    hash: "0xef0123456789012345678901234567890123456789abc",
    id: "cert_009",
    title: "Azure Fundamentals",
    type: "vendor_certification",
    url: "https://certificates.microsoft.com/verify/cert_009",
    version: "1.1",
    userCredentials: [
      {
        credential: {
          createdAt: "2023-04-25T12:15:00.000Z",
          credentialSubject: {
            endDate: "2023-04-25T00:00:00.000Z",
            score: 87,
            startDate: "2023-03-15T00:00:00.000Z",
            type: "VendorCertification",
            image:
              "https://certificates.microsoft.com/images/azure_fundamentals.jpg",
            courseName: "Microsoft Azure Fundamentals",
            expirationDate: "2025-04-25T00:00:00.000Z",
          },
          expired: false,
          expiresAt: "2025-04-25T00:00:00.000Z",
          id: "cred_012",
          proofTypes: ["Ed25519Signature2018"],
          revNonce: 901234,
          revoked: false,
          schemaHash: "0x123def456abc789012345678901234567890abcdef",
          schemaType: "VendorCertification",
          schemaUrl: "https://schemas.example.com/vendor-cert/v1.1",
          userID: "usr_002",
          status: "active",
        },
        user: {
          avatar: "https://i.pravatar.cc/150?u=bob.johnson",
          city: "San Francisco",
          country: "United States",
          dateOfBirth: "1997-06-22",
          email: "bob.johnson@techcorp.com",
          firstName: "Bob",
          gender: "M",
          id: "usr_002",
          isAdmin: true,
          lastName: "Johnson",
          nationalId: "222-33-4444",
          password: "$2b$10$hashedpassword002",
          phone: "+1-555-0002",
        },
      },
    ],
  },
  {
    bigInt: "01234567890123456789012345678901234567890123456789",
    createdAt: "2023-03-12T14:20:00.000Z",
    description:
      "Blockchain development certification covering smart contracts, DeFi protocols, and decentralized application development.",
    hash: "0x0123456789abcdef0123456789abcdef01234567890",
    id: "cert_010",
    title: "Blockchain Development Certificate",
    type: "technical_certification",
    url: "https://certificates.blockchain.edu/verify/cert_010",
    version: "1.0",
    userCredentials: [
      {
        credential: {
          createdAt: "2023-03-12T14:20:00.000Z",
          credentialSubject: {
            endDate: "2023-03-12T00:00:00.000Z",
            score: 92,
            startDate: "2022-12-01T00:00:00.000Z",
            type: "TechnicalCertification",
            image:
              "https://certificates.blockchain.edu/images/blockchain_dev.jpg",
            courseName: "Blockchain Development Professional Certificate",
            expirationDate: "2026-03-12T00:00:00.000Z",
          },
          expired: false,
          expiresAt: "2026-03-12T00:00:00.000Z",
          id: "cred_013",
          proofTypes: ["BbsBlsSignature2020"],
          revNonce: 12345,
          revoked: false,
          schemaHash: "0x456def789abc012345678901234567890123456789",
          schemaType: "TechnicalCertification",
          schemaUrl: "https://schemas.example.com/technical-cert/v1.0",
          userID: "usr_004",
          status: "active",
        },
        user: {
          avatar: "https://i.pravatar.cc/150?u=david.brown",
          city: "Austin",
          country: "United States",
          dateOfBirth: "1995-04-18",
          email: "david.brown@startup.io",
          firstName: "David",
          gender: "M",
          id: "usr_004",
          isAdmin: false,
          lastName: "Brown",
          nationalId: "444-55-6666",
          password: "$2b$10$hashedpassword004",
          phone: "+1-555-0004",
        },
      },
    ],
  },
];

const useGetCertificates = (
  hookOptions?: UseQueryOptions<ResponseType, AxiosError>,
) => {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["certificates"],
    queryFn: async () => {
      // const { data } = await apiService().get("/v1/certificates");

      // return data;
      return mockCertificatesResponse;
    },
    ...hookOptions,
  });
};

export default useGetCertificates;
