import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter,
  TableContainer,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ITableHeaders } from "./TableHeaders.interface";
import { ISong } from "../../interfaces/songs/song.interface";

interface IDataTableProps {
  data: ISong[];
  totalRows: number;
  headers: Array<ITableHeaders>;
  onChange: (query: number) => void;
  page: number;
  path?: string;
}

const DataTable: React.FC<IDataTableProps> = function DataTable({
  data,
  headers,
  onChange,
  page,
  path,
  totalRows,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  let emptyRows = 0;
  const rowsPerPage = 10;
  const handleChangePage = (event: React.SyntheticEvent, newPage: number) => {
    onChange(newPage);
  };

  if (data && data.length > 0) {
    emptyRows = rowsPerPage - data.length;
  } else {
    emptyRows = 10;
  }

  const handleclick = (row) => {
    if (path) navigate(`${path}/${row.status}/${row.id}`);
    else navigate(`${location.pathname}/${row.id}`, { state: { row } });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getValueFromNestedProperty = (obj: any, path: string) => {
    const properties = path.split(".");
    let value = obj;
    for (const property of properties) {
      value = value[property];
      if (value === undefined || value === null) {
        return "";
      }
    }
    return value;
  };

  return (
    <TableContainer
      sx={{
        boxSizing: "border-box",
        my: 2,
        width: "100%",
        px: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "4px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((item: ITableHeaders, i: number) => (
              <TableCell
                key={i}
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  handleclick(row);
                }}
              >
                {headers.map((header: ITableHeaders, i: number) => (
                  <TableCell key={i} align="left">
                    {getValueFromNestedProperty(row, header.table)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 34 * emptyRows }}>
              {headers.map((i) => (
                <TableCell key={i.table} />
              ))}
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              count={totalRows}
              page={totalRows <= 0 ? 0 : page}
              onPageChange={handleChangePage}
              align="center"
              sx={{ borderBottom: 0 }}
              labelDisplayedRows={({ page }) => {
                return `${
                  page === 0
                    ? data.length < 10
                      ? data.length
                      : 10
                    : 10 * (page + 1) > totalRows
                    ? totalRows
                    : 10 * (page + 1)
                }/${totalRows}`;
              }}
              showFirstButton={true}
              showLastButton={true}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
