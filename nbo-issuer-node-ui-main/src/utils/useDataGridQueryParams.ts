import { useCallback, useMemo } from "react";
import type {
  GridPaginationModel,
  GridSortModel,
  GridSortDirection,
} from "@mui/x-data-grid";
import {
  useQueryParams,
  NumberParam,
  withDefault,
  StringParam,
} from "use-query-params";

type Params = {
  pageSize?: number;
};
const DEFAULT_PAGE_SIZE = 4;

/**
 * Generates a hook that handles query parameters for a data grid.
 *
 * @param {Params} initialParams - Optional initial query parameters
 * @return {Object} An object containing the pagination model, sort model, keyword, and setter functions for pagination, sorting, and keyword
 */
const useDataGridQueryParams = (initialParams?: Params) => {
  const [params, setParams] = useQueryParams({
    pageSize: withDefault(
      NumberParam,
      initialParams?.pageSize ?? DEFAULT_PAGE_SIZE,
    ),
    page: withDefault(NumberParam, 0),
    sort: withDefault(StringParam, ""),
    keyword: withDefault(StringParam, ""),
  });

  const paginationModel = useMemo(
    () => ({
      page: params.page,
      pageSize: params.pageSize,
    }),
    [params.page, params.pageSize],
  );

  const setPaginationModel = useCallback(
    (model: GridPaginationModel) => {
      setParams({ page: model.page, pageSize: model.pageSize });
    },
    [setParams],
  );

  const sortModel = useMemo(
    () => sortStringToSortModel(params.sort),
    [params.sort],
  );
  const setSortModel = useCallback(
    (model: GridSortModel) => {
      const sortStr = sortModelToSortString(model);
      setParams({ sort: sortStr });
    },
    [setParams],
  );
  const keyword = params.keyword;
  const setKeyword = useCallback(
    (keyword: string) => {
      setParams({ keyword, page: 0 });
    },
    [setParams],
  );

  return {
    paginationModel,
    sortModel,
    keyword,
    setPaginationModel,
    setSortModel,
    setKeyword,
  };
};

/**
 * Converts a sort string to a GridSortModel.
 * Example: "country:asc" => [{ field: "country", sort: "asc" }]
 *
 * @param {string} sortStr - The sort string to convert.
 * @return {GridSortModel} The resulting GridSortModel.
 */
const sortStringToSortModel = (sortStr: string): GridSortModel => {
  let sortModel: GridSortModel = [];
  if (sortStr && sortStr.split(":").length === 2) {
    const [field, sort] = sortStr.split(":");
    sortModel = [{ field, sort: sort as GridSortDirection }];
  }
  return sortModel;
};

/**
 * Convert the given GridSortModel to a string representation of the sorting in format "field:sort".
 *
 * @param {GridSortModel} model - The GridSortModel to be converted.
 * @return {string} The string representation of the sorting.
 */
const sortModelToSortString = (model: GridSortModel): string => {
  let sortStr = "";
  if (model && model[0]) {
    sortStr = `${model[0].field}:${model[0].sort}`;
  }
  return sortStr;
};

export default useDataGridQueryParams;
