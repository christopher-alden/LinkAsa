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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MaintenanceStatus } from "../../../model/status"; // Adjust this import as needed
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

type UpdateMaintenanceProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: (result: { success: boolean; error?: string }) => void;
  data: Maintenance;
};

const UpdateMaintenance = ({
  open,
  onClose,
  onUpdate,
  data,
}: UpdateMaintenanceProps) => {
  const { updateDocument } = useCrud({
    db: clientDb,
    collectionName: "maintenance",
  });
  const [selectedStatus, setSelectedStatus] = useState(data.status);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedMaintenanceData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      equipment: formData.get("equipment") as string,
      timestamp: formData.get("maintenanceDate") as unknown as Date,
      status: selectedStatus,
      employeeIds: data.employeeIds,
    };

    try {
      const result = await updateDocument(data.id, updatedMaintenanceData);
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
            Update Maintenance Record
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack mb={3}>
              {/* Form fields similar to UpdateTrainingSchedule */}
              <CustomTextField
                name="name"
                label="Maintenance Name"
                defaultValue={data?.name}
                fullWidth
              />
              <CustomTextField
                name="description"
                label="Description"
                multiline
                rows={4}
                defaultValue={data?.description}
                fullWidth
              />
              <CustomTextField
                name="equipment"
                label="Equipment"
                defaultValue={data?.equipment}
                fullWidth
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} sx={{ padding: 0 }}>
                  <DatePicker
                    value={dayjs(data.timestamp)}
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
                htmlFor="status"
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
                {Object.values(MaintenanceStatus).map((status) => (
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
              sx={{ p: 2, mt: 2 }}
            >
              Update Maintenance Record
            </Button>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default UpdateMaintenance;
