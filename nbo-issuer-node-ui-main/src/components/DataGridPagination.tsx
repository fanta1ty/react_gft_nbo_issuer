import { Box, Pagination } from "@mui/material";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

const DataGridPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        position: "absolute",
        bottom: -90,
      }}
    >
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        hideNextButton
        hidePrevButton
        page={page + 1}
        count={pageCount}
        onChange={(_: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
    </Box>
  );
};

export default DataGridPagination;
