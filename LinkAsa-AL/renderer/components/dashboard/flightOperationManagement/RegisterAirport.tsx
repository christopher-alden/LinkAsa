import React, { useState } from "react";
import {
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import CustomTextField from "../../forms/CustomTextField";
import { useSnackbar } from "../../../hooks/useSnackbar";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";

const RegisterAirport = () => {
  const { createDocument } = useCrud({
    db: clientDb,
    collectionName: "airports",
  });

  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } = useSnackbar();
  const snackbarDuration = 3000;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const airportData = {
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      location: formData.get("location") as string,
    };

    try {
      await createDocument(airportData);
      handleSnackbarResponse(
        { success: true },
        "Airport Registered Successfully"
      );
    } catch (error) {
      handleSnackbarResponse({ success: false, error: error.message }, "");
    }
  };

  return (
    <DashboardCard title="Register Airport">
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
              Airport Name
            </Typography>
            <CustomTextField name="name" />
            
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
            <CustomTextField name="code" />

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
            <CustomTextField name="location" />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              sx={{ p: 2, mt: "25px" }}
            >
              Register Airport
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

export default RegisterAirport;
