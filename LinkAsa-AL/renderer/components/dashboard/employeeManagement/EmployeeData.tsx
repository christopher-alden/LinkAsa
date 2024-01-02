import React, { useEffect, useState } from "react";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import GenericDataTable from "../../layout/table/GenericDataTable";
import DashboardCard from "../../shared/DashboardCard";
import GenericDataTableSkeleton from "../../layout/table/GenericDataTableSkeleton";
import UpdateEmployee from "./UpdateEmployee";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Snackbar, Alert } from "@mui/material/";
const EmployeeData = () => {
  const { documents:users, loading } = useCrud({
    db: clientDb,
    collectionName: "users",
  });

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<UserModel>();
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const headLabel = [
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status" },
    { id: "edit", label: "" },
  ];
  const handleUpdateDialogOpen = (data: UserModel) => {
    setSelectedData(data);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <DashboardCard title="Employee Data">
      <>
        {loading ? (
          <GenericDataTableSkeleton />
        ) : (
          <GenericDataTable<UserModel>
            filterBy={"username"}
            columns={headLabel}
            data={users || []}
            onUpdate={handleUpdateDialogOpen}
            onDelete={() => {
              console.log("bus");
            }}
          />
        )}
        {isUpdateDialogOpen && (
          <UpdateEmployee
            onUpdate={(result) => {
              handleSnackbarResponse(result, "Employee Successfully Updated");
            }}
            open={isUpdateDialogOpen}
            onClose={handleUpdateDialogClose}
            data={selectedData}
          />
        )}
        <Snackbar
          open={snackbarStatus.open}
          autoHideDuration={snackbarDuration}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
