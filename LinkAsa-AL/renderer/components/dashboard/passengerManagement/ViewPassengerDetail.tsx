import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Typography,
} from "@mui/material";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import DashboardCard from "../../shared/DashboardCard";
import BoardingPassPrint from "./BoardingPassPrint"; // Import the component you just created
import { useReactToPrint } from "react-to-print";

type FlightAirportDetail = {
  arrival: Airport;
  departure: Airport;
};
const ViewPassengerDetail = () => {
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight>(null);
  const [selectedDetail, setSelectedDetail] = useState<FlightDetail>(null);
  const [airportData, setAirportData] = useState<FlightAirportDetail>({
    arrival: null,
    departure: null,
  });

  const { documents: flightDetails } = useCrud({
    db: clientDb,
    collectionName: "flight_details",
  });
  const { documents: flights } = useCrud({
    db: clientDb,
    collectionName: "flights",
  });
  const { documents: airports } = useCrud({
    db: clientDb,
    collectionName: "airports",
  });

  const handleViewDetails = (flight, detail) => {
    const departureAirport = airports.find(
      (airport) => airport.id === flight?.departureId
    );
    const arrivalAirport = airports.find(
      (airport) => airport.id === flight?.arrivalId
    );
    setAirportData({
      arrival: arrivalAirport,
      departure: departureAirport,
    });
    setSelectedFlight(flight);
    setSelectedDetail(detail);
    setIsDetailView(true);
  };
  

  const handleBack = () => {
    setIsDetailView(false);
    setSelectedDetail(null);
    setSelectedFlight(null);
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    //case krn udh pasti ada flight data tembak ja
    documentTitle: `${selectedFlight?.flightId}_Boarding_Pass`,
  });

  return (
    <DashboardCard title="Passenger Detail">
      <>
        <Typography my={2} px={1.5} variant="h5">
          {isDetailView ? selectedFlight?.flightId + " Detail" : "All Flights"}
        </Typography>
        {!isDetailView ? (
          <>
            <TableContainer sx={{ maxHeight: "70vh", overflow: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow  >
                    <TableCell sx={{ fontWeight: "700" , width:'350px'}}>Flight ID</TableCell>
                    <TableCell sx={{ fontWeight: "700" , width:'350px'}}>
                      Flight Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "700" , width:'350px'}}>
                      Passenger Count
                    </TableCell>
                    <TableCell sx={{ fontWeight: "700" , width:'350px'}}>Flight Status</TableCell>
                    <TableCell sx={{ fontWeight: "700" , width:'350px'}}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((flight) => {
                    const detail = flightDetails.find(
                      (d) => d.id === flight.id
                    );
                    return detail ? (
                      <TableRow key={detail.id}>
                        <TableCell>{flight.flightId}</TableCell>
                        <TableCell>{flight.timestamp.toString()}</TableCell>
                        <TableCell>{detail.passengers.length}</TableCell>
                        <TableCell>{flight.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              handleViewDetails(flight, detail)
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : null;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <div
              ref={componentRef}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "68vh",
                maxHeight: "68vh",
                overflow: "auto",
                marginBlock: "1rem",
              }}
            >
              <BoardingPassPrint
                flightData={selectedFlight}
                selectedDetail={selectedDetail}
                airportData={airportData}
              />
            </div>
            <Stack direction={"row"} gap={2}>
              <Button
                sx={{ padding: 2, paddingInline: 4 }}
                variant="contained"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                sx={{ padding: 2, paddingInline: 4 }}
                variant="outlined"
                onClick={handlePrint}
              >
                Download as PDF
              </Button>
            </Stack>
          </>
        )}
      </>
    </DashboardCard>
  );
};

export default ViewPassengerDetail;
