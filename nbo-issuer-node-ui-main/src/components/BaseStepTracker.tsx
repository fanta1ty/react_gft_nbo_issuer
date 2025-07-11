import { Stepper, Step, StepLabel } from "@mui/material";
import NBOCard from "@/components/NBOCard";
import { useTranslation } from "react-i18next";

export type StepIdType = number;
export type StepType = { stepId: StepIdType; label: string };
type Props = {
  activeStep: StepIdType;
  steps: Array<StepType>;
};

const BaseStepTracker = ({ activeStep, steps }: Props) => {
  const { t } = useTranslation();
  return (
    <NBOCard title={t("steps_Lbl")}>
      <Stepper activeStep={activeStep} orientation="vertical" connector={null}>
        {steps.map((step) => (
          <Step disabled={false} key={step.label}>
            <StepLabel sx={{ flexDirection: "row-reverse" }}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </NBOCard>
  );
};

export default BaseStepTracker;
