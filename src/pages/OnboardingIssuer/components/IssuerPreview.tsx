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
import { useIssuerOnboarding } from "@/api/usePostIssuerOnboarding";
import { type InferType } from "yup";
import schema from "../schema";
import { globalSnackbarState } from "@/recoil/atoms";
import { useSetRecoilState } from "recoil";
import useProgressOverlay from "@/utils/useProgressOverlay";
import { useTranslation } from "react-i18next";
import { formatPhoneNumber } from "@/utils/phoneOperations";

const IssuerPreview = () => {
  const navigate = useNavigate();
  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);
  const progressOverlay = useProgressOverlay();
  const { t } = useTranslation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { getValues, handleSubmit, reset } =
    useFormContext<InferType<typeof schema>>();
  const { mutate } = useIssuerOnboarding({
    onMutate: () => {
      progressOverlay.show();
    },
    onSettled: () => {
      progressOverlay.hide();
    },
  });

  const formValues = getValues();
  const { companyInformation, personalDetails } = formValues;
  const {
    companyLogo,
    legalName,
    legalNameArabic,
    registrationNumber,
    registrationAuthority,
    vatNumber,
    website,
    corporateDomainName,
    salesTaxGroup,
    currency,
    methodOfPayment,
    ownership,
    poBox,
    postalCode,
    street,
    district,
    city,
    country,
    telephoneNumber,
    email: companyEmail,
    bankName,
    branch,
    bankAddress,
    accountName,
    accountNumber,
    ibanNumber,
    description,
  } = companyInformation;

  const {
    profilePicture,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    nationality,
    nationalId,
    email: personalEmail,
    password,
  } = personalDetails;

  const onSubmit = async () => {
    mutate(formValues, {
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
  const profilePictureUrl =
    profilePicture && URL.createObjectURL(profilePicture);

  const companyLogoUrl = companyLogo && URL.createObjectURL(companyLogo);

  const issuerDetails = (
    <>
      <Avatar
        src={companyLogoUrl ? companyLogoUrl : undefined}
        sx={{ width: 148, height: 148, mb: 1.0 }}
        variant="rounded"
      />
      <Grid item>
        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_name_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {legalName || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_name_arabic_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {legalNameArabic || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_registration_no_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {registrationNumber || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_registration_authority_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {registrationAuthority || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_vat_no_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {vatNumber || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_preview_issuer_website_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {website || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_corporate_domain_name_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {corporateDomainName || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_sales_tax_group_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {salesTaxGroup || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_currency_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {currency || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_method_of_payment_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {methodOfPayment || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_ownership_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {ownership || "--"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  const issuerAddressDetails = (
    <>
      <Grid item>
        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 1.0 }}
            >
              {t("issuer_po_box_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {poBox || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 1 }}
            >
              {t("issuer_postal_code_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {postalCode || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_street_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {street || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_district_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {district || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_city_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {city || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_country_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {country || "--"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  const issuerContactDetails = (
    <>
      <Grid item>
        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 1.0 }}
            >
              {t("issuer_preview_issuer_phone_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {telephoneNumber || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 1 }}
            >
              {t("issuer_preview_issuer_email_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {companyEmail || "--"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  const issuerBankInfo = (
    <>
      <Grid item>
        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 1.0 }}
            >
              {t("issuer_bank_name_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {bankName || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 1 }}
            >
              {t("issuer_branch_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {branch || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_bank_address_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {bankAddress || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_account_name_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {accountName || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_bank_address_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {bankAddress || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_account_name_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {accountName || "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_account_no_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {accountNumber || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              fontWeight={400}
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("issuer_iban_no_Lbl")}
            </Typography>
            <Typography variant="text14" fontWeight={600}>
              {ibanNumber || "--"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  const representativeDetails = (
    <>
      <Avatar
        src={profilePictureUrl ? profilePictureUrl : undefined}
        sx={{ width: 148, height: 148, mb: 1.0 }}
        variant="rounded"
      />

      <Grid item>
        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
              fontWeight={400}
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
              fontWeight={400}
            >
              {t("input_lastNameLabel")}
            </Typography>
            <Typography variant="text14">{lastName || "--"}</Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
              fontWeight={400}
            >
              {t("representative_phone_number_Lbl")}
            </Typography>
            <Typography variant="text14">
              {formatPhoneNumber(phoneNumber) || "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
              fontWeight={400}
            >
              {t("representative_dob_Lbl")}
            </Typography>
            <Typography variant="text14">
              {dateOfBirth ? dateOfBirth.toString() : "--"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
              fontWeight={400}
            >
              {t("representative_nationality_Lbl")}
            </Typography>
            <Typography variant="text14">{nationality || "--"}</Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
              fontWeight={400}
            >
              {t("representative_national_id_Lbl")}
            </Typography>
            <Typography variant="text14">{nationalId || "--"}</Typography>
          </Grid>
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
        <Card title={t("issuer_preview_issuer_details_Lbl")}>
          {issuerDetails}
        </Card>
      </Grid>

      <Grid item>
        <Card title={t("issuer_issuer_address_details_Lbl")}>
          {issuerAddressDetails}
        </Card>
      </Grid>

      <Grid item>
        <Card title={t("issuer_issuer_contact_details_Lbl")}>
          {issuerContactDetails}
        </Card>
      </Grid>

      <Grid item>
        <Card title={t("issuer_bank_information_Lbl")}>{issuerBankInfo}</Card>
      </Grid>

      <Grid item>
        <Card title={t("representative_details_Lbl")}>
          {representativeDetails}
        </Card>
      </Grid>

      <Grid item>
        <Card title={t("issuer_preview_login_details_Lbl")}>
          <Grid container direction="row">
            <Grid item xs>
              <Typography
                variant="text12"
                color="custom.blue.6"
                sx={{ mb: 1.5, mt: 1.0 }}
                fontWeight={400}
              >
                {t("issuer_preview_login_email_Lbl")}
              </Typography>
              <Typography variant="text14">{personalEmail || "--"}</Typography>
            </Grid>

            <Grid item xs>
              <Grid container direction="column" gap={2.5}>
                <Grid item xs>
                  <Typography
                    variant="text12"
                    color="custom.blue.6"
                    sx={{ mb: 1.5, mt: 1.0 }}
                    fontWeight={400}
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
        <Card title={t("about_Lbl")}>
          <Grid item>
            <Grid container direction="row" gap={2.5}>
              <Grid item xs>
                <Typography
                  variant="text12"
                  color="custom.blue.6"
                  sx={{ mt: 1.0 }}
                  fontWeight={400}
                >
                  {t("about_Lbl")}
                </Typography>
                <Typography variant="text14" sx={{ mt: 2.5 }}>
                  {description || "--"}
                </Typography>
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
export default IssuerPreview;
