import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { v4 } from "uuid";
const generateCode = (flightId, departureId, arrivalId, passportCode) => {
    console.log('%cCreateBoardingPass.tsx line:5 passportCode', 'color: #007acc;', passportCode);
  const FIC = flightId.slice(-3);
  const DIC = departureId.slice(-3);
  const AIC = arrivalId.slice(-3);
  const PCC = passportCode.slice(-3);

  const code = `${PCC}${FIC}-${DIC}-${AIC}`;
  console.log('%cCreateBoardingPass.tsx line:12 code', 'color: #007acc;', code);
  return code.toUpperCase(); 
};

const CreateBoardingPass = ({
  onSubmit,
  flightId,
  departureId,
  arrivalId,
  timestamp,
  passportCode,
}) => {
  const [seat, setSeat] = useState("");
  const [gate, setGate] = useState("");

  const handleSubmit = () => {
    if (!(seat && gate)) return;
    const id = v4();
    const code = generateCode(flightId, departureId, arrivalId, passportCode);
    const boardingPassData = {
      id,
      code,
      flightId,
      departureId,
      arrivalId,
      seat,
      gate,
      timestamp,
    };
    onSubmit(boardingPassData);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6">Boarding Pass Details</Typography>
      <TextField
        label="Seat"
        value={seat}
        onChange={(e) => setSeat(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Gate"
        value={gate}
        onChange={(e) => setGate(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ padding: 2, paddingInline: 4,mt:2 }}
        fullWidth
      >
        Add Boarding Pass Details
      </Button>
    </Box>
  );
};

export default CreateBoardingPass;
