import { NBOCard } from "@/components";
import { formatPhoneNumber } from "@/utils/phoneOperations";
import { Grid, Stack, Typography } from "@mui/material";
import { Country } from "country-state-city";
import { useTranslation } from "react-i18next";

export const RepresentativeDetails = () => {
  const { t } = useTranslation();

  const {
    companyName,
    phone,
    companyWebsite,
    country,
    city,
    companyAddress,
    companyDescriptionAbout,
    email,
    postalCode,
    taxIdentificationNumber,
  } = {
    companyName: "CISCO",
    phone: "+966 567 890 123",
    companyWebsite: "mediahubsolutions.com",
    country: "AX",
    companyDescriptionAbout:
      "MediaHub Solutions is a forward-looking media and advertising agency dedicated to helping brands create meaningful connections with their audiences. Our innovative strategies and creative solutions drive engagement and brand recognition. With a passionate team of experts, we deliver impactful campaigns that transcend traditional marketing boundaries.",
    city: "Jeddah",
    companyAddress: "456 Media Street, Jeddah, Saudi Arabia",
    email: "contact@mhsolutions.com",
    postalCode: "12345",
    taxIdentificationNumber: "4859 3279 384",
  };

  return (
    <Stack gap={2.5}>
      <NBOCard title={t("company_details_Lbl")}>
        <Grid item sx={{ mb: 3.5 }}>
          <Grid container direction="row" gap={2.5}>
            <Grid item xs>
              <Typography
                variant="text12"
                color="custom.blue.6"
                sx={{ mb: 1.5, mt: 3.5 }}
              >
                {t("company_name_Lbl")}
              </Typography>
              <Typography variant="text14">{companyName || "--"}</Typography>
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
              {t("company_email_Lbl")}
            </Typography>
            <Typography variant="text14">{email || "--"}</Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("company_phone_Lbl")}
            </Typography>
            <Typography variant="text14">
              {formatPhoneNumber(phone) || "--"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography
            variant="text12"
            color="custom.blue.6"
            sx={{ mb: 1.5, mt: 3.5 }}
          >
            {t("company_website_Lbl")}
          </Typography>
          <Typography variant="text14">{companyWebsite || "--"}</Typography>
        </Grid>
        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("input_countryLabel")}
            </Typography>
            <Typography variant="text14">
              {country ? Country.getCountryByCode(country)?.name : "--"}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              City
            </Typography>
            <Typography variant="text14">{city || "--"}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" gap={2.5}>
          <Grid item xs>
            <Typography
              variant="text12"
              color="custom.blue.6"
              sx={{ mb: 1.5, mt: 3.5 }}
            >
              {t("company_address_Lbl")}
            </Typography>
            <Typography variant="text14">{companyAddress || "--"}</Typography>
          </Grid>
          <Grid item xs></Grid>
          <Grid container direction="row" gap={2.5}>
            <Grid item xs>
              <Typography
                variant="text12"
                color="custom.blue.6"
                sx={{ mb: 1.5, mt: 3.5 }}
              >
                {t("postal_code_Lbl")}
              </Typography>
              <Typography variant="text14">{postalCode || "--"}</Typography>
            </Grid>
            <Grid item xs>
              <Typography
                variant="text12"
                color="custom.blue.6"
                sx={{ mb: 1.5, mt: 3.5 }}
              >
                {t("tax_identification_number_Lbl")}
              </Typography>
              <Typography variant="text14">
                {taxIdentificationNumber || "--"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </NBOCard>
      <NBOCard title={t("about_Lbl")}>
        <Grid item sx={{ mb: 3.5 }}>
          <Grid container direction="row" gap={2.5}>
            <Grid item xs>
              <Typography
                variant="text12"
                color="custom.blue.6"
                sx={{ mb: 1.5, mt: 3.5 }}
              >
                {t("about_Lbl")}
              </Typography>
              <Typography variant="text14">
                {companyDescriptionAbout || "--"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </NBOCard>
    </Stack>
  );
};
