import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import CustomTextField from "../../forms/CustomTextField";
import { useSnackbar } from "../../../hooks/useSnackbar";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { FlightStatus, PlaneStatus } from "../../../model/status";

const RegisterFlight = () => {
  const [selectedPlane, setSelectedPlane] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  const { documents: planes } = useCrud({ db: clientDb, collectionName: "planes" });
  const { documents: airports } = useCrud({ db: clientDb, collectionName: "airports" });
  const { createDocument } = useCrud({ db: clientDb, collectionName: "flights" });

  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } = useSnackbar();
  const snackbarDuration = 3000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const flightData = {
      flightId: formData.get("flightId") as string,
      planeId: selectedPlane,
      departureId: departureAirport,
      arrivalId: arrivalAirport,
      timestamp: formData.get("timestamp") as unknown as Date,
      price: formData.get("price") as unknown as number,
      status: FlightStatus.pending,
    };

    try {
      await createDocument(flightData);
      handleSnackbarResponse({ success: true }, "Flight Registered Successfully");
    } catch (error) {
      handleSnackbarResponse({ success: false, error: error.message }, "");
    }
  };
  return (
    <DashboardCard title="Register Flight">
      <>
        <form onSubmit={handleSubmit}>
          <Stack mb={3}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="flightId"
              mb="5px"
            >
              Flight ID
            </Typography>
            <CustomTextField name="flightId" />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="planeId"
              mb="5px"
              mt="25px"
            >
              Select Plane
            </Typography>
            <Select
              name="planeId"
              value={selectedPlane}
              onChange={(e) => setSelectedPlane(e.target.value)}
              fullWidth
            >
              {planes.filter(plane => plane.status === PlaneStatus.active).map((plane) => (
                <MenuItem key={plane.id} value={plane.id}>
                  {plane.code} - {plane.model}
                </MenuItem>
              ))}
            </Select>

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="departureId"
              mb="5px"
              mt="25px"
            >
              Departure Airport
            </Typography>
            <Select
              name="departureId"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              fullWidth
            >
              {airports.map((airport) => (
                <MenuItem key={airport.id} value={airport.id}>
                  {airport.code} - {airport.name}
                </MenuItem>
              ))}
            </Select>

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="arrivalId"
              mb="5px"
              mt="25px"
            >
              Arrival Airport
            </Typography>
            <Select
              name="arrivalId"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
              fullWidth
            >
              {airports.map((airport) => (
                <MenuItem key={airport.id} value={airport.id}>
                  {airport.code} - {airport.name}
                </MenuItem>
              ))}
            </Select>

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="timestamp"
              mb="5px"
              mt="25px"
            >
              Flight Date
            </Typography>
            <CustomTextField name="timestamp" type="datetime-local" />
            
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="price"
              mb="5px"
              mt="25px"
            >
              Price
            </Typography>
            <CustomTextField name="price" type="number" />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              sx={{ p: 2, mt: "25px" }}
            >
              Register Flight
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

export default RegisterFlight;
