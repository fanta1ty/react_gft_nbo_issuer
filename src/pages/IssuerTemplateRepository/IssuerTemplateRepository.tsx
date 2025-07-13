import { useTranslation } from "react-i18next";
import { Typography, Box, styled, InputAdornment, Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { ReactComponent as IconSearch } from "@/assets/icons/ic_search.svg";
import { DebounceTextField } from "@/components";
import TemplateDataGrid from "./components/TemplateDataGrid";
import NewTemplateDialog from "./components/NewTemplateDialog";
import { useMemo } from "react";
import useGetRegisterSchema from "@/api/getRegisterSchema";

const IssuerTemplateRepository = () => {
  const { t } = useTranslation();
  const { showModal } = useModal();
  const { data: templates, isLoading } = useGetRegisterSchema();
  const { keyword, setKeyword } = useDataGridQueryParams();

  const handleClickCreate = () => {
    showModal(NewTemplateDialog);
  };
  const data = useMemo(() => {
    return (
      templates?.map((template) => {
        return {
          id: template.schemaId,
          fileName: template.schemaType,
          isReady: !!template.schemaFields && template.schemaFields.length > 0,
          isPublished: !!template.jsonSchemaCid,
          lastUpdated: new Date(template.modifiedAt),
          status: template.status,
          jsonSchemaCid: template.jsonSchemaCid,
        };
      }) || []
    );
  }, [templates]);
  const filteredData = useMemo(() => {
    if (!keyword) {
      return data;
    }
    const filtered = data.filter((template) => {
      const name = template.fileName
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const isReadyToText = template.isReady ? t("ready") : t("not_ready");
      const matchIsReady = isReadyToText
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchUpdatedDate = new Date(template.lastUpdated)
        .toISOString()
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchStatus = template.status
        .toLowerCase()
        .includes(keyword.toLowerCase());

      return name || matchIsReady || matchUpdatedDate || matchStatus;
    });

    return filtered;
  }, [keyword, t, data]);
  const templateCount = data ? `(${filteredData.length})` : "";

  return (
    <Root mt={5.5} mb={20} mx="auto">
      <Typography variant="h4">
        {`${t("templates_title")} ${templateCount}`}
      </Typography>
      <Box display={"flex"} justifyContent={"space-between"} sx={{ my: 2.5 }}>
        <DebounceTextField
          defaultValue={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t("input_searchPlaceholder")}
          sx={{ width: 320 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch />
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleClickCreate}
          color="primary"
          sx={{ minWidth: "180px" }}
        >
          {t("create_template_btn")}
        </Button>
      </Box>
      <TemplateDataGrid data={filteredData} isLoading={isLoading} />
    </Root>
  );
};

const Root = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 1400,
  padding: theme.spacing(0, 2.5),
}));

export default IssuerTemplateRepository;
