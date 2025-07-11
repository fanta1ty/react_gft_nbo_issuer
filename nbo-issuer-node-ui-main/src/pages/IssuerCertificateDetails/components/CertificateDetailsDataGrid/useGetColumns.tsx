import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { generatePath, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { UserCredentialType } from "@/api/useGetCertificates";
import useRevokeCertificate from "@/api/useRevokeCertificate";
import { globalSnackbarState } from "@/recoil/atoms";
import CredentialStatus from "@/components/ CredentialStatus";
import { CREDENTIAL_STATUS } from "@/constants";
import { formatNationalId } from "@/utils/format";
import { AppRoutes } from "@/router/routes";
import Avatar from "@/components/Avatar";
import { RevokeButton } from "../RevokeButton";

type UseRevokeCertificateReturnType = ReturnType<typeof useRevokeCertificate>;
type RevokeCertificateType = UseRevokeCertificateReturnType["mutate"];

const columns = (
  t: TFunction,
  revokeCertificate: RevokeCertificateType,
): GridColDef<UserCredentialType>[] => [
  {
    field: "avatar",
    headerName: "",
    width: 60,
    minWidth: 60,
    disableColumnMenu: true,
    sortable: false,
    valueGetter: ({ row }) => row.user,
    renderCell({ value }) {
      return (
        <div style={{ paddingLeft: 20 }}>
          <Avatar
            firstName={value.firstName}
            lastName={value.lastName}
            size={40}
            url={generatePath(AppRoutes.ISSUER_STUDENT_DETAILS, {
              id: value.id,
            })}
          />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: t("th_studentName"),
    flex: 1,
    disableColumnMenu: true,
    valueGetter: ({ row }) => `${row.user.firstName} ${row.user.lastName}`,
    renderCell({ value }) {
      return (
        <Typography variant="text14" fontWeight={600} whiteSpace="pre-wrap">
          {value}
        </Typography>
      );
    },
  },
  {
    field: "nationalId",
    headerName: t("input_nationalIDLabel"),
    flex: 1,
    disableColumnMenu: true,
    valueGetter: ({ row }) => formatNationalId(row.user.nationalId),
  },
  {
    field: "assignedDate",
    headerName: t("th_studentAssignedDate"),
    disableColumnMenu: true,
    minWidth: 130,
    valueGetter: ({ row }) => row.credential.createdAt || "",
    valueFormatter({ value }) {
      try {
        return value ? format(new Date(value), "MMM dd yyyy") : "";
      } catch (e) {
        console.error(e);
        return "";
      }
    },
  },
  {
    field: "expirationDate",
    headerName: t("th_studentExpirationDate"),
    disableColumnMenu: true,
    minWidth: 130,
    valueGetter: ({ row }) => row.credential.expiresAt || "",
    valueFormatter({ value }) {
      try {
        return value ? format(new Date(value), "MMM dd yyyy") : "";
      } catch (e) {
        console.error(e);
        return "";
      }
    },
  },
  {
    field: "status",
    headerName: t("th_studentStatus"),
    disableColumnMenu: true,
    minWidth: 150,
    valueGetter: ({ row }) => row.credential.status,
    renderCell({ value }) {
      return <CredentialStatus status={value} />;
    },
  },
  {
    field: "id",
    headerName: "",
    minWidth: 130,
    align: "left",
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }) => {
      const status = row.credential.status;
      const isDisplayRevokeButton =
        status === CREDENTIAL_STATUS.PUBLISHED ||
        status === CREDENTIAL_STATUS.ASSIGNED;
      return isDisplayRevokeButton ? (
        <RevokeButton
          onRevoke={revokeCertificate}
          revokeNonce={row.credential.revNonce}
        />
      ) : null;
    },
  },
];

const useGetColumns = (onLoadingStateChange: (isLoading: boolean) => void) => {
  const { t } = useTranslation();

  const { id } = useParams();

  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);

  const queryClient = useQueryClient();

  const { mutate: revokeCertificate, isLoading } = useRevokeCertificate({
    onSuccess: (data) => {
      setGlobalSnackbar({ message: data.message, severity: "success" });
      queryClient.invalidateQueries({ queryKey: ["certificate", id] });
    },
    onError: (data) => {
      setGlobalSnackbar({
        message: (
          <>
            <p>{t("errorRevocationRequest")}</p>
            {data.response?.data?.message && (
              <p>{data.response.data.message}</p>
            )}
          </>
        ),
        severity: "error",
      });
    },
  });
  useEffect(() => {
    onLoadingStateChange(isLoading);
  }, [isLoading, onLoadingStateChange]);
  return useMemo(() => columns(t, revokeCertificate), [t, revokeCertificate]);
};

export default useGetColumns;
