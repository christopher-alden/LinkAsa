import { useState } from "react";
import useCrud from "../../../hooks/useCrud";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { clientDb } from "../../../lib/firebase";
import GenericDataTable from "../../layout/table/GenericDataTable";
import GenericDataTableSkeleton from "../../layout/table/GenericDataTableSkeleton";
import DashboardCard from "../../shared/DashboardCard";
import UpdateMaintenanceSchedule from "./UpdateMaintenanceSchedule"; // Adjust this import as needed
import { Snackbar, Alert } from "@mui/material/";

const ViewMaintenanceSchedule = () => {
  const { documents: maintenance, loading, deleteDocument } = useCrud({
    db: clientDb,
    collectionName: "maintenance",
  });

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Maintenance>();
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const headLabel = [
    { id: "name", label: "Maintenance Name" },
    { id: "description", label: "Description" },
    { id: "timestamp", label: "Maintenance Date" },
    { id: "status", label: "Status" },
    { id: "edit", label: "" },
  ];

  const handleDelete = (id: string) => {
    deleteDocument(id);
    handleSnackbarResponse({ success: true }, "Maintenance Record Deleted");
  };

  const handleUpdateDialogOpen = (data: Maintenance) => {
    setSelectedData(data);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <DashboardCard title="View Maintenance Schedule">
      <>
        {loading ? (
          <GenericDataTableSkeleton />
        ) : (
          <GenericDataTable<Maintenance>
            filterBy={"name"}
            columns={headLabel}
            data={maintenance || []}
            onUpdate={handleUpdateDialogOpen}
            onDelete={handleDelete}
          />
        )}
        {isUpdateDialogOpen && (
          <UpdateMaintenanceSchedule
            onUpdate={(result) => {
              handleSnackbarResponse(result, "Maintenance Record Successfully Updated");
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

export default ViewMaintenanceSchedule;
