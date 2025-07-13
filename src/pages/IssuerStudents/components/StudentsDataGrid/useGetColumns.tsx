import { useMemo } from "react";
import { Chip, Stack, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { Link as RouterLink, generatePath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import Scrollbars from "react-custom-scrollbars-2";
import uniqBy from "lodash/uniqBy";
import { ReactComponent as IconCertificateApproved } from "@/assets/icons/ic_certificate_approved.svg";
import { StudentType } from "@/api/useGetStudents";
import { AppRoutes } from "@/router/routes";
import { formatNationalId } from "@/utils/format";
import Avatar from "@/components/Avatar";

const columns = (t: TFunction): GridColDef<StudentType>[] => [
  {
    field: "avatar",
    headerName: "",
    width: 60,
    minWidth: 60,
    disableColumnMenu: true,
    sortable: false,
    renderCell({ row }) {
      return (
        <Avatar
          avatar={row.avatar}
          firstName={row.firstName}
          lastName={row.lastName}
          size={40}
        />
      );
    },
  },
  {
    field: "firstName",
    headerName: t("th_studentFirstName"),
    flex: 0.5,
    disableColumnMenu: true,
    renderCell({ row }) {
      return (
        <Typography
          variant="text14"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          fontWeight={400}
        >
          {row.firstName}
        </Typography>
      );
    },
  },
  {
    field: "lastName",
    headerName: t("th_studentLastName"),
    flex: 0.5,
    disableColumnMenu: true,

    renderCell({ row }) {
      return (
        <Typography
          variant="text14"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          fontWeight={400}
        >
          {row.lastName}
        </Typography>
      );
    },
  },
  {
    field: "nationalId",
    headerName: t("th_studentNationalId"),
    flex: 1,
    disableColumnMenu: true,
    renderCell({ row }) {
      return (
        <Typography
          variant="text14"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          fontWeight={400}
        >
          {formatNationalId(row.nationalId)}
        </Typography>
      );
    },
  },
  {
    field: "certificates",
    headerName: t("th_studentCertificates"),
    flex: 2,
    disableColumnMenu: true,
    valueGetter: ({ row }) => row.certificates?.length,
    renderCell({ row }) {
      const { certificates = [] } = row;
      const uniqueCertificates = uniqBy(certificates, "id");
      const toDisplay =
        uniqueCertificates.length <= 2 ? uniqueCertificates.length : 1;
      const remain = uniqueCertificates.length - toDisplay;
      return (
        <Scrollbars autoHeight autoHide>
          <Stack direction="row" alignItems="center" gap={1}>
            {uniqueCertificates.slice(0, toDisplay).map(({ title, id }) => (
              <Chip
                component={RouterLink}
                label={title}
                key={id}
                icon={<IconCertificateApproved />}
                size="medium"
                sx={{ pl: 1, textTransform: "capitalize" }}
                to={generatePath(AppRoutes.ISSUER_CERTIFICATE_DETAILS, {
                  id,
                })}
                clickable
                title={title}
              />
            ))}
            {remain > 0 && (
              <Chip
                component={RouterLink}
                label={`+${remain}`}
                icon={<IconCertificateApproved />}
                size="medium"
                sx={{ pl: 1 }}
                to={AppRoutes.ISSUER_CERTIFICATES}
                clickable
              />
            )}
          </Stack>
        </Scrollbars>
      );
    },
  },
];

const useGetColumns = () => {
  const { t } = useTranslation();
  return useMemo(() => columns(t), [t]);
};

export default useGetColumns;
