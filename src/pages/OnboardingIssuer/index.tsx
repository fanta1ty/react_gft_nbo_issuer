import { FormProvider, useForm } from "react-hook-form";
import { Outlet, useLocation } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import StepTracker from "./components/StepTracker";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { TopBar } from "@/components";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const FORM_ID = "employer-onboarding";

const OnboardingIssuer = () => {
  const location = useLocation();

  const formMethods = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      companyInformation: {},
      personalDetails: {
        profilePicture: null,
      },
    },
  });

  const { t } = useTranslation();

  const currentStep = useMemo(() => {
    const path = location.pathname;

    if (path.includes("/company-information")) return 1;
    if (path.includes("/presentative-information")) return 2;
    if (path.includes("/preview")) return 3;

    return 1;
  }, [location.pathname]);

  const isLastStep = currentStep === 3;

  const getHeaderLabel = () => {
    if (isLastStep) {
      return t("issuer_preview_issuer_registration_preview_Lbl");
    }
    return t("issuer_registration_Lbl");
  };

  return (
    <Stack>
      <TopBar />
      <Grid container direction="row" justifyContent="center">
        <Grid item flex="0 1 1200px">
          <FormProvider {...formMethods}>
            <form id={FORM_ID} style={{ display: "contents" }}>
              <Grid
                container
                direction="column"
                maxWidth="1148px"
                margin="0 auto"
                marginBottom={6}
                paddingX={3}
              >
                <Grid item>
                  <Typography
                    variant="h4"
                    color="custom.dark.10"
                    fontWeight={600}
                    sx={{ mb: 4, mt: 4 }}
                  >
                    {getHeaderLabel()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container gap={2} direction="row" wrap="nowrap">
                    <Grid item xs>
                      <Outlet />
                    </Grid>
                    <Grid item flexBasis="292px">
                      <StepTracker />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default OnboardingIssuer;
