import { useTranslation } from "react-i18next";
import { Button, Stack } from "@mui/material";
import { ReactComponent as IconCertificateApproved } from "@/assets/icons/ic_certificate_approved.svg";
import { AppRoutes } from "@/router/routes";
import NavLink from "./NavLink";
import { useModal } from "mui-modal-provider";
import NewAssignCertificateDialog from "@/components/NewAssignCertificateDialog";
import { useQueryClient } from "@tanstack/react-query";
import {
  useLocation,
  useParams,
  matchPath,
  Link as RouterLink,
} from "react-router-dom";
const Nav = () => {
  const { showModal } = useModal();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { id = "" } = useParams();
  const handleClickAssignCergficate = () => {
    showModal(NewAssignCertificateDialog, {
      onAssignSuccess() {
        if (matchPath(AppRoutes.ISSUER_CERTIFICATES, location.pathname)) {
          queryClient.invalidateQueries(["certificates"]);
        }
        if (matchPath(AppRoutes.ISSUER_STUDENT_DETAILS, location.pathname)) {
          queryClient.invalidateQueries(["users", id]);
        }
      },
    });
  };

  return (
    <Stack direction="row" gap={6.5} alignItems="center">
      <NavLink label={t("nav_students")} route={AppRoutes.ISSUER_STUDENTS} />
      <NavLink
        label={t("nav_certificates")}
        route={AppRoutes.ISSUER_CERTIFICATES}
      />
      <NavLink
        label={t("nav_template_repository")}
        route={AppRoutes.ISSUER_TEMPLATE_REPOSITORY}
      />
      <Button
        component={RouterLink}
        startIcon={<IconCertificateApproved width={16} height={16} />}
        color="primary"
        size="small"
        to={AppRoutes.CREATE_NEW_CERTIFICATE}
      >
        {t("nav_createCertificate")}
      </Button>
      <Button
        startIcon={<IconCertificateApproved width={16} height={16} />}
        color="primary"
        size="small"
        sx={{ ml: -5 }}
        onClick={handleClickAssignCergficate}
      >
        {t("nav_assignCertificate")}
      </Button>
    </Stack>
  );
};

export default Nav;
