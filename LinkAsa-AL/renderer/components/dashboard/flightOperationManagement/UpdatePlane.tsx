import React, { useState } from "react";
import {
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { PlaneStatus } from "../../../model/status";
import { PlaneModel } from "../../../model/planeAttributes";

type UpdatePlaneProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: (result: { success: boolean; error?: string }) => void;
  data: Plane;
}

const UpdatePlane = ({ open, onClose, onUpdate, data }: UpdatePlaneProps) => {
  const { updateDocument } = useCrud({
    db: clientDb,
    collectionName: "planes",
  });

  const [selectedModel, setSelectedModel] = useState<PlaneModel>(data.model);
  const [selectedStatus, setSelectedStatus] = useState<PlaneStatus>(
    data.status
  );

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedPlaneData = {
      model: selectedModel,
      code: formData.get("code") as string,
      capacity: formData.get("capacity") as unknown as number,
      status: selectedStatus,
    };
    try {
      const result = await updateDocument(data.id, updatedPlaneData);
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
            Update Plane
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack mb={3}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="model"
                mb="5px"
              >
                Plane Model
              </Typography>
              <Select
                name="model"
                value={selectedModel}
                onChange={handleModelChange}
                fullWidth
              >
                {Object.values(PlaneModel).map((model) => (
                  <MenuItem
                    key={model}
                    value={model}
                    sx={{ backgroundColor: "white !important" }}
                  >
                    {model}
                  </MenuItem>
                ))}
              </Select>

              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="code"
                mb="5px"
                mt="25px"
              >
                Plane Code
              </Typography>
              <CustomTextField
                name="code"
                defaultValue={data?.code}
                fullWidth
              />

              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="capacity"
                mb="5px"
                mt="25px"
              >
                Capacity
              </Typography>
              <CustomTextField
                name="capacity"
                type="number"
                defaultValue={data?.capacity}
                fullWidth
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
                {Object.values(PlaneStatus).map((status) => (
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
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default UpdatePlane;
