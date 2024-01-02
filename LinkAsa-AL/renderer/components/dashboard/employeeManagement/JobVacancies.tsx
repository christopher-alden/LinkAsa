import React, { useEffect, useState } from "react";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import GenericDataTable from "../../layout/table/GenericDataTable";
import DashboardCard from "../../shared/DashboardCard";
import GenericDataTableSkeleton from "../../layout/table/GenericDataTableSkeleton";
import UpdateJobVacancy from "./UpdateJobVacancy";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Snackbar, Alert } from "@mui/material/";

const JobVacancies: React.FC = () => {
  const { documents:jobVacancies, loading, deleteDocument } = useCrud({
    db: clientDb,
    collectionName: "job_vacancy",
  });

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<JobVacancies>();
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const headLabel = [
    { id: "name", label: "Name" },
    { id: "role", label: "Role" },
    { id: "maxQuota", label: "Max Quota" },
    { id: "status", label: "Status" },
    { id: "edit", label: "" },
  ];

  const handleDelete = (id: string) => {
    deleteDocument(id);
    console.log("done");
  };
  const handleUpdateDialogOpen = (data: JobVacancies) => {
    setSelectedData(data);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <DashboardCard title="Job Vacancies">
      <>
        {loading ? (
          <GenericDataTableSkeleton />
        ) : (
          <GenericDataTable<JobVacancies>
            filterBy={"name"}
            columns={headLabel}
            data={jobVacancies}
            onUpdate={handleUpdateDialogOpen}
            onDelete={handleDelete}
          />
        )}
        {isUpdateDialogOpen && (
          <UpdateJobVacancy
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

export default JobVacancies;
