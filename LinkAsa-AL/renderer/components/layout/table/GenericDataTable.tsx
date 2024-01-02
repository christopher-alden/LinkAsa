import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ChangeEvent,
} from "react";
import {
  Card,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";
import GenericDataTableToolbar from "./GenericDataTableToolbar";
import GenericDataTableHead from "./GenericDataTableHead";
import GenericDataTableEmptyRows from "./GenericDataTableEmptyRows";
import GenericDataTableNoData from "./GenericDataTableNoData";
import GenericDataTableRow from "./GenericDataTableRow";
import { applyFilter, emptyRows, getComparator } from "./utils";
import GenericDetailDialog from "./GenericDetailDialog";

type GenericDataTableProps<T extends DataModel> = {
  columns: Column[];
  data: T[];
  filterBy: string;
  onUpdate: (data: T) => void;
  onDelete: (dataId: string) => void;
};

const GenericDataTable = <T extends DataModel>({
  columns,
  data,
  filterBy,
  onUpdate,
  onDelete,
}: GenericDataTableProps<T>) => {
  const [filterName, setFilterName] = useState<string>("");
  const [selected, setSelected] = useState<T>();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [detailOpen, setDetailOpen] = useState(false);

  const filterFunction = (data: T) => {
    const filterProperty = columns.find((col) => col.id == filterBy)?.id;
    const filterValue = data[filterProperty]?.toString().toLowerCase() || "";
    return filterValue.includes(filterName.toLowerCase());
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filter: filterFunction,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (row: T) => {
    setSelected(row);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const handleSort = (e, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const getTarget = (e: any) => {
    return e.target as HTMLButtonElement;
  };
  return (
    <>
      <Card sx={{ boxShadow: "none" }}>
        <GenericDataTableToolbar
          filterName={filterName}
          onFilterName={(e) => setFilterName(getTarget(e).value)}
        />

        <TableContainer>
          <Table>
            <GenericDataTableHead
              order={order}
              orderBy={orderBy}
              rowCount={data.length}
              headLabel={columns}
              onRequestSort={handleSort}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <GenericDataTableRow<T>
                      key={row.id || index}
                      row={row}
                      columns={columns}
                      // selected={isSelected(row.id)}
                      handleClick={(e) => handleClick(e)}
                      handleUpdate={(e) => onUpdate(row)}
                      handleDelete={() => onDelete(row.id)}
                    />
                  );
                })}
              <GenericDataTableEmptyRows
                height={73}
                emptyRows={emptyRows(page, rowsPerPage, data.length)}
              />
              {dataFiltered.length === 0 && (
                <GenericDataTableNoData query={filterName} />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {detailOpen && <GenericDetailDialog
        open={detailOpen}
        onClose={handleCloseDetail}
        data={selected}
      />}
    </>
  );
};

export default GenericDataTable;
