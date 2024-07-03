import { QueryResultData } from "@sisense/sdk-data";
import { GridColDef } from "@mui/x-data-grid";
import { ExecuteQueryParams, useExecuteQuery } from "@sisense/sdk-ui";

/**
 * Transform data from QueryResultData to the data structure as required by Mui DataGrid
 *
 * @param data QueryResultData
 * @param offsetIndex offset index
 * @returns GridData
 */
export function transformData(
  data: QueryResultData | undefined,
  offsetIndex = 0
): any {
  if (!data) {
    return {
      columns: [],
      rows: [],
    };
  }

  const gridRows: any[] = [];

  const { columns, rows } = data;

  rows.forEach((row, rowIndex) => {
    const item: any = {};
    // use offsetIndex to generate unique id for each row across pages
    // this is required by infinite loading
    item.id = offsetIndex + rowIndex;
    columns.forEach((column, colIndex) => {
      item[column.name] = row[colIndex].data;
    });
    gridRows.push(item);
  });

  const colList: GridColDef[] = columns.map((column) => ({
    field: column.name,
    headerName: column.name,
    flex: 1,
  }));

  return { columns: colList, rows: gridRows };
}

/**
 * Hook to execute a query and transform the data to the data structure as required by Mui DataGrid
 *
 * @param params - Input parameters for the query
 */
export const useExecuteQueryMui = (params: ExecuteQueryParams) => {
  const { offset: offsetIndex } = params;
  const { data, ...restQueryState } = useExecuteQuery(params);
  const transformedData = transformData(data, offsetIndex);

  return {
    data: transformedData,
    ...restQueryState,
  };
};
