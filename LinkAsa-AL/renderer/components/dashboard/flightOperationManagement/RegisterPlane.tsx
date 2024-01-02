import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Snackbar,
  Alert,
  MenuItem,
  Select,
} from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import CustomTextField from "../../forms/CustomTextField";
import { useSnackbar } from "../../../hooks/useSnackbar";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { PlaneStatus } from "../../../model/status";
import { PlaneModel } from "../../../model/planeAttributes";

const RegisterPlane = () => {
  const { createDocument } = useCrud({
    db: clientDb,
    collectionName: "planes",
  });

  const [selectedStatus, setSelectedStatus] = useState<PlaneStatus>(
    PlaneStatus.active
  );
  const [planeModel, setPlaneModel] = useState<PlaneModel>(
    PlaneModel.boeing
  );

  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const handleModelChange = (e) => {
    setPlaneModel(e.target.value);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const planeData = {
      model: formData.get("model") as string,
      code: formData.get("code") as string,
      capacity: formData.get("capacity") as unknown as number,
      status:selectedStatus,
    };

    try {
      await createDocument(planeData);
      handleSnackbarResponse(
        { success: true },
        "Plane Registered Successfully"
      );
    } catch (error) {
      handleSnackbarResponse({ success: false, error: error.message }, "");
    }
  };

  return (
    <DashboardCard title="Register Plane">
      <>
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
              value={planeModel}
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
            <CustomTextField name="code" />

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
            <CustomTextField name="capacity" type="number" />

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

            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              sx={{ p: 2, mt: "25px" }}
            >
              Register Plane
            </Button>
          </Stack>
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

export default RegisterPlane;
