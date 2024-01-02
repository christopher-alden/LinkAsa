import { useState } from "react";
import useCrud from "../../../hooks/useCrud";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { clientDb } from "../../../lib/firebase";
import GenericDataTable from "../../layout/table/GenericDataTable";
import GenericDataTableSkeleton from "../../layout/table/GenericDataTableSkeleton";
import DashboardCard from "../../shared/DashboardCard";
import UpdateTrainingSchedule from "./UpdateTrainingSchedule";
import { Snackbar, Alert } from "@mui/material/";

const ViewTrainingSchedule = () => {
  const { documents: training, loading, deleteDocument } = useCrud({
    db: clientDb,
    collectionName: "training",
  });

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Training>();
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const headLabel = [
    { id: "name", label: "Training Name" },
    { id: "description", label: "Description" },
    { id: "timestamp", label: "Training Date" },
    { id: "status", label: "Status" },
    { id: "edit", label: "" },
  ];

  const handleDelete = (id: string) => {
    deleteDocument(id);
    console.log("done");
  };
  const handleUpdateDialogOpen = (data: Training) => {
    setSelectedData(data);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };
  return (
    <DashboardCard title="View Training Schedule">
      <>
        {loading ? (
          <GenericDataTableSkeleton />
        ) : (
          <GenericDataTable<Training>
            filterBy={"name"}
            columns={headLabel}
            data={training || []}
            onUpdate={handleUpdateDialogOpen}
            onDelete={handleDelete}
          />
        )}
        {isUpdateDialogOpen && (
          <UpdateTrainingSchedule
            onUpdate={(result) => {
              handleSnackbarResponse(result, "Training Schedule Successfully Updated");
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

export default ViewTrainingSchedule;
