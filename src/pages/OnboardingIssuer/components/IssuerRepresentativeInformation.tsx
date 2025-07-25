import { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type InferType } from "yup";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "@/router/routes";
import FooterNav from "@/components/FooterNav";
import NBOCard from "@/components/NBOCard";
import schema from "../schema";
import { ImageFormControl } from "@/components";
import PhoneTextField from "@/components/PhoneTextField";

const IssuerRepresentativeInformation = () => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<InferType<typeof schema>>();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClickNext = async () => {
    const isStepValid = await trigger("personalDetails");
    if (isStepValid) {
      navigate(AppRoutes.ONBOARDING_ISSUER_PREVIEW);
    }
  };

  return (
    <Grid container direction="column" gap={2.5}>
      <Grid item>
        <NBOCard title={t("representative_details_Lbl")}>
          <Grid container direction="column" gap={2.5}>
            <Grid item>
              <Controller
                name={"personalDetails.profilePicture"}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ImageFormControl
                    label={t("representative_profile_picture_Lbl")}
                    value={value ?? null}
                    onChange={onChange}
                    ImageInputProps={{
                      sx: { borderRadius: 3 },
                    }}
                    error={!!errors.personalDetails?.profilePicture}
                    helperText={errors.personalDetails?.profilePicture?.message}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.firstName"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("representative_first_name_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.firstName}
                        helperText={errors.personalDetails?.firstName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.lastName"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("representative_last_name_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.lastName}
                        helperText={errors.personalDetails?.lastName?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.phoneNumber"}
                    control={control}
                    render={({ field }) => (
                      <PhoneTextField
                        {...field}
                        label={t("representative_phone_number_Lbl")}
                        value={field.value ?? ""}
                        error={errors.personalDetails?.phoneNumber}
                        phoneCountryCode={"SA"}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.dateOfBirth"}
                    control={control}
                    render={({ field }) => (
                      console.log(field.value),
                      (
                        <TextField
                          {...field}
                          label={t("representative_dob_Lbl")}
                          type="date"
                          variant="outlined"
                          fullWidth
                          required
                          value={field.value}
                          error={!!errors.personalDetails?.dateOfBirth}
                          helperText={
                            errors.personalDetails?.dateOfBirth?.message
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0],
                          }}
                        />
                      )
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.nationality"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("representative_nationality_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.nationality}
                        helperText={
                          errors.personalDetails?.nationality?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.nationalId"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("representative_national_id_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.nationalId}
                        helperText={errors.personalDetails?.nationalId?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </NBOCard>
        <NBOCard
          title={t("representative_log_in_details_Lbl")}
          sx={{ my: 2.5 }}
        >
          <Grid container direction="column" gap={2.5}>
            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.email"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("representative_email_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.email}
                        helperText={errors.personalDetails?.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"personalDetails.confirmEmail"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("representative_confirm_email_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.personalDetails?.confirmEmail}
                        helperText={
                          errors.personalDetails?.confirmEmail?.message
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid item>
                <Grid container direction="row" gap={2.5}>
                  <Grid item xs>
                    <Controller
                      name={"personalDetails.password"}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={t("representative_create_password_Lbl")}
                          variant="outlined"
                          type={isShowPassword ? "text" : "password"}
                          fullWidth
                          required
                          value={field.value ?? ""}
                          error={!!errors.personalDetails?.password}
                          helperText={errors.personalDetails?.password?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <Controller
                      name={"personalDetails.confirmPassword"}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={t("confirm_password_Lbl")}
                          variant="outlined"
                          type={isShowPassword ? "text" : "password"}
                          fullWidth
                          required
                          value={field.value ?? ""}
                          error={!!errors.personalDetails?.confirmPassword}
                          helperText={
                            errors.personalDetails?.confirmPassword?.message
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
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
        </NBOCard>
      </Grid>

      <Grid item>
        <FooterNav
          onClickBack={() => {
            navigate(AppRoutes.ONBOARDING_ISSUER_COMPANY_INFORMATION);
          }}
          onClickNext={handleClickNext}
        />
      </Grid>
    </Grid>
  );
};

export default IssuerRepresentativeInformation;
