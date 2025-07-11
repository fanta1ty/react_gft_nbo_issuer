import { useMemo } from "react";
import { Link as RouterLink, generatePath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import uniqBy from "lodash/uniqBy";
import { Avatar as EmptyAvatar, Box, Stack } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { CertificateType } from "@/api/useGetCertificates";
import { AppRoutes } from "@/router/routes";
import certificateThumbnail from "@/assets/images/certificate-thumbnail.jpg";
import certificateThumbnail2x from "@/assets/images/certificate-thumbnail@2x.jpg";
import { LineClampTypography } from "@/components";
import ActionsCell from "./ActionsCell";
import Avatar from "@/components/Avatar";

const columns = (t: TFunction): GridColDef<CertificateType>[] => [
  {
    field: "description",
    headerName: "",
    width: 173,
    disableColumnMenu: true,
    sortable: false,
    renderCell(params) {
      return (
        <img
          src={certificateThumbnail}
          srcSet={`${certificateThumbnail} 1x, ${certificateThumbnail2x} 2x`}
          alt={params.value}
          width="100%"
        />
      );
    },
  },
  {
    field: "title",
    headerName: t("th_certificateName"),
    flex: 1.2,
    disableColumnMenu: true,
    renderCell({ row }) {
      return (
        <Box sx={{ mt: 2.5, pr: 10, alignSelf: "flex-start" }}>
          <LineClampTypography
            variant="text16"
            fontWeight={600}
            whiteSpace="pre-wrap"
            color="custom.dark.6"
            sx={{ mb: 2, textTransform: "capitalize" }}
            lines={1}
          >
            {row.title}
          </LineClampTypography>
          <LineClampTypography
            variant="text14"
            fontWeight={400}
            whiteSpace="pre-wrap"
            color="custom.dark.6"
            lines={4}
          >
            {row.description}
          </LineClampTypography>
        </Box>
      );
    },
  },
  {
    field: "userCredentials",
    headerName: t("th_certificateAssignedToUsers"),
    flex: 1,
    disableColumnMenu: true,
    valueGetter: ({ row }) => row?.userCredentials?.length ?? 0,
    renderCell({ row, colDef }) {
      const { userCredentials } = row;
      if (!userCredentials) return null;
      const uniqueUserCredentials = uniqBy(userCredentials, "user.id");
      const columnWidth = colDef.computedWidth;
      const avatarWidth = 44; // avatar width = 40px, gap = 4px
      const padding = 100; // leave 100px space to the right
      const toDisplay = Math.floor((columnWidth - padding) / avatarWidth);
      const remain = uniqueUserCredentials.length - toDisplay;
      return (
        <Stack direction="row" gap={0.5}>
          {uniqueUserCredentials
            .slice(0, toDisplay)
            .map((singleUserCredentials) => (
              <Avatar
                key={singleUserCredentials.user.id}
                firstName={singleUserCredentials.user.firstName}
                lastName={singleUserCredentials.user.lastName}
                size={40}
                url={generatePath(AppRoutes.ISSUER_STUDENT_DETAILS, {
                  id: singleUserCredentials.user.id,
                })}
              />
            ))}
          {remain > 0 && (
            <EmptyAvatar
              component={RouterLink}
              to={AppRoutes.ISSUER_STUDENTS}
              sx={{
                color: "custom.dark.6",
                backgroundColor: "custom.dark.1",
                fontSize: (theme) => theme.typography.pxToRem(14),
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "custom.dark.2",
                },
              }}
            >{`+${remain}`}</EmptyAvatar>
          )}
        </Stack>
      );
    },
  },
  {
    field: "id",
    headerName: "",
    width: 240,
    align: "right",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => <ActionsCell params={params} />,
  },
];

const useGetColumns = () => {
  const { t } = useTranslation();
  return useMemo(() => columns(t), [t]);
};

export default useGetColumns;
