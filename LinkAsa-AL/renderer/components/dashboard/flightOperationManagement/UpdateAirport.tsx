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
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";

type UpdateAirportProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: (result: { success: boolean; error?: string }) => void;
  data: Airport;
};

const UpdateAirport = ({
  open,
  onClose,
  onUpdate,
  data,
}: UpdateAirportProps) => {
  const { updateDocument } = useCrud({
    db: clientDb,
    collectionName: "airports",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedAirportData = {
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      location: formData.get("location") as string,
    };

    try {
      const result = await updateDocument(data.id, updatedAirportData);
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
            Update Airport
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
                Airport Name
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
                htmlFor="code"
                mb="5px"
                mt="25px"
              >
                Airport Code
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
                htmlFor="location"
                mb="5px"
                mt="25px"
              >
                Location
              </Typography>
              <CustomTextField
                name="location"
                defaultValue={data?.location}
                fullWidth
              />
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

export default UpdateAirport;
