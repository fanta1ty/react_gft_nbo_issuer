import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { DataGridPagination } from "@/components";
import useGetColumns from "./useGetColumns";
import { useTranslation } from "react-i18next";
import { RepresentativeType } from "@/api/useGetRePresentative";

type Props = {
  data: RepresentativeType[];
};
const PAGE_SIZE = 20;

const RepresentativeDataGrid = ({ data }: Props) => {
  const { t } = useTranslation();
  const columns = useGetColumns();
  const { paginationModel, sortModel, setPaginationModel, setSortModel } =
    useDataGridQueryParams({ pageSize: PAGE_SIZE });
  return (
    <Box sx={{ bgcolor: "common.white", borderRadius: 3, px: 5, mb: 5 }}>
      <Box
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        <DataGrid
          rows={data}
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
          autoHeight={false}
          sx={{
            minWidth: 1400,
            width: "100%",
            "& .MuiDataGrid-root": {
              overflowX: "auto",
            },
            "& .MuiDataGrid-main": {
              overflowX: "auto",
            },
            "& .MuiDataGrid-virtualScroller": {
              overflowX: "auto",
            },
            "& .MuiDataGrid-row": {
              cursor: "pointer",
              "&.Mui-hovered": {
                backgroundColor: "#eef8f3",
              },
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
    </Box>
  );
};

export default RepresentativeDataGrid;
