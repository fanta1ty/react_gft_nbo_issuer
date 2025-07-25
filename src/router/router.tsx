import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  App,
  Certificate,
  CertificateCreateNew,
  CertificateCreateNewConfirm,
  Issuer,
  IssuerCertificateDetails,
  IssuerCertificates,
  IssuerStudentDetails,
  IssuerStudents,
  Login,
  ProfileCompleted,
  OnboardingIssuer,
  OnboardingIssuerCompanyInformation,
  OnboardingIssuerRepresentativeInformation,
  OnboardingIssuerPreview,
  IssuerUserManagement,
} from "@/pages";
import { UnauthenticatedRoute, AuthenticatedRoute } from "./Auth";
import { AppRoutes } from "./routes";
import IssuerTemplateRepository from "@/pages/IssuerTemplateRepository";
import IssuerTemplateRepositoryDetails from "@/pages/IssuerTemplateRepositoryDetails";
import IssuerTemplateRepositoryDefineSchema from "@/pages/IssuerTemplateRepositoryDefineSchema";
import IssuerRepresentative from "@/pages/IssuerRepresentative";
import Profile from "@/pages/Profile";
import OnboardingInvitedRepresentative from "@/pages/OnboardingInvitedRepresentative";
import OnboardingInvitedRepresentativeRepresentativeInformation from "@/pages/OnboardingInvitedRepresentative/components/OnboardingInvitedRepresentativeRepresentativeInformation";
import OnboardingInvitedRepresentativePreview from "@/pages/OnboardingInvitedRepresentative/components/OnboardingInvitedRepresentativePreview";
import OnboardingInvitedRepresentativeProfileCompleted from "@/pages/OnboardingInvitedRepresentative/components/OnboardingInvitedRepresentativeProfileCompleted";

export const appRouter = createBrowserRouter([
  {
    path: AppRoutes.ROOT,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={AppRoutes.ISSUER} replace />,
      },

      {
        path: AppRoutes.LOGIN,
        element: (
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        ),
      },
      {
        path: AppRoutes.ONBOARDING_ISSUER,
        element: (
          <UnauthenticatedRoute>
            <OnboardingIssuer />
          </UnauthenticatedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Navigate
                to={AppRoutes.ONBOARDING_ISSUER_COMPANY_INFORMATION}
                replace
              />
            ),
          },
          {
            path: AppRoutes.ONBOARDING_ISSUER_COMPANY_INFORMATION,
            element: <OnboardingIssuerCompanyInformation />,
          },
          {
            path: AppRoutes.ONBOARDING_ISSUER_PRESENTATIVE_INFORMATION,
            element: <OnboardingIssuerRepresentativeInformation />,
          },
          {
            path: AppRoutes.ONBOARDING_ISSUER_PREVIEW,
            element: <OnboardingIssuerPreview />,
          },
        ],
      },
      {
        path: AppRoutes.ONBOARDING_COMPLETED,
        element: <ProfileCompleted />,
      },

      {
        path: AppRoutes.ONBOARDS_REPRESENTATIVE,
        element: (
          <UnauthenticatedRoute>
            <OnboardingInvitedRepresentative />
          </UnauthenticatedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Navigate
                to={{
                  pathname:
                    AppRoutes.ONBOARDS_REPRESENTATIVE_REPRESENTATIVE_INFORMATION,
                  search: `?sessionId=${new URLSearchParams(
                    window.location.search,
                  ).get("sessionId")}`,
                }}
                replace
              />
            ),
          },
          {
            path: AppRoutes.ONBOARDS_REPRESENTATIVE_REPRESENTATIVE_INFORMATION,
            element: (
              <OnboardingInvitedRepresentativeRepresentativeInformation />
            ),
          },
          {
            path: AppRoutes.ONBOARDS_REPRESENTATIVE_PREVIEW,
            element: <OnboardingInvitedRepresentativePreview />,
          },
        ],
      },
      {
        path: AppRoutes.ONBOARDS_REPRESENTATIVE_COMPLETED,
        element: <OnboardingInvitedRepresentativeProfileCompleted />,
      },

      {
        path: AppRoutes.CERTIFICATES,
        element: (
          <AuthenticatedRoute>
            <Certificate />
          </AuthenticatedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={AppRoutes.CREATE_NEW_CERTIFICATE} replace />,
          },
          {
            path: AppRoutes.CREATE_NEW_CERTIFICATE,
            element: <CertificateCreateNew />,
          },
          {
            path: AppRoutes.CREATE_NEW_CERTIFICATE_CONFIRM,
            element: <CertificateCreateNewConfirm />,
          },
        ],
      },

      {
        path: AppRoutes.ISSUER,
        element: (
          <AuthenticatedRoute>
            <Issuer />
          </AuthenticatedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={AppRoutes.ISSUER_STUDENTS} replace />,
          },
          {
            path: AppRoutes.ISSUER_STUDENTS,
            element: <IssuerStudents />,
          },
          {
            path: AppRoutes.ISSUER_STUDENT_DETAILS,
            element: <IssuerStudentDetails />,
          },
          {
            path: AppRoutes.ISSUER_CERTIFICATES,
            element: <IssuerCertificates />,
          },
          {
            path: AppRoutes.ISSUER_CERTIFICATE_DETAILS,
            element: <IssuerCertificateDetails />,
          },
          {
            path: AppRoutes.ISSUER_TEMPLATE_REPOSITORY,
            element: <IssuerTemplateRepository />,
          },
          {
            path: AppRoutes.ISSUER_TEMPLATE_REPOSITORY_DETAILS,
            element: <IssuerTemplateRepositoryDetails />,
          },
          {
            path: AppRoutes.ISSUER_TEMPLATE_REPOSITORY_DEFINE_SCHEMA,
            element: <IssuerTemplateRepositoryDefineSchema />,
          },
          {
            path: AppRoutes.ISSUER_REPRESENTATIVE,
            element: <IssuerRepresentative />,
          },
          {
            path: AppRoutes.ISSUER_USER_MANAGEMENT,
            element: <IssuerUserManagement />,
          },
        ],
      },
      {
        path: AppRoutes.PROFILE,
        element: (
          <AuthenticatedRoute>
            <Issuer />
          </AuthenticatedRoute>
        ),
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: AppRoutes.HEALTH,
        element: <h3>Hey There!!! The App is Healthy</h3>,
      },

      {
        path: "*",
        element: <p>No matching route</p>,
      },
    ],
  },
]);
