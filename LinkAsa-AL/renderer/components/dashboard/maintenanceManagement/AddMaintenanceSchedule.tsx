import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DashboardCard from "../../shared/DashboardCard";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { MaintenanceStatus } from "../../../model/status";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const AddMaintenanceSchedule = () => {
  const { createDocument } = useCrud({
    db: clientDb,
    collectionName: "maintenance",
  });

  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [selectedemployee, setSelectedemployee] = useState<string[]>([]);

  const { documents: employees, loading } = useCrud({
    db: clientDb,
    collectionName: "users",
  });

  const handleemployeeChange = (employeeId) => {
    setSelectedemployee((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const maintenanceData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: MaintenanceStatus.pending,
      equipment: formData.get("equipment") as string,
      timestamp: formData.get("maintenanceDate") as unknown as Date,
      employeeIds: selectedemployee,
    };

    try {
      await createDocument(maintenanceData);
      handleSnackbarResponse(
        { success: true },
        "Maintenance Schedule Added Successfully"
      );
    } catch (error) {
      handleSnackbarResponse({ success: false, error: error.message }, "");
    }
  };

  if (loading || !employees) return;
  return (
    <DashboardCard title="Add Maintenance Schedule">
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
              Maintenance Name
            </Typography>

            <CustomTextField name="name" fullWidth />
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="description"
              mb="5px"
              mt="25px"
            >
              Maintenance Description
            </Typography>
            <CustomTextField name="description" multiline rows={4} fullWidth />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="equipment"
              mb="5px"
              mt="25px"
            >
              Equipment
            </Typography>
            <CustomTextField name="equipment" fullWidth />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="maintenanceDate"
              mb="5px"
              mt="25px"
            >
              Maintenance Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ padding: 0 }}>
                <DatePicker
                  name="maintenanceDate"
                  sx={{
                    padding: 0,
                    width: "100%",
                    "&& .Mui-selected": {
                      backgroundColor: "pink",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              mb="5px"
              mt="25px"
            >
              Select Employee
            </Typography>
            <Button
              onClick={() => setEmployeeDialogOpen(true)}
              color="primary"
              variant="outlined"
              size="large"
              fullWidth
              sx={{ p: 2}}
            >
              Select employee
            </Button>
          </Stack>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            sx={{ p: 2, mt: 2 }}
          >
            Create Maintenance Record
          </Button>
        </form>

        <Dialog
          open={employeeDialogOpen}
          onClose={() => setEmployeeDialogOpen(false)}
        >
          <DialogTitle>
            <Typography variant="h5" py={2}>
              Select Employee
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "600px",
            }}
          >
            {employees.map((employee: UserModel) => (
              <FormControlLabel
                key={employee.id}
                control={
                  <Checkbox
                    checked={selectedemployee.includes(employee.id)}
                    onChange={() => handleemployeeChange(employee.id)}
                  />
                }
                label={`${employee.username} - ${employee.role}`}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setEmployeeDialogOpen(false)}
              variant="outlined"
              size="large"
              sx={{ px: 2 }}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>

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

export default AddMaintenanceSchedule;
