import { useTranslation } from "react-i18next";
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Chip,
  IconButton,
  styled,
  Stack,
} from "@mui/material";
import StatusTag from "../IssuerTemplateRepository/components/StatusTag";
import { blue } from "@/theme/colors";

import { ReactComponent as GlobeIcon } from "@/assets/icons/ic_website.svg";
import { ReactComponent as EmailIcon } from "@/assets/icons/ic_mail.svg";
import { ReactComponent as PhoneIcon } from "@/assets/icons/ic_phone.svg";
import { ReactComponent as EditIcon } from "@/assets/icons/ic_edit.svg";
import { RepresentativeDetails } from "./components/Details";
import { useAuthContext } from "@/router/Auth";
import avatarIssuer from "@/assets/images/avatar-issuer.png";
import { Status } from "@/@types";

const IssuerRepresentative = () => {
  const { t } = useTranslation();
  const { firstName, lastName, isAdmin } = useAuthContext();

  return (
    <>
      <Box sx={{ pt: 5, backgroundColor: "#fff" }}>
        <Box sx={{ width: 1200, margin: "auto" }}>
          <Grid container spacing={2} sx={{ mt: 0, mb: 3 }}>
            <Grid item xs={9} display="flex" alignItems="center">
              <Box display="flex" gap={2} sx={{ mb: 2 }} alignItems="center">
                <Avatar
                  sx={{ width: 80, height: 80, borderRadius: "4px" }}
                  // mock for now
                  src={avatarIssuer}
                />
                <Box display="flex" flexDirection="column" gap={0.5}>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    textTransform="capitalize"
                  >
                    MediaHub Solutions
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center">
                    <StatusTag type={Status.DRAFT} />
                  </Box>
                </Box>
              </Box>
              <>
                <Box
                  sx={{
                    height: 28,
                    width: "1px",
                    mx: 8,
                    background: blue[2],
                  }}
                ></Box>
                <Box display="flex" gap={2} sx={{ mb: 2 }} alignItems="center">
                  <Avatar alt="User Avatar" src={avatarIssuer} />
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Typography variant="text16" fontWeight="600">
                      {`${firstName} ${lastName}`}
                    </Typography>
                    <Box display="flex" gap={1} alignItems="center">
                      <Chip
                        label={
                          isAdmin
                            ? t("super_representative")
                            : t("representative")
                        }
                        color="default"
                        size="small"
                      />
                    </Box>
                  </Box>
                </Box>
              </>
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
                // href={ensureHttpPrefix("tt.com.pl" || "")}
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
              <IconButton component="a">
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Root mt={3.5} mb={20} mx="auto">
        <RepresentativeDetails />
      </Root>
    </>
  );
};

const Root = styled(Stack)(({ theme }) => ({
  width: "80%",
  marginTop: theme.spacing(3.5),
}));

export default IssuerRepresentative;
