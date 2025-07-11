import { Link } from "react-router-dom";
import { Typography, Button, Grid, Box } from "@mui/material";
import { ReactComponent as CompleteIcon } from "@/assets/icons/co_complete.svg";
import { AppRoutes } from "@/router/routes";
import { useTranslation } from "react-i18next";

const OnboardingInvitedRepresentativeProfileCompleted = () => {
  const { t } = useTranslation();
  return (
    <Grid
      sx={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Box flexBasis={608} textAlign="center">
        <CompleteIcon />
        <Typography variant="text24" fontWeight={600} sx={{ mt: 3.5 }}>
          {t("invited_representative_registration_success_title")}
        </Typography>
        <Typography variant="text14" fontWeight={400} sx={{ mt: 2, mb: 5 }}>
          {t("invited_representative_registration_success_text")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={AppRoutes.ISSUER}
        >
          {t("onboarding_back_to_login")}
        </Button>
      </Box>
    </Grid>
  );
};

export default OnboardingInvitedRepresentativeProfileCompleted;
