import { Grid, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router/routes";
import FooterNav from "@/components/FooterNav";
import NBOCard from "@/components/NBOCard";
import ImageFormControl from "@/components/ImageFormControl";
import { type InferType } from "yup";
import schema from "../schema";
import { useTranslation } from "react-i18next";
import CountryTextField from "@/components/CountryTextField";
import PhoneTextField from "@/components/PhoneTextField";
import { CityTextField } from "@/components";

const IssuerCompanyInformation = () => {
  const {
    control,
    trigger,
    formState: { errors },
    watch,
  } = useFormContext<InferType<typeof schema>>();
  const country = watch("companyInformation.country");

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClickNext = async () => {
    const isStepValid = await trigger("companyInformation");

    if (isStepValid) {
      navigate(AppRoutes.ONBOARDING_ISSUER_PRESENTATIVE_INFORMATION);
    }
  };

  return (
    <Grid container direction="column" gap={2.5}>
      <Grid item>
        <NBOCard title={t("issuer_details_Lbl")}>
          <Grid container direction="column" gap={2.5}>
            <Grid item>
              <Controller
                name={"companyInformation.companyLogo"}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <ImageFormControl
                    label={t("issuer_logo_Lbl")}
                    value={value}
                    onChange={onChange}
                    ImageInputProps={{
                      sx: { borderRadius: 3 },
                    }}
                    error={!!errors.companyInformation?.companyLogo}
                    helperText={errors.companyInformation?.companyLogo?.message}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <Controller
                name={"companyInformation.companyName"}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("issuer_name_Lbl")}
                    variant="outlined"
                    fullWidth
                    required
                    value={field.value ?? ""}
                    error={!!errors.companyInformation?.companyName}
                    helperText={errors.companyInformation?.companyName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.email"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_email_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.email}
                        helperText={errors.companyInformation?.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.confirmEmail"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_email_confirm_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.confirmEmail}
                        helperText={
                          errors.companyInformation?.confirmEmail?.message
                        }
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
                    name={"companyInformation.phone"}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <PhoneTextField
                        label={t("issuer_phone_Lbl")}
                        value={value ?? ""}
                        onChange={onChange}
                        error={errors.companyInformation?.phone}
                        phoneCountryCode={"SA"}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.confirmPhone"}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <PhoneTextField
                        label={t("issuer_phone_confirm_Lbl")}
                        value={value ?? ""}
                        onChange={onChange}
                        error={errors.companyInformation?.confirmPhone}
                        phoneCountryCode={"SA"}
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
                    name={"companyInformation.country"}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CountryTextField
                        value={value}
                        onChange={onChange}
                        errorMessage={
                          errors.companyInformation?.country?.message || ""
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs>
                  <Controller
                    name={"companyInformation.city"}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CityTextField
                        country={country}
                        value={value}
                        onChange={onChange}
                        errorMessage={
                          errors.companyInformation?.city?.message || ""
                        }
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
                    name={"companyInformation.companyWebsite"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_website_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.companyWebsite}
                        helperText={
                          errors.companyInformation?.companyWebsite?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs></Grid>
              </Grid>
            </Grid>

            <Grid item xs>
              <Controller
                name={"companyInformation.companyAddress"}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("issuer_address_Lbl")}
                    required
                    fullWidth
                    value={field.value ?? ""}
                    error={!!errors.companyInformation?.companyAddress}
                    helperText={
                      errors.companyInformation?.companyAddress?.message
                    }
                  ></TextField>
                )}
              />
            </Grid>
            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.postalCode"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("postal_code_Lbl")}
                        required
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.postalCode}
                        helperText={
                          errors.companyInformation?.postalCode?.message
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs>
                  <Controller
                    name={"companyInformation.taxIdentificationNumber"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("tax_identification_number_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={
                          !!errors.companyInformation?.taxIdentificationNumber
                        }
                        helperText={
                          errors.companyInformation?.taxIdentificationNumber
                            ?.message
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </NBOCard>
      </Grid>

      <Grid item>
        <NBOCard title={t("issuer_description_lbl")}>
          <Controller
            name={"companyInformation.companyDescriptionAbout"}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("about_Lbl")}
                variant="outlined"
                fullWidth
                required
                value={field.value ?? ""}
                multiline
                rows={4}
                error={!!errors.companyInformation?.companyDescriptionAbout}
                helperText={
                  errors.companyInformation?.companyDescriptionAbout?.message
                }
              />
            )}
          />
        </NBOCard>
      </Grid>

      <Grid item>
        <FooterNav onClickNext={handleClickNext} />
      </Grid>
    </Grid>
  );
};

export default IssuerCompanyInformation;
