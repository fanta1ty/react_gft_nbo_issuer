import { Grid, Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as CompleteIcon } from "@/assets/icons/complete.svg";
import { AppRoutes } from "@/router/routes";

const CreateNewCertificateConfirm = () => {
  const { t } = useTranslation();

  return (
    <Grid sx={{ mt: 15 }} display="flex" justifyContent="center">
      <Box flexBasis={608} textAlign="center">
        <CompleteIcon />
        <Typography variant="text24" fontWeight={600} sx={{ mt: 3.5 }}>
          {t("createCertificate_confirmHeading")}
        </Typography>
        <Typography variant="text14" fontWeight={400} sx={{ mt: 2, mb: 5 }}>
          {t("createCertificate_confirmSubHeading")}
        </Typography>
        <Button
          color="black"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: 148 }}
          component={RouterLink}
          to={AppRoutes.ISSUER_CERTIFICATES}
        >
          {t("button_doneText")}
        </Button>
      </Box>
    </Grid>
  );
};

export default CreateNewCertificateConfirm;
