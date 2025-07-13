import { useMemo } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import type { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { ReactComponent as IconTemplate } from "@/assets/icons/ic_template.svg";
import { dark } from "@/theme/colors";
import { formatDate } from "@/utils/datetime";
import StatusTag from "../StatusTag";
import { ReactComponent as IconEdit } from "@/assets/icons/ic_edit.svg";
import { ReactComponent as IconDelete } from "@/assets/icons/ic_delete.svg";
import { Status } from "@/@types";
import useDeactivateTemplate from "@/api/useDeactivateTemplate";
import useActivateTemplate from "@/api/useActivateTemplate";
import { queryClient } from "@/reactQuery/queryClient";
import useDeleteSchema from "@/api/useDeleteSchema";
import { useSetRecoilState } from "recoil";
import { globalSnackbarState } from "@/recoil/atoms";

export type TemplateType = {
  id: string;
  fileName: string;
  isReady: boolean;
  isPublished: boolean;
  lastUpdated: Date;
  status: Status;
  jsonSchemaCid: string;
};

const columns = (
  t: TFunction,
  navigate: NavigateFunction,
  handlePublishTemplate: (template: TemplateType) => void,
  activate: ({ schemaId }: { schemaId: string }) => void,
  deactivate: ({ schemaId }: { schemaId: string }) => void,
  deleteTemplate: ({ schemaId }: { schemaId: string }) => void,
): GridColDef<TemplateType>[] => [
  {
    field: "fileName",
    headerName: t("file_name"),
    disableColumnMenu: true,
    minWidth: 300,
    renderCell({ row }) {
      return (
        <Box display={"flex"} gap={2}>
          <IconTemplate />
          <Typography
            variant="text14"
            whiteSpace="pre-wrap"
            textTransform="capitalize"
            fontWeight={400}
            lineHeight={3.5}
          >
            {row.fileName}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "isReady",
    headerName: t("template_schema"),
    flex: 0.5,
    disableColumnMenu: true,
    width: 120,
    renderCell({ row }) {
      return (
        <Typography
          variant="text14"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          fontWeight={400}
        >
          {row.isReady ? t("ready") : t("not_ready")}
        </Typography>
      );
    },
  },
  {
    field: "lastUpdated",
    headerName: t("last_updated"),
    flex: 0.5,
    disableColumnMenu: true,
    width: 120,
    sortComparator: (v1, v2) => {
      return v1.getDate() - v2.getDate();
    },
    renderCell({ row }) {
      return (
        <Typography
          variant="text14"
          whiteSpace="pre-wrap"
          textTransform="capitalize"
          fontWeight={400}
        >
          {formatDate(row.lastUpdated)}
        </Typography>
      );
    },
  },
  {
    field: "status",
    headerName: t("th_studentStatus"),
    flex: 0.5,
    disableColumnMenu: true,
    width: 120,
    renderCell({ row }) {
      return <StatusTag type={row.status} negativeStatus={true} />;
    },
  },
  {
    field: "action",
    headerName: "",
    flex: 0.5,
    minWidth: 300,
    sortable: false,
    disableColumnMenu: true,
    renderCell({ row }) {
      if (row.status === Status.INACTIVE) {
        return (
          <Box display="flex" gap={1}>
            {row.isPublished ? (
              <>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => activate({ schemaId: row.id })}
                >
                  {t("activate_Lbl")}
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={() =>
                    navigate(`/issuer/template-repository/${row.id}`)
                  }
                >
                  <IconEdit />
                </IconButton>
              </>
            ) : null}
          </Box>
        );
      }

      if (row.status === Status.ACTIVE) {
        return (
          <Box display="flex" gap={1}>
            {row.isPublished ? (
              <>
                <Button
                  size="small"
                  variant="outlined"
                  color="black"
                  onClick={() => deactivate({ schemaId: row.id })}
                >
                  {t("deActivate_Lbl")}
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  onClick={() =>
                    navigate(`/issuer/template-repository/${row.id}`)
                  }
                >
                  <IconEdit />
                </IconButton>
              </>
            ) : null}
          </Box>
        );
      }

      if (row.status === Status.DRAFT) {
        return (
          <Box display="flex" gap={1}>
            {row.isReady ? (
              <Button
                color="primary"
                size="small"
                onClick={() => handlePublishTemplate(row)}
              >
                {t("publish")}
              </Button>
            ) : (
              <Button
                size="small"
                sx={{ backgroundColor: dark[6] }}
                onClick={() =>
                  navigate(
                    `/issuer/template-repository/${row.id}/define-schema`,
                  )
                }
              >
                {t("define")}
              </Button>
            )}
            <IconButton
              size="small"
              aria-label="close"
              onClick={() => navigate(`/issuer/template-repository/${row.id}`)}
            >
              <IconEdit />
            </IconButton>
            <IconButton
              size="small"
              aria-label="delete"
              onClick={() => deleteTemplate({ schemaId: row.id })}
            >
              <IconDelete stroke="red" />
            </IconButton>
          </Box>
        );
      }
    },
  },
];

const useGetColumns = (
  handlePublishTemplate: (template: TemplateType) => void,
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);
  const commonMutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries(["register-schema"]);
      setGlobalSnackbar({
        message: "Operation Success",
        severity: "success",
      });
    },
    onError: () => {
      setGlobalSnackbar({
        message: "There was an error during the operation",
        severity: "error",
      });
    },
  };
  const { mutate: deactivate } = useDeactivateTemplate(commonMutationOptions);
  const { mutate: activate } = useActivateTemplate(commonMutationOptions);
  const { mutate: deleteTemplate } = useDeleteSchema(commonMutationOptions);
  return useMemo(
    () =>
      columns(
        t,
        navigate,
        handlePublishTemplate,
        activate,
        deactivate,
        deleteTemplate,
      ),
    [t, navigate, handlePublishTemplate, activate, deactivate, deleteTemplate],
  );
};

export default useGetColumns;
