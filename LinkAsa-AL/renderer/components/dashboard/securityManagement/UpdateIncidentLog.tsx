import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { IncidentStatus } from "../../../model/status";

type UpdateIncidentLogProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: (result: { success: boolean; error?: string }) => void;
  data: IncidentLog;
};

const UpdateIncidentLog = ({
  open,
  onClose,
  onUpdate,
  data,
}: UpdateIncidentLogProps) => {
  const { updateDocument } = useCrud({
    db: clientDb,
    collectionName: "incident_logs",
  });

  const [selectedStatus, setSelectedStatus] = useState(data.status);
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedIncidentData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      timestamp: formData.get("timestamp") as unknown as Date,
      status: formData.get("status") as IncidentStatus,
    };

    try {
      const result = await updateDocument(data.id, updatedIncidentData);
      onUpdate(result);
      onClose();
    } catch (error) {
      onUpdate({ success: false, error: error.message });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h5" py={2}>
          Update Incident Log
        </Typography>
      </DialogTitle>
      <DialogContent>
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
            <CustomTextField name="name" defaultValue={data.name} />

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
            <CustomTextField
              name="description"
              multiline
              rows={4}
              defaultValue={data.description}
            />

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
            <CustomTextField name="location" defaultValue={data.location} />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="timestamp"
              mb="5px"
              mt="25px"
            >
              Time
            </Typography>
            <CustomTextField
              name="timestamp"
              type="datetime-local"
              defaultValue={data.timestamp}
            />

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
              name="status"
              value={selectedStatus}
              onChange={handleStatusChange}
              fullWidth
            >
              {Object.values(IncidentStatus).map((status) => (
                <MenuItem
                  key={status}
                  value={status}
                  sx={{ backgroundColor: "white !important" }}
                >
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <DialogActions>
            <Button sx={{ px: 2, p: 1.5 }} onClick={onClose}>
              Cancel
            </Button>
            <Button
              sx={{ px: 2, p: 1.5 }}
              variant="outlined"
              type="submit"
              color="primary"
            >
              Update Incident Log
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateIncidentLog;
