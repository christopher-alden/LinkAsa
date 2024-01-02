import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const BoardingPassPrint = ({ flightData, selectedDetail, airportData }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{fontWeight:'700', width:'200px'}}>Boarding Pass</TableCell>
          <TableCell sx={{fontWeight:'700', width:'200px'}}>Passport Code</TableCell>
          <TableCell sx={{fontWeight:'700', width:'200px'}}>Name</TableCell>
          <TableCell sx={{fontWeight:'700', width:'200px'}}>Gate</TableCell>
          <TableCell sx={{fontWeight:'700', width:'200px'}}>Seat</TableCell>
          <TableCell sx={{fontWeight:'700', width:'200px'}}>Departure Airport</TableCell>
          <TableCell sx={{fontWeight:'700', width:'200px'}}>Arrival Airport</TableCell>
          <TableCell sx={{fontWeight:'700', width:'200px'}}>Luggage</TableCell>
        </TableRow>
      </TableHead>
      <TableBody >
        {selectedDetail.passengers.map((passenger) => (
          <TableRow key={passenger.id}>
            <TableCell>{passenger.boardingPass.code}</TableCell>
            <TableCell>{passenger.passport.code}</TableCell>
            <TableCell>{passenger.passport.name}</TableCell>
            <TableCell>{passenger.boardingPass.gate}</TableCell>
            <TableCell>{passenger.boardingPass.seat}</TableCell>
            <TableCell>
              {airportData.departure?.code} - {airportData.departure?.name}
            </TableCell>
            <TableCell>
              {airportData.arrival?.code} - {airportData.arrival?.name}
            </TableCell>
            <TableCell>{passenger.luggage.weight} Kg</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BoardingPassPrint;
