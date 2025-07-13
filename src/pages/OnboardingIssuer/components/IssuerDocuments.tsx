import { Grid, Stack } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router/routes";
import FooterNav from "@/components/FooterNav";
import NBOCard from "@/components/NBOCard";
import { type InferType } from "yup";
import schema from "../schema";
import { InputFileUploaderFormControl } from "@/components/InputFileUploaderControl";
import { useTranslation } from "react-i18next";

const IssuerDocuments = () => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<InferType<typeof schema>>();
  const navigate = useNavigate();
  const handleClickNext = async () => {
    const isStepValid = await trigger("documents");
    if (isStepValid) {
      navigate(AppRoutes.ONBOARDING_ISSUER_PREVIEW);
    }
  };
  const { t } = useTranslation();

  return (
    <Grid container direction="column" gap={2.5}>
      <Grid item>
        <NBOCard title="Documents">
          <Stack gap={3.5}>
            <Controller
              name={"documents.ministerOfEducation"}
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputFileUploaderFormControl
                  label={t("ministry_of_education_Lbl")}
                  value={value || null}
                  required
                  onChange={onChange}
                  error={!!errors.documents?.ministerOfEducation}
                  helperText={errors.documents?.ministerOfEducation?.message}
                />
              )}
            />
            <Controller
              name={"documents.other"}
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputFileUploaderFormControl
                  label={t("other_document_Lbl")}
                  value={value || null}
                  onChange={onChange}
                  error={!!errors.documents?.other}
                  helperText={errors.documents?.other?.message}
                />
              )}
            />
          </Stack>
        </NBOCard>
      </Grid>
      <Grid item>
        <FooterNav
          onClickBack={() => {
            navigate(AppRoutes.ONBOARDING_ISSUER_PRESENTATIVE_INFORMATION);
          }}
          onClickNext={handleClickNext}
        />
      </Grid>
    </Grid>
  );
};

export default IssuerDocuments;
