import {
  Typography,
  Grid,
  Avatar,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router/routes";
import Card from "@/components/NBOCard";
import FooterNav from "@/components/FooterNav";
import { formatDate } from "@/utils/datetime";
import { type InferType } from "yup";
import schema from "../schema";
import { globalSnackbarState } from "@/recoil/atoms";
import { useSetRecoilState } from "recoil";
import useProgressOverlay from "@/utils/useProgressOverlay";
import { useTranslation } from "react-i18next";
import { formatPhoneNumber } from "@/utils/phoneOperations";
import { Country } from "country-state-city";
import { usePostIssuerRepresentativeOnboarding } from "@/api/usePostIssuerRepresentativeOnboarding";

const OnboardingInvitedRepresentativePreview = () => {
  const navigate = useNavigate();

  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);

  const progressOverlay = useProgressOverlay();

  const { t } = useTranslation();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const { getValues, handleSubmit, reset } =
    useFormContext<InferType<typeof schema>>();

  const { mutate } = usePostIssuerRepresentativeOnboarding({
    onMutate: () => {
      progressOverlay.show();
    },
    onSettled: () => {
      progressOverlay.hide();
    },
  });

  const formValues = getValues();

  const { personalDetails } = formValues;

  const {
    password,
    sessionId,
    did,
    avatar,
    firstName,
    lastName,
    email,
    phone,
    nationality,
    nationalId,
    dateOfBirth,
  } = personalDetails;

  const issuerRepresentativeOnboardingPayload = {
    representative: {
      password,
      sessionId,
      did,
    },
  };

  const onSubmit = async () => {
    mutate(issuerRepresentativeOnboardingPayload, {
      onSuccess: () => {
        reset({}, { keepValues: true });
        navigate(AppRoutes.ONBOARDING_COMPLETED);
      },
      onError: (data) => {
        setGlobalSnackbar({
          message: (
            <>
              <p>
                {t("sending_request_error")}:{" "}
                {data.response?.data?.message || ""}
              </p>
            </>
          ),
          severity: "error",
        });
      },
    });
  };

  const avatarUrl = avatar && URL.createObjectURL(avatar);

  const representativeDetails = (
    <>
      <Avatar
        src={avatarUrl ? avatarUrl : undefined}
        sx={{ width: 148, height: 148, mb: 3.5 }}
      />

      <Grid item sx={{ mb: 3.5 }}>
        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("input_firstNameLabel")}
            </Typography>
            <Typography variant="text14">{firstName || "--"}</Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("input_lastNameLabel")}
            </Typography>
            <Typography variant="text14">{lastName || "--"}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="row" gap={2.5}>
        <Grid item xs>
          <Typography
            variant="text12"
            color="custom.blue.6"
            sx={{ mb: 1.5, mt: 3.5 }}
          >
            {t("input_emailLabel")}
          </Typography>
          <Typography variant="text14">{email || "--"}</Typography>
        </Grid>
        <Grid item xs>
          <Typography
            variant="text12"
            color="custom.blue.6"
            sx={{ mb: 1.5, mt: 3.5 }}
          >
            {t("input_phoneLabel")}
          </Typography>
          <Typography variant="text14">
            {formatPhoneNumber(phone) || "--"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container direction="row" gap={2.5}>
        <Grid item xs>
          <Typography
            variant="text12"
            color="custom.blue.6"
            sx={{ mb: 1.5, mt: 3.5 }}
          >
            {t("input_nationalityLabel")}
          </Typography>
          <Typography variant="text14">
            {nationality ? Country.getCountryByCode(nationality)?.name : "--"}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            variant="text12"
            color="custom.blue.6"
            sx={{ mb: 1.5, mt: 3.5 }}
          >
            {t("input_nationalIDLabel")}
          </Typography>
          <Typography variant="text14">{nationalId || "--"}</Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" gap={2.5}>
        <Grid item xs>
          <Typography
            variant="text12"
            color="custom.blue.6"
            sx={{ mb: 1.5, mt: 3.5 }}
          >
            {t("input_dateOfBirthLabel")}
          </Typography>
          <Typography variant="text14">{formatDate(dateOfBirth)}</Typography>
        </Grid>
      </Grid>
    </>
  );
  return (
    <Grid
      container
      direction="column"
      gap={2.5}
      sx={{
        overflowWrap: "anywhere",
      }}
    >
      <Grid item>
        <Card title="Representative Details">{representativeDetails}</Card>
      </Grid>

      <Grid item>
        <Card title="Log in details">
          <Grid container direction="row">
            <Grid item xs>
              <Typography
                variant="text12"
                color="custom.blue.6"
                sx={{ mb: 1.5, mt: 3.5 }}
              >
                {t("log_in_email_Lbl")}
              </Typography>
              <Typography variant="text14">{email || "--"}</Typography>
            </Grid>

            <Grid item xs>
              <Grid container direction="column" gap={2.5}>
                <Grid item xs>
                  <Typography
                    variant="text12"
                    color="custom.blue.6"
                    sx={{ mb: 1.5, mt: 3.5 }}
                  >
                    {t("input_passwordLabel")}
                  </Typography>
                  <Typography variant="text14">
                    {isShowPassword ? password : "**********"}
                  </Typography>
                </Grid>

                <FormControlLabel
                  control={
                    <Checkbox
                      color="default"
                      checked={isShowPassword}
                      onChange={(e) => {
                        setIsShowPassword(e.target.checked);
                      }}
                    />
                  }
                  label={
                    <Box height={20} display="flex" gap={1.5}>
                      <Typography variant="text14" fontWeight={400}>
                        {t("show_password_Lbl")}
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item>
        <FooterNav
          hideCancelButton
          onClickBack={() => {
            navigate(AppRoutes.ONBOARDING_ISSUER_PRESENTATIVE_INFORMATION);
          }}
          onClickNext={handleSubmit(onSubmit)}
          buttonNextText={t("button_submit")}
        />
      </Grid>
    </Grid>
  );
};
export default OnboardingInvitedRepresentativePreview;
