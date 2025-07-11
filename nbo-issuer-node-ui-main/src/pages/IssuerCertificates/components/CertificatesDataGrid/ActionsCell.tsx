import { Link as RouterLink, generatePath } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Button, Stack } from "@mui/material";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { useModal } from "mui-modal-provider";
import { ReactComponent as IconCertificateApproved } from "@/assets/icons/ic_certificate_approved.svg";
import { CertificateType } from "@/api/useGetCertificates";
import { AppRoutes } from "@/router/routes";
import NewAssignCertificateDialog from "@/components/NewAssignCertificateDialog";

type ActionsCellProps = {
  params: GridRenderCellParams<CertificateType>;
};

const ActionsCell = ({ params }: ActionsCellProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { showModal } = useModal();

  const { row } = params;

  const certificate = {
    id: row.id,
    title: row.title,
  };

  const handleAssignClick = () => {
    showModal(NewAssignCertificateDialog, {
      certificate,
      onAssignSuccess() {
        queryClient.invalidateQueries({ queryKey: ["certificates"] });
      },
    });
  };

  return (
    <Stack direction="row" gap={1}>
      <Button
        variant="outlined"
        color="black"
        size="small"
        component={RouterLink}
        to={generatePath(AppRoutes.ISSUER_CERTIFICATE_DETAILS, {
          id: row.id,
        })}
      >
        {t("button_viewText")}
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<IconCertificateApproved width={16} />}
        onClick={handleAssignClick}
      >
        {t("button_assignText")}
      </Button>
    </Stack>
  );
};

export default ActionsCell;
