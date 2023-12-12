import { useEffect, useState } from "react";

import {
  Card,
  TableContainer,
  TablePagination,
  TableRow,
  TableCell,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  Skeleton,
  Snackbar, Alert 
} from "@mui/material";

// import Scrollbar from '../components/scrollbar'

import TableNoData from "../components/user/table-no-data";
import UserTableRow from "../components/user/user-table-row";
import UserTableHead from "../components/user/user-table-head";
import TableEmptyRows from "../components/user/table-empty-rows";
import UserTableToolbar from "../components/user/user-table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../components/user/utils";
import DashboardCard from "../../shared/DashboardCard";
import { fetchAllUsers } from "../../../services/userDataAccess";
import UpdateEmployee from "./UpdateEmployee";
import { useSnackbar } from "../../../hooks/useSnackbar";

// ----------------------------------------------------------------------

const EmployeeDataSkeleton: React.FC = () => {
  const numberOfRows = 5;

  return (
    <Card>
      <TableContainer>
        <Table sx={{ width: "100vw" }} padding="normal">
          <TableBody>
            {Array.from(new Array(numberOfRows)).map((_, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: 3 }} padding="checkbox">
                  <Skeleton variant="rectangular" width={24} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="text" width={24} height={24} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

const EmployeeData = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState([]);

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserModel>(null);

  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } = useSnackbar();
  const snackbarDuration = 3000;


  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers || []);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSort = (e, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = users.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  

  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (username) => selected.indexOf(username) !== -1;

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setPage(0);
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  const handleFilterByName = (e) => {
    setPage(0);
    setFilterName(e.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  
  const handleUpdateDialogOpen = (user:UserModel) => {
    setSelectedUser(user);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <DashboardCard title="Employee Data">
      <>
        <Card elevation={0}>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          {loading ? (
            <EmployeeDataSkeleton />
          ) : (
            <>
              <TableContainer sx={{ overflow: "unset" }}>
                <Table sx={{ minWidth: 800 }}>
                  <UserTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={users.length}
                    numSelected={selected.length}
                    onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={[
                      { id: "username", label: "Username" },
                      { id: "email", label: "Email" },
                      { id: "role", label: "Role" },
                      { id: "status", label: "Status" },
                      { id: " "}, // sama panjang
                    ]}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: UserModel, idx) => (
                        <UserTableRow
                          key={row!!!!!!!!!!?.uid || idx}
                          username={row.username}
                          role={row.role}
                          status={row.status}
                          email={row.email}
                          //   avatarUrl={row.avatarUrl}
                          //   isVerified={row.isVerified}
                          selected={isSelected(row.username)}
                          handleClick={(e) => handleClick(e, row.username)}
                          handleUpdate={()=>handleUpdateDialogOpen(row)}
                        />
                      ))}

                    <TableEmptyRows
                      height={73}
                      emptyRows={emptyRows(page, rowsPerPage, users.length)}
                    />

                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                page={page}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Card>
        {isUpdateDialogOpen && <UpdateEmployee onUpdate={(result) =>{handleSnackbarResponse(result, 'Employee Successfully Updated')}} open={isUpdateDialogOpen} onClose={handleUpdateDialogClose} user={selectedUser}/>}
        <Snackbar
          open={snackbarStatus.open}
          autoHideDuration={snackbarDuration}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={snackbarStatus.severity}>
            {snackbarStatus.message}
          </Alert>
        </Snackbar>
      </>
      
    </DashboardCard>
  );
};
export default EmployeeData;
