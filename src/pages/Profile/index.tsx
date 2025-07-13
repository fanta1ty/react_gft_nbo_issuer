import { useTranslation } from "react-i18next";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  IconButton,
  styled,
} from "@mui/material";
import { ReactComponent as GlobeIcon } from "@/assets/icons/ic_website.svg";
import { ReactComponent as EmailIcon } from "@/assets/icons/ic_mail.svg";
import { ReactComponent as PhoneIcon } from "@/assets/icons/ic_phone.svg";
import { ensureHttpPrefix } from "@/utils/ensureHttpPrefix";
import NBOCard from "@/components/NBOCard";
import { formatPhoneNumber } from "@/utils/phoneOperations";
import { Country } from "country-state-city";
import { formatDate } from "@/utils/datetime";

const Profile = () => {
  const { t } = useTranslation();

  const { phone, country, city, email, dob } = {
    phone: "+966 567 890 123",
    country: "AX",
    city: "Jeddah",
    email: "contact@mhsolutions.com",
    dob: new Date(),
  };
  return (
    <>
      <Box sx={{ pt: 5, backgroundColor: "#fff" }}>
        <Box sx={{ width: 1200, margin: "auto", pb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={9} display="flex" alignItems="center">
              <Box display="flex" gap={2} alignItems="center">
                <Avatar sx={{ width: 80, height: 80, borderRadius: "4px" }} />
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    textTransform="capitalize"
                  >
                    Mehmet Akif
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center">
                    <Chip
                      label={"Super representative"}
                      color="positive"
                      size="medium"
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              gap={1}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <IconButton
                component="a"
                href={ensureHttpPrefix("tt.com.pl" || "")}
                target="_blank"
              >
                <GlobeIcon />
              </IconButton>
              <IconButton
                component="a"
                href={`mailto:${"wojtaszekh@gmail.com"}`}
              >
                <EmailIcon />
              </IconButton>
              <IconButton component="a" href={`tel:${"555666"}`}>
                <PhoneIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Root mt={3.5} mb={20} mx="auto">
        <Grid
          container
          direction="column"
          gap={2.5}
          sx={{
            overflowWrap: "anywhere",
          }}
        >
          <NBOCard title={t("company_details_Lbl")}>
            <Grid container direction="row" gap={2.5}>
              <Grid item xs>
                <Typography
                  variant="text12"
                  color="custom.blue.6"
                  sx={{ mb: 1.5, mt: 3.5 }}
                >
                  {t("phone_Lbl")}
                </Typography>
                <Typography variant="text14">
                  {formatPhoneNumber(phone) || "--"}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="text12"
                  color="custom.blue.6"
                  sx={{ mb: 1.5, mt: 3.5 }}
                >
                  {t("email_Lbl")}
                </Typography>
                <Typography variant="text14">{email || "--"}</Typography>
              </Grid>
            </Grid>
            <Grid container direction="row" gap={2.5}>
              <Grid item xs>
                <Typography
                  variant="text12"
                  color="custom.blue.6"
                  sx={{ mb: 1.5, mt: 3.5 }}
                >
                  {t("nationality_Lbl")}
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
                  {t("nationalId_Lbl")}
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
                  {t("date_of_birth_Lbl")}
                </Typography>
                <Typography variant="text14">{formatDate(dob)}</Typography>
              </Grid>
            </Grid>
          </NBOCard>
        </Grid>
      </Root>
    </>
  );
};

const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 920,
  padding: theme.spacing(0, 2.5),
  marginTop: theme.spacing(3.5),
}));

export default Profile;
