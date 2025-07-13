import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography, Box, Button } from "@mui/material";
import { AppRoutes } from "@/router/routes";
import { UserCredentialType } from "@/api/useGetCertificates";
import { ReactComponent as IconCertificateApproved } from "@/assets/icons/ic_certificate_approved.svg";
import CertificateThumbnail from "@/assets/icons/certificate-thumbnail.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/back.svg";
import { AvatarGroup } from "@/components";

type Props = {
  userCredentials?: UserCredentialType[];
  showAssignCertificatesDialog?: () => void;
  title?: string;
  description?: string;
};

const CertificateTopSection: FC<Props> = ({
  userCredentials = [],
  showAssignCertificatesDialog,
  title = "",
  description = "",
}) => {
  const { t } = useTranslation();

  const avatarList = userCredentials.map(
    (userCredential) => userCredential.user,
  );

  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      sx={{ width: 1200, margin: "auto" }}
      gap="7rem"
    >
      <Box sx={{ width: "100%" }}>
        <RouterLink to={AppRoutes.ISSUER_CERTIFICATES}>
          <Box display="flex" gap={1.5} marginBottom={2} color="custom.dark.7">
            <BackIcon />
            <Typography>{t("button_backText")}</Typography>
          </Box>
        </RouterLink>

        <Typography variant="h4" fontWeight={600} sx={{ marginBottom: 5 }}>
          {title}
        </Typography>
        <Typography variant="text14" fontWeight={400}>
          {description}
        </Typography>
        <Box sx={{ marginTop: 4 }} display={"flex"} gap={2}>
          <Button
            startIcon={<IconCertificateApproved width={16} height={16} />}
            color="primary"
            sx={{ width: 300 }}
            onClick={showAssignCertificatesDialog}
          >
            {t("button_assignCertificateText")}
          </Button>
          <AvatarGroup avatarList={avatarList} />
        </Box>
      </Box>
      <Box>
        <img width={387} height={287} src={CertificateThumbnail} />
      </Box>
    </Box>
  );
};

export default CertificateTopSection;
