import React, { useState } from "react";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import GenericDataTable from "../../layout/table/GenericDataTable";
import DashboardCard from "../../shared/DashboardCard";
import GenericDataTableSkeleton from "../../layout/table/GenericDataTableSkeleton";
import UpdateAirport from "./UpdateAirport";// This should be your component for updating airports
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Snackbar, Alert } from "@mui/material/";

const ViewAirport: React.FC = () => {
  const { documents: airports, loading, deleteDocument } = useCrud({
    db: clientDb,
    collectionName: "airports",
  });

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Airport>();
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } = useSnackbar();
  const snackbarDuration = 3000;

  const headLabel = [
    { id: "code", label: "Airport Code" },
    { id: "name", label: "Airport Name" },
    { id: "location", label: "Location" },
    { id: "edit", label: "" },
  ];

  const handleDelete = (id: string) => {
    deleteDocument(id);
  };

  const handleUpdateDialogOpen = (data: Airport) => {
    setSelectedData(data);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <DashboardCard title="View Airports">
      <>
        {loading ? (
          <GenericDataTableSkeleton />
        ) : (
          <GenericDataTable<Airport>
            filterBy={"code"}
            columns={headLabel}
            data={airports}
            onUpdate={handleUpdateDialogOpen}
            onDelete={handleDelete}
          />
        )}
        {isUpdateDialogOpen && (
          <UpdateAirport
            onUpdate={(result) => {
              handleSnackbarResponse(result, "Airport Successfully Updated");
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

export default ViewAirport;
