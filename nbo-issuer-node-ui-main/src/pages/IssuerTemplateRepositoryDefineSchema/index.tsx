import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import NavigationBreadcrumbs from "@/components/NavigationBreadcrumbs";
import { useTranslation } from "react-i18next";
import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import DefineSchemaForm from "@/components/DefineSchemaForm";

import useGetRegisterSchemaById from "@/api/getRegisterSchemaById";
import { AppRoutes } from "@/router/routes";
import getErrorMessage from "@/utils/getErrorMessage";

const TemplateRepositoryDefineSchema = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const isReadOnly = query.get("readOnly") === "true";
  const { id = "" } = useParams();
  const { data: template, error, isLoading } = useGetRegisterSchemaById({ id });
  const breadcrumbData = [
    { label: t("templates"), path: AppRoutes.ISSUER_TEMPLATE_REPOSITORY },
    {
      label: template?.schemaType ?? "Details",
      path: generatePath(AppRoutes.ISSUER_TEMPLATE_REPOSITORY_DETAILS, {
        id,
      }),
    },
    {
      label: t("define_schema"),
      path: generatePath(AppRoutes.ISSUER_TEMPLATE_REPOSITORY_DEFINE_SCHEMA, {
        id,
      }),
    },
  ];

  const backToDetailsScreen = () => {
    navigate(
      generatePath(AppRoutes.ISSUER_TEMPLATE_REPOSITORY_DETAILS, { id }),
    );
  };

  return (
    <Box sx={{ py: 5, pb: 3.5 }}>
      <Box sx={{ width: 1200, margin: "auto" }}>
        <NavigationBreadcrumbs breadcrumbs={breadcrumbData} />
        <Typography variant="h4" fontWeight="600" sx={{ mt: 1.5, mb: 2.5 }}>
          {t("define_schema")}
        </Typography>
        {isLoading && (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        )}
        {template && (
          <DefineSchemaForm
            readOnly={isReadOnly}
            schema={template}
            onSuccess={backToDetailsScreen}
            onCancel={backToDetailsScreen}
          />
        )}
        {error && <Alert severity="error">{getErrorMessage(error)}</Alert>}
      </Box>
    </Box>
  );
};

export default TemplateRepositoryDefineSchema;
