import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableFooter,
  TableContainer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ITableHeaders } from "./TableHeaders.interface";
import { ISong } from "../../interfaces/songs/song.interface";
import DeleteIcon from "@mui/icons-material/Delete";

interface IDataTableProps {
  data: ISong[];
  totalRows: number;
  headers: Array<ITableHeaders>;
  onChange: (query: number) => void;
  onClickDelete: (id: number) => void;
  page: number;
  rowsPerPage?: number;
}

const DataTable: React.FC<IDataTableProps> = function DataTable({
  data,
  headers,
  onChange,
  page,
  totalRows,
  rowsPerPage = 7,
  onClickDelete,
}) {
  const handleChangePage = (_event: unknown, newPage: number) => {
    onChange(newPage);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length);

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
            <TableCell
              sx={{
                fontWeight: 600,
                color: "primary.main",
                width: "10%",
              }}
            >
              Options
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow key={row.id}>
                {headers.map((header: ITableHeaders, i: number) => (
                  <TableCell key={i} align="left">
                    {getValueFromNestedProperty(row, header.table)}
                  </TableCell>
                ))}
                <TableCell>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      onClick={() => onClickDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
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
