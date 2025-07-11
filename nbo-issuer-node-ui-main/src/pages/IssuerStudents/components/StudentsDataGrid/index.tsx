import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridRowParams } from "@mui/x-data-grid";
import { StudentType } from "@/api/useGetStudents";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { DataGridPagination } from "@/components";
import useGetColumns from "./useGetColumns";
import { generatePath, useNavigate } from "react-router-dom";
import { AppRoutes } from "@/router/routes";
import { useTranslation } from "react-i18next";

type Props = {
  students: StudentType[];
  isLoading: boolean;
};
const PAGE_SIZE = 20;

const StudentsDataGrid = ({ students, isLoading }: Props) => {
  const { t } = useTranslation();
  const columns = useGetColumns();
  const navigate = useNavigate();
  const { paginationModel, sortModel, setPaginationModel, setSortModel } =
    useDataGridQueryParams({ pageSize: PAGE_SIZE });

  const handleRowClick = (params: GridRowParams) => {
    const href = generatePath(AppRoutes.ISSUER_STUDENT_DETAILS, {
      id: params.row.id,
    });
    navigate(href);
  };
  return (
    <Box sx={{ bgcolor: "common.white", borderRadius: 3, px: 5, mb: 5 }}>
      <DataGrid
        loading={isLoading}
        rows={students}
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
        onRowClick={handleRowClick}
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

export default StudentsDataGrid;
