import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { DataGridPagination } from "@/components";
import useGetColumns, { TemplateType } from "./useGetColumns";
import { useTranslation } from "react-i18next";
import { useModal } from "mui-modal-provider";
import PublishTemplateModal from "../PublishTemplateModal";

type Props = {
  data: TemplateType[];
  isLoading: boolean;
};
const PAGE_SIZE = 20;

const TemplateDataGrid = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  const { showModal } = useModal();
  const handlePublishTemplate = (template: TemplateType) => {
    showModal(PublishTemplateModal, {
      templateName: template?.fileName || "",
      isReady: !!template?.isReady,
    });
  };
  const columns = useGetColumns(handlePublishTemplate);
  const { paginationModel, sortModel, setPaginationModel, setSortModel } =
    useDataGridQueryParams({ pageSize: PAGE_SIZE });

  return (
    <Box sx={{ bgcolor: "common.white", borderRadius: 3, px: 5, mb: 5 }}>
      <DataGrid
        rows={data}
        loading={isLoading}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[PAGE_SIZE]}
        slots={{
          pagination: DataGridPagination,
          noRowsOverlay: () => (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div>{t("noRows")}</div>
            </div>
          ),
        }}
        rowSelection={false}
        rowHeight={88}
        autoHeight
        sx={{
          "& .MuiDataGrid-row": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-cell:first-of-type": {
            paddingLeft: 0,
            paddingRight: 0,
          },
          "& .MuiDataGrid-cell:last-of-type": {
            paddingRight: 0,
          },
        }}
      />
    </Box>
  );
};

export default TemplateDataGrid;
