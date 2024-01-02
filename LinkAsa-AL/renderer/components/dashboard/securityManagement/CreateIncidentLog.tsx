import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import CustomTextField from "../../forms/CustomTextField";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { IncidentStatus } from "../../../model/status";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";

const CreateIncidentLog = () => {
  const { createDocument } = useCrud({
    db: clientDb,
    collectionName: "incident_logs",
  });

  const [incidentStatus, setIncidentStatus] = useState(IncidentStatus.pending);

  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const incidentLogData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      timestamp: formData.get("timestamp") as unknown as Date,
      status: incidentStatus,
    };

    try {
      await createDocument(incidentLogData);
      handleSnackbarResponse(
        { success: true },
        "Incident Log Created Successfully"
      );
    } catch (error) {
      handleSnackbarResponse({ success: false, error: error.message }, "");
    }
  };

  const handleStatusChange = (event) => {
    setIncidentStatus(event.target.value);
  };

  return (
    <DashboardCard title="Create Incident Log">
      <>
        <form onSubmit={handleSubmit}>
          <Stack mb={3}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Incident Name
            </Typography>
            <CustomTextField name="name" required />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="description"
              mb="5px"
              mt="25px"
            >
              Description
            </Typography>
            <CustomTextField name="description" multiline rows={4} required />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="location"
              mb="5px"
              mt="25px"
            >
              Location
            </Typography>
            <CustomTextField name="location" required />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="timestamp"
              mb="5px"
              mt="25px"
            >
              Incident Date
            </Typography>
            <CustomTextField name="timestamp" type="datetime-local" required />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="status"
              mb="5px"
              mt="25px"
            >
              Status
            </Typography>
            <Select
              id="status"
              name="status"
              value={incidentStatus}
              onChange={handleStatusChange}
              fullWidth
            >
              {Object.values(IncidentStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            sx={{ p: 2, mt: "25px" }}
          >
            Create Incident Log
          </Button>
        </form>
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

export default CreateIncidentLog;
