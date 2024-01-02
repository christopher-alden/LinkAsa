import React, { useState, useEffect } from "react";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import GenericDataTable from "../../layout/table/GenericDataTable";
import DashboardCard from "../../shared/DashboardCard";
import GenericDataTableSkeleton from "../../layout/table/GenericDataTableSkeleton";
import { Snackbar, Alert } from "@mui/material";
import { useSnackbar } from "../../../hooks/useSnackbar";
import UpdateIncidentLog from "./UpdateIncidentLog";

const ViewIncidentLogs = () => {
  const { documents: incidentLogs, loading, deleteDocument } = useCrud({
    db: clientDb,
    collectionName: "incident_logs",
  });

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } = useSnackbar();
  const snackbarDuration = 3000;

  const headLabels = [
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "location", label: "Location" },
    { id: "timestamp", label: "Timestamp" },
    { id: "status", label: "Status" },
    { id: "edit", label: "" },
  ];

  const handleDelete = async (id) => {
    await deleteDocument(id);
  };

  const handleUpdateDialogOpen = (data) => {
    setSelectedData(data);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  // TODO: Implement UpdateIncidentLog Component

  return (
    <DashboardCard title="View Incident Logs">
      <>
        {loading ? (
          <GenericDataTableSkeleton />
        ) : (
          <GenericDataTable
            filterBy={"name"}
            columns={headLabels}
            data={incidentLogs}
            onUpdate={handleUpdateDialogOpen}
            onDelete={handleDelete}
          />
        )}
        {isUpdateDialogOpen && (
          <UpdateIncidentLog
            onUpdate={(result) => {
              handleSnackbarResponse(result, "Job Vacancy Successfully Updated");
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

export default ViewIncidentLogs;
