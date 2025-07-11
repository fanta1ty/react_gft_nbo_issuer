import { FormProvider, useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import StepTracker from "./components/StepTracker";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { TopBar } from "@/components";
import { useTranslation } from "react-i18next";

const FORM_ID = "invited-representative-onboarding";

const OnboardingInvitedRepresentative = () => {
  const formMethods = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      personalDetails: {
        avatar: null,
      },
    },
  });

  const { t } = useTranslation();

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
                    color="custom.dark.6"
                    fontWeight={400}
                    sx={{ mb: 4, mt: 4 }}
                  >
                    {t("invited_representative_registration_Lbl")}
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

export default OnboardingInvitedRepresentative;
