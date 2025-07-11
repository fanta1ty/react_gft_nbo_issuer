import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { DataGridPagination } from "@/components";
import useGetColumns from "./useGetColumns";
import { CertificateType } from "@/api/useGetCertificates";
import { useTranslation } from "react-i18next";

type Props = {
  certificates: CertificateType[];
  isLoading: boolean;
};
const PAGE_SIZE = 20;

const CertificatesDataGrid = ({ certificates, isLoading }: Props) => {
  const { t } = useTranslation();

  const { paginationModel, sortModel, setPaginationModel, setSortModel } =
    useDataGridQueryParams({ pageSize: PAGE_SIZE });

  const columns = useGetColumns();

  return (
    <Box sx={{ bgcolor: "common.white", borderRadius: 3, px: 5, mb: 5 }}>
      <DataGrid
        loading={isLoading}
        rows={certificates}
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
        rowHeight={166}
        autoHeight
        sx={{
          "& .MuiDataGrid-cell:first-of-type": {
            paddingLeft: 0,
          },
          "& .MuiDataGrid-cell:last-of-type": {
            paddingRight: 0,
          },
        }}
      />
    </Box>
  );
};

export default CertificatesDataGrid;
