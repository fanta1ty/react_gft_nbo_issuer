import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router/routes";
import FooterNav from "@/components/FooterNav";
import NBOCard from "@/components/NBOCard";
import ImageFormControl from "@/components/ImageFormControl";
import { type InferType } from "yup";
import schema from "../schema";
import { useTranslation } from "react-i18next";
import PhoneTextField from "@/components/PhoneTextField";
import { CityTextField } from "@/components";
import CountryTextField from "@/components/CountryTextField";
import { HelpOutline } from "@mui/icons-material";

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
                    value={value ?? null}
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
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.legalName"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_name_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.legalName}
                        helperText={
                          errors.companyInformation?.legalName?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.legalNameArabic"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_name_arabic_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.legalNameArabic}
                        helperText={
                          errors.companyInformation?.legalNameArabic?.message
                        }
                        inputProps={{
                          dir: "rtl",
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Controller
                  name={"companyInformation.registrationNumber"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("issuer_registration_no_Lbl")}
                      variant="outlined"
                      fullWidth
                      required
                      value={field.value ?? ""}
                      error={!!errors.companyInformation?.registrationNumber}
                      helperText={
                        errors.companyInformation?.registrationNumber?.message
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.registrationAuthority"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_registration_authority_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={
                          !!errors.companyInformation?.registrationAuthority
                        }
                        helperText={
                          errors.companyInformation?.registrationAuthority
                            ?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.vatNumber"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_vat_no_Lbl")}
                        variant="outlined"
                        fullWidth
                        required
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.vatNumber}
                        helperText={
                          errors.companyInformation?.vatNumber?.message
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
                    name={"companyInformation.website"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_website_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.website}
                        helperText={errors.companyInformation?.website?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Box display="flex" alignItems="center" mb={0.5}>
                    <Typography
                      variant="text12"
                      color="custom.dark.6"
                      fontWeight={600}
                    >
                      {t("issuer_corporate_domain_name_Lbl")} *
                      <Tooltip
                        title={t(
                          "onboarding_issuer_information_corporate_domain_tooltip_Lbl",
                        )}
                        arrow
                        placement="top"
                      >
                        <IconButton
                          size="small"
                          sx={{
                            left: 4,
                            color: "text.secondary",
                            width: 16,
                            height: 16,
                          }}
                        >
                          <HelpOutline fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </Box>
                  <Controller
                    name={"companyInformation.corporateDomainName"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        required
                        fullWidth
                        value={field.value ?? "@"}
                        error={!!errors.companyInformation?.corporateDomainName}
                        helperText={
                          errors.companyInformation?.corporateDomainName
                            ?.message
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
                    name={"companyInformation.salesTaxGroup"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_sales_tax_group_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.salesTaxGroup}
                        helperText={
                          errors.companyInformation?.salesTaxGroup?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.currency"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_currency_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.currency}
                        helperText={
                          errors.companyInformation?.currency?.message
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
                    name={"companyInformation.methodOfPayment"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_method_of_payment_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.methodOfPayment}
                        helperText={
                          errors.companyInformation?.methodOfPayment?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.ownership"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_ownership_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.ownership}
                        helperText={
                          errors.companyInformation?.ownership?.message
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
        <NBOCard title={t("issuer_issuer_address_details_Lbl")}>
          <Grid container direction="column" gap={2.5}>
            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.poBox"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_po_box_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.poBox}
                        helperText={errors.companyInformation?.poBox?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.postalCode"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_postal_code_Lbl")}
                        variant="outlined"
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
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.street"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_street_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.street}
                        helperText={errors.companyInformation?.street?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.district"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_district_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.district}
                        helperText={
                          errors.companyInformation?.district?.message
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
                    name={"companyInformation.city"}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CityTextField
                        country={country || ""}
                        onChange={onChange}
                        value={value ?? ""}
                        errorMessage={errors.companyInformation?.city?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.country"}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CountryTextField
                        value={value || ""}
                        onChange={onChange}
                        errorMessage={
                          errors.companyInformation?.country?.message || ""
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
        <NBOCard title={t("issuer_issuer_contact_details_Lbl")}>
          <Grid container direction="column" gap={2.5}>
            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.telephoneNumber"}
                    control={control}
                    render={({ field }) => (
                      <PhoneTextField
                        {...field}
                        label={t("issuer_telephone_number_Lbl")}
                        value={field.value ?? ""}
                        error={errors.companyInformation?.telephoneNumber}
                        phoneCountryCode={"SA"}
                      />
                    )}
                  />
                </Grid>
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
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.email}
                        helperText={errors.companyInformation?.email?.message}
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
        <NBOCard title={t("issuer_bank_information_Lbl")}>
          <Grid container direction="column" gap={2.5}>
            <Grid item>
              <Grid container direction="row" gap={2.5}>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.bankName"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_bank_name_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.bankName}
                        helperText={
                          errors.companyInformation?.bankName?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.branch"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_branch_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.branch}
                        helperText={errors.companyInformation?.branch?.message}
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
                    name={"companyInformation.bankAddress"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_bank_address_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.bankAddress}
                        helperText={
                          errors.companyInformation?.bankAddress?.message
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs>
                  <Controller
                    name={"companyInformation.accountName"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_account_name_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.accountName}
                        helperText={
                          errors.companyInformation?.accountName?.message
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
                    name={"companyInformation.accountNumber"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_account_no_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.accountNumber}
                        helperText={
                          errors.companyInformation?.accountNumber?.message
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
                    name={"companyInformation.ibanNumber"}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={t("issuer_iban_no_Lbl")}
                        variant="outlined"
                        fullWidth
                        value={field.value ?? ""}
                        error={!!errors.companyInformation?.ibanNumber}
                        helperText={
                          errors.companyInformation?.ibanNumber?.message
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
            name={"companyInformation.description"}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("about_Lbl")}
                variant="outlined"
                fullWidth
                value={field.value ?? ""}
                multiline
                rows={4}
                error={!!errors.companyInformation?.description}
                helperText={errors.companyInformation?.description?.message}
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
