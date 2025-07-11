import { useLocation } from "react-router";
import BaseStepTracker from "@/components/BaseStepTracker";
import { AppRoutes } from "@/router/routes";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

const getStep = (t: TFunction<"translation", undefined>) => {
  return [
    {
      stepId: 0,
      label: t("issuer_information_Lbl"),
      link: AppRoutes.ONBOARDING_ISSUER_COMPANY_INFORMATION,
    },
    {
      stepId: 1,
      label: t("representative_information_Lbl"),
      link: AppRoutes.ONBOARDING_ISSUER_PRESENTATIVE_INFORMATION,
    },
    {
      stepId: 3,
      label: t("documents_Lbl"),
      link: AppRoutes.ONBOARDING_ISSUER_DOCUMENTS,
    },
    {
      stepId: 4,
      label: t("preview_Lbl"),
      link: AppRoutes.ONBOARDING_ISSUER_PREVIEW,
    },
  ];
};

const StepTracker = () => {
  const { t } = useTranslation();
  const stepMap = Object.fromEntries(
    getStep(t).map((step) => [step.link, step]),
  );

  const pathName = useLocation().pathname;
  const activeStep = stepMap[pathName]?.stepId || 0;

  return <BaseStepTracker activeStep={activeStep} steps={getStep(t)} />;
};

export default StepTracker;
