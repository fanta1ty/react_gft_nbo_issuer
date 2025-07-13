import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useDataGridQueryParams from "@/utils/useDataGridQueryParams";
import { DataGridPagination } from "@/components";
import useGetColumns from "./useGetColumns";
import { UserCredentialType } from "@/api/useGetCertificates";
import { CREDENTIAL_STATUS } from "@/constants";
import { useState } from "react";

type Props = {
  userCredentials: UserCredentialType[];
  isLoading: boolean;
};
const PAGE_SIZE = 4;

const StudentsDataGrid = ({ userCredentials, isLoading }: Props) => {
  const { paginationModel, sortModel, setPaginationModel, setSortModel } =
    useDataGridQueryParams({ pageSize: PAGE_SIZE });
  const [localIsLoading, setLocalIsLoading] = useState(false);
  const columns = useGetColumns(setLocalIsLoading);

  return (
    <Box sx={{ bgcolor: "common.white", borderRadius: 3, px: 5, mb: 5 }}>
      <DataGrid
        loading={isLoading || localIsLoading}
        rows={userCredentials}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        pageSizeOptions={[PAGE_SIZE]}
        getRowId={(row) => row.user.id}
        slots={{
          pagination: DataGridPagination,
        }}
        rowSelection={false}
        rowHeight={88}
        autoHeight
        sx={{
          "& .MuiDataGrid-cell:first-of-type": {
            paddingLeft: 0,
            paddingRight: 0,
          },
          "& .MuiDataGrid-cell:last-of-type": {
            paddingRight: 0,
          },
          "& .row-disabled": {
            background: "#EAEBEC",
            pointerEvents: "none",
          },
        }}
        getRowClassName={(params) => {
          const isDisable =
            params.row.credential.status === CREDENTIAL_STATUS.REVOKED ||
            params.row.credential.status === CREDENTIAL_STATUS.EXPIRED;
          if (isDisable) return "row-disabled";
          return "";
        }}
      />
    </Box>
  );
};

export default StudentsDataGrid;
