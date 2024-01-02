import React, { useState } from "react";
import {
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TrainingStatus } from "../../../model/status";
import dayjs from "dayjs";

type UpdateTrainingScheduleProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: (result: { success: boolean; error?: string }) => void;
  data: Training;
};

const UpdateTrainingSchedule = ({
  open,
  onClose,
  onUpdate,
  data,
}: UpdateTrainingScheduleProps) => {
  const { updateDocument } = useCrud({
    db: clientDb,
    collectionName: "training",
  });
  const [selectedStatus, setSelectedStatus] = useState(data.status);
  //TODO BIKIN TRAINEE tp ud de
  const [traineeDialogOpen, setTraineeDialogOpen] = useState(false);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedJobData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      timestamp: formData.get("trainingDate") as unknown as Date,
      traineeIds: data.traineeIds as string[],
      status: selectedStatus,
    };

    try {
      const result = await updateDocument(data.id, updatedJobData);
      onUpdate(result);
    } catch (error) {
      onUpdate({ success: false, error: error.message });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box sx={{ backgroundColor: "white !important" }}>
        <DialogTitle>
          <Typography variant="h5" py={2}>
            Update Training Schedule
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <>
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
                <CustomTextField
                  name="name"
                  defaultValue={data?.name}
                  fullWidth
                />

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
                  defaultValue={data?.description}
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
                  <DemoContainer
                    components={["DatePicker"]}
                    sx={{ padding: 0 }}
                  >
                    <DatePicker
                      value={dayjs(data.timestamp)}
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
                  htmlFor="role"
                  mb="5px"
                  mt="25px"
                >
                  Status
                </Typography>
                <Select
                  id="status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  fullWidth
                >
                  {Object.values(TrainingStatus).map((status) => (
                    <MenuItem
                      key={status}
                      value={status}
                      sx={{ backgroundColor: "white !important" }}
                    >
                      {status}
                    </MenuItem>
                  ))}
                </Select>
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
                Update Training Schedule
              </Button>
            </>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default UpdateTrainingSchedule;
