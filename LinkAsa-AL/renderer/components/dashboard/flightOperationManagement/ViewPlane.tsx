import React, { useState } from "react";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import GenericDataTable from "../../layout/table/GenericDataTable";
import DashboardCard from "../../shared/DashboardCard";
import GenericDataTableSkeleton from "../../layout/table/GenericDataTableSkeleton";
// import UpdatePlane from "./UpdatePlane"; // This should be your component for updating planes
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Snackbar, Alert } from "@mui/material/";
import UpdatePlane from "./UpdatePlane";

const ViewPlane = () => {
  const { documents: planes, loading, deleteDocument } = useCrud({
    db: clientDb,
    collectionName: "planes",
  });

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Plane>();
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } = useSnackbar();
  const snackbarDuration = 3000;

  const headLabel = [
    { id: "code", label: "Plane Code" },
    { id: "model", label: "Plane Model" },
    { id: "capacity", label: "Capacity" },
    { id: "status", label: "Status" },
    { id: "edit", label: "" },
  ];

  const handleDelete = (id: string) => {
    deleteDocument(id);
  };

  const handleUpdateDialogOpen = (data: Plane) => {
    setSelectedData(data);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <DashboardCard title="View Planes">
      <>
        {loading ? (
          <GenericDataTableSkeleton />
        ) : (
          <GenericDataTable<Plane>
            filterBy={"code"}
            columns={headLabel}
            data={planes}
            onUpdate={handleUpdateDialogOpen}
            onDelete={handleDelete}
          />
        )}
        {isUpdateDialogOpen && (
          <UpdatePlane
            onUpdate={(result) => {
              handleSnackbarResponse(result, "Plane Successfully Updated");
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

export default ViewPlane;
