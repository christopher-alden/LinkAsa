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
import { FlightStatus } from "../../../model/status";

type UpdateFlightProps = {
    open: boolean;
    onClose: () => void;
    onUpdate?: (result: { success: boolean; error?: string }) => void;
    data: Flight;
  }

const UpdateFlight = ({ open, onClose, onUpdate, data }:UpdateFlightProps) => {
  const [selectedPlane, setSelectedPlane] = useState(data.planeId);
  const [selectedStatus, setSelectedStatus] = useState(data.status);
  const [departureAirport, setDepartureAirport] = useState(data.departureId);
  const [arrivalAirport, setArrivalAirport] = useState(data.arrivalId);

  const { updateDocument } = useCrud({
    db: clientDb,
    collectionName: "flights",
  });
  const { documents: planes } = useCrud({
    db: clientDb,
    collectionName: "planes",
  });
  const { documents: airports } = useCrud({
    db: clientDb,
    collectionName: "airports",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedFlightData = {
      flightId: formData.get("flightId") as string,
      planeId: selectedPlane,
      departureId: departureAirport,
      arrivalId: arrivalAirport,
      timestamp: formData.get("timestamp") as unknown as Date,
      price: formData.get("price") as unknown as number,
      status: selectedStatus,
    };

    try {
      const result = await updateDocument(data.id, updatedFlightData);
      onUpdate(result);
    } catch (error) {
      onUpdate({ success: false, error: error.message });
    }
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h5" py={2}>
          Update Flight
        </Typography>
      </DialogTitle>
      <DialogContent>
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
            <CustomTextField name="flightId" defaultValue={data.flightId} />

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
              {planes.map((plane) => (
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
            <CustomTextField
              name="timestamp"
              type="datetime-local"
              defaultValue={data.timestamp}
            />

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
            <CustomTextField
              name="price"
              type="number"
              defaultValue={data.price}
            />
          </Stack>
          <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="status"
              mb="5px"
              mt="25px"
            >
              Select Status
            </Typography>
            <Select
                name="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                fullWidth
              >
                {Object.values(FlightStatus).map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    sx={{ backgroundColor: "white !important" }}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
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
              Update Flight
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFlight;
