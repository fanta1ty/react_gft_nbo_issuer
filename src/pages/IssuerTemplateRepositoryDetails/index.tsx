import { useMemo } from "react";
import { Typography, Box, styled, Button, Grid } from "@mui/material";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import NavigationBreadcrumbs from "@/components/NavigationBreadcrumbs";
import { useTranslation } from "react-i18next";
import { useModal } from "mui-modal-provider";
import { formatDate } from "@/utils/datetime";
import useGetRegisterSchemaById from "@/api/getRegisterSchemaById";
import StatusTag from "../IssuerTemplateRepository/components/StatusTag";
import { AppRoutes } from "@/router/routes";
import AssignIssuer from "./components/AssignIssuer";
import TemplateSchema from "./components/TemplateSchema";
import PublishTemplateModal from "./components/PublishTemplateModal";

import { ReactComponent as IconTemplate } from "@/assets/icons/ic_template.svg";

const TemplateRepositoryDetails = () => {
  const { t } = useTranslation();
  const { id = "" } = useParams();
  const { data: template } = useGetRegisterSchemaById({ id });
  const { showModal } = useModal();
  const navigate = useNavigate();

  const data = useMemo(() => {
    return template
      ? {
          id: template.schemaId,
          fileName: template.schemaType,
          isReady: !!template.schemaFields && template.schemaFields.length > 0,
          isPublished: !!template.jsonSchemaCid,
          lastUpdated: template.modifiedAt,
          status: template.status,
          issuers: template.issuers,
          jsonSchemaCid: template.jsonSchemaCid,
          templateUrl: template.templateUrl || "",
          description: template.description || "",
        }
      : {};
  }, [template]);

  const breadcrumbData = [
    { label: t("templates"), path: AppRoutes.ISSUER_TEMPLATE_REPOSITORY },
    {
      label: data?.fileName ?? "",
      path: generatePath(AppRoutes.ISSUER_TEMPLATE_REPOSITORY_DETAILS, {
        id,
      }),
    },
  ];

  const handlePublishTemplate = () => {
    showModal(PublishTemplateModal, {
      templateName: data?.fileName || "",
      isReady: !!data?.isReady,
      schemaId: data?.id || "",
      navigateToSchema: () =>
        navigate(`/issuer/template-repository/${id}/define-schema`),
    });
  };

  return (
    <>
      <Box sx={{ py: 5, backgroundColor: "#fff", pb: 3.5 }}>
        <Box sx={{ width: 1200, margin: "auto" }}>
          <NavigationBreadcrumbs breadcrumbs={breadcrumbData} />
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={9}>
              <Box display="flex" gap={2} sx={{ mb: 2 }}>
                <IconTemplate width={80} height={80} />
                <Box display="flex" flexDirection="column" gap={0.5}>
                  <Typography variant="h4" fontWeight="600">
                    {data?.fileName}
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center">
                    <StatusTag type={data?.status} />
                    <>
                      <Typography
                        color="custom.dark.3"
                        variant="text14"
                        fontWeight="400"
                      >
                        {t("last_updated")}:
                      </Typography>
                      <Typography variant="text14" fontWeight="400">
                        {formatDate(
                          data.lastUpdated
                            ? new Date(data.lastUpdated)
                            : new Date(),
                        )}
                      </Typography>
                    </>
                  </Box>
                </Box>
              </Box>
              <Typography variant="text14" fontWeight="400">
                {data.description}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Box display="flex" justifyContent="flex-end">
                {!data?.isPublished && (
                  <Button
                    color="primary"
                    size="small"
                    sx={{ minWidth: "180px" }}
                    onClick={handlePublishTemplate}
                  >
                    {t("publish")}
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ width: 1200, margin: "auto", pt: 6.5 }}>
        <Grid
          container
          spacing={2}
          display="flex"
          justifyContent="space-between"
        >
          <GridItem sx={{ width: "calc(60% - 8px)" }}>
            <AssignIssuer id={id} issuers={data?.issuers} />
          </GridItem>
          <GridItem sx={{ width: "calc(40% - 8px)" }}>
            <TemplateSchema
              isReady={data?.isReady}
              isPublished={data?.isPublished}
              id={id}
              fileName={data?.fileName}
              templateUrl={data?.templateUrl}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
const GridItem = styled(Grid)({
  padding: "28px 40px",
  backgroundColor: "#fff",
  borderRadius: "12px",
});

export default TemplateRepositoryDetails;
