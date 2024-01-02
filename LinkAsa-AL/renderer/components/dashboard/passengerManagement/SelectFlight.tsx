import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Box, Typography } from "@mui/material";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { FlightStatus } from "../../../model/status";

const SelectFlight = ({ onSelectFlight }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const { documents: flights } = useCrud({
    db: clientDb,
    collectionName: "flights",
  });

  const handleChange = (event, newValue) => {
    setSelectedFlight(newValue);
    onSelectFlight(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Autocomplete
        options={flights.filter(
          (flight) => flight.status === FlightStatus.pending
        )}
        getOptionLabel={(option) => option.flightId || ""}
        value={selectedFlight}
        onChange={handleChange}
        renderInput={(params) => (
          <div style={{display:'flex', flexDirection:'column', gap:2}}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Flight
            </Typography>
            <TextField {...params} required fullWidth variant="outlined" />
          </div>
        )}
        fullWidth
      />
    </Box>
  );
};

export default SelectFlight;
