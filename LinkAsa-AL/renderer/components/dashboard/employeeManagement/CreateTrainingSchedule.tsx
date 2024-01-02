import React, { useEffect, useState } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { TrainingStatus } from "../../../model/status"; // Adjust import as needed
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import DashboardCard from "../../shared/DashboardCard";
import TopDown from "../../layout/chat/TopDown";
import { useSnackbar } from "../../../hooks/useSnackbar";

const CreateTrainingSchedule = () => {
  const { createDocument } = useCrud({
    db: clientDb,
    collectionName: "training",
  });
  const { documents: users, loading } = useCrud({
    db: clientDb,
    collectionName: "users",
  });
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const [excludedTrainees, setExcludedTrainees] = useState<string[]>([]);
  const [traineeDialogOpen, setTraineeDialogOpen] = useState(false);

  const handleTraineeChange = (userId) => {
    setExcludedTrainees((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //IMPORTANT: BUAT SEKARANG BIAR CEPET PAKE NAME AJA BIAR SERAGAM
    const includedTraineeIds = users
      .filter((user) => !excludedTrainees.includes(user.id))
      .map((user) => user.username);
    const trainingData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      timestamp: formData.get("trainingDate") as unknown as Date,
      traineeIds: includedTraineeIds as string[],
      status: TrainingStatus.pending,
    };
    try {
      await createDocument(trainingData);
      handleSnackbarResponse(
        { success: true },
        "Training Schedule Created Successfully"
      );
    } catch (error) {
      handleSnackbarResponse({ success: false, error: error.message }, "");
    }
  };

  if (loading || !users) return;
  return (
    <DashboardCard title="Create Training Schedule">
      <>
        <form onSubmit={handleSubmit}>
          <TopDown>
            <Stack mb={3}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
              >
                Training Name
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
                Training Description
              </Typography>
              <CustomTextField
                name="description"
                multiline
                rows={4}
                fullWidth
              />
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="trainingDate"
                mb="5px"
                mt="25px"
              >
                Training Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} sx={{ padding: 0 }}>
                  <DatePicker
                    name="trainingDate"
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
                htmlFor="selectTrainee"
                mb="5px"
                mt="25px"
              >
                Select Trainee
              </Typography>
              <Button
                onClick={() => setTraineeDialogOpen(true)}
                color="primary"
                variant="outlined"
                size="large"
                fullWidth
                sx={{ p: 2 }}
              >
                Select Trainees
              </Button>
            </Stack>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              sx={{ p: 2, mt: "25px" }}
            >
              Create Training Schedule
            </Button>
          </TopDown>
        </form>
        <Dialog
          open={traineeDialogOpen}
          onClose={() => setTraineeDialogOpen(false)}
        >
          <DialogTitle>
            <Typography variant="h5" py={2}>
              Exclude Trainee
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", width: "600px" }}
          >
            {users.map((user) => (
              <FormControlLabel
                key={user.id}
                control={
                  <Checkbox
                    checked={!excludedTrainees.includes(user.id)}
                    onChange={() => handleTraineeChange(user.id)}
                  />
                }
                label={user.username}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setTraineeDialogOpen(false)}
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

export default CreateTrainingSchedule;
