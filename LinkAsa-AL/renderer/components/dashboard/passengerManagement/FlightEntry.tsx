import React, { useState } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import SelectFlight from "./SelectFlight";
import AddPassport from "./AddPassport";
import AddLuggage from "./AddLuggage";
import CreateBoardingPass from "./CreateBoardingPass";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { arrayUnion } from "firebase/firestore";
import { v4 } from "uuid";
import DashboardCard from "../../shared/DashboardCard";

const FlightEntryForm = () => {
  const { createOrUpdateDocument, loading } = useCrud({
    db: clientDb,
    collectionName: "flight_details",
  });
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;
  const [selectedFlight, setSelectedFlight] = useState<Flight>(null);
  const [passportDetails, setPassportDetails] = useState<Passport>(null);
  const [luggageDetails, setLuggageDetails] = useState<Luggage>(null);
  const [boardingPassDetails, setBoardingPassDetails] =
    useState<BoardingPass>(null);

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    setPassportDetails(null);
    setLuggageDetails(null);
    setBoardingPassDetails(null);
  };

  const handlePassportDetailsSubmit = (data) => {
    setPassportDetails(data);
  };

  const handleLuggageDetailsSubmit = (data) => {
    setLuggageDetails(data);
  };

  const handleBoardingPassDetailsSubmit = (data) => {
    setBoardingPassDetails(data);
  };

  const handleSubmitPassenger = async () => {
    const id = v4();
    const passengerData: Passenger = {
      id,
      passport: passportDetails,
      luggage: luggageDetails,
      boardingPass: boardingPassDetails,
    };

    const flightDetailDocId = selectedFlight.id;

    if (!loading) {
      await createOrUpdateDocument(flightDetailDocId, {
        flightId: selectedFlight.id,
        passengers: arrayUnion(passengerData),
      });

      setSelectedFlight(null);
      setPassportDetails(null);
      setLuggageDetails(null);
      setBoardingPassDetails(null);

      handleSnackbarResponse({ success: true }, "Passenger added to flight");
    }
  };

  return (
    <DashboardCard title="Flight Entry">
      <>
        <SelectFlight onSelectFlight={handleFlightSelect} />
        {selectedFlight && (
          <Box sx={{ mt: 2 }}>
            <AddPassport onSubmit={handlePassportDetailsSubmit} />
            {passportDetails && (
              <AddLuggage onSubmit={handleLuggageDetailsSubmit} />
            )}
            {luggageDetails && (
              <CreateBoardingPass
                flightId={selectedFlight.flightId}
                departureId={selectedFlight.departureId}
                arrivalId={selectedFlight.arrivalId}
                timestamp={selectedFlight.timestamp}
                passportCode={passportDetails.code}
                onSubmit={handleBoardingPassDetailsSubmit}
              />
            )}
            {boardingPassDetails && (
              <Button
                variant="contained"
                color="error"
                onClick={handleSubmitPassenger}
                sx={{ padding: 2, paddingInline: 4, mt:2 }}
                fullWidth
              >
                Submit Passenger
              </Button>
            )}
          </Box>
        )}
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

export default FlightEntryForm;
