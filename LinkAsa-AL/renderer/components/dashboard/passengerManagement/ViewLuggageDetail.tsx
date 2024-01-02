import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import DashboardCard from "../../shared/DashboardCard";

const ViewLuggageDetail = () => {
  const [isDetailView, setIsDetailView] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight>(null);
  const [luggageDetails, setLuggageDetails] = useState([]);

  const { documents: flights } = useCrud({
    db: clientDb,
    collectionName: "flights",
  });
  const { documents: flightDetails } = useCrud({
    db: clientDb,
    collectionName: "flight_details",
  });

  const handleViewDetails = (detail) => {
    const luggageWithPassenger = detail?.passengers.map((passenger) => ({
      ...passenger.luggage,
      passengerName: passenger.passport.name,
    }));
    setLuggageDetails(luggageWithPassenger);
    setIsDetailView(true);
  };

  const handleBack = () => {
    setIsDetailView(false);
    setSelectedFlight(null);
    setLuggageDetails([]);
  };

  return (
    <DashboardCard title="View Luggage Detail">
      <>
        <Typography my={2} px={1.5} variant="h5">
          {isDetailView ? `${selectedFlight?.flightId} Detail` : "All Flights"}
        </Typography>
        {!isDetailView ? (
          <TableContainer
            sx={{ maxHeight: "70vh", overflow: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow >
                  <TableCell sx={{fontWeight:'700', width:'350px'}}>Flight ID</TableCell>
                  <TableCell sx={{fontWeight:'700', width:'350px'}}>Flight Date</TableCell>
                  <TableCell sx={{fontWeight:'700', width:'350px'}}>Flight Status</TableCell>
                  <TableCell sx={{fontWeight:'700', width:'350px'}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flights.map((flight:Flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>{flight.flightId}</TableCell>
                    <TableCell>{flight.timestamp.toString()}</TableCell>
                    <TableCell>{flight.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSelectedFlight(flight);
                          const detail = flightDetails.find(
                            (d) => d.id === flight.id
                          );
                          if (detail) {
                            handleViewDetails(detail);
                          }
                        }}
                      >
                        View luggage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "75vh",
            maxHeight: "75vh",
            overflow: "auto",
            marginBlock: "1rem",
          }}>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:'700', width:'350px'}}>Passenger Name</TableCell>
                    <TableCell sx={{fontWeight:'700', width:'350px'}}>Weight</TableCell>
                    <TableCell sx={{fontWeight:'700', width:'350px'}}>Dimensions</TableCell>
                    <TableCell sx={{fontWeight:'700', width:'350px'}}>Contents</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {luggageDetails.map((luggage, index) => (
                    <TableRow key={index}>
                      <TableCell>{luggage.passengerName}</TableCell>
                      <TableCell>{luggage.weight} Kg</TableCell>
                      <TableCell>{luggage.dimensions}</TableCell>
                      <TableCell>{luggage.contents}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
                sx={{ padding: 2, paddingInline: 4 }}
                variant="contained"
                onClick={handleBack}
              >
                Back
              </Button>
          </div>
        )}
      </>
    </DashboardCard>
  );
};

export default ViewLuggageDetail;
