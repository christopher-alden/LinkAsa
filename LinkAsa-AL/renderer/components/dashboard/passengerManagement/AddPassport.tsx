import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { v4 } from "uuid";

const AddPassport = ({ onSubmit }) => {
  const [passportCode, setPassportCode] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = () => {
    if (!(passportCode && name && dob && country)) return;
    const id = v4();
    const passportData = {
      id,
      code: passportCode,
      name,
      dob,
      country,
    };
    onSubmit(passportData);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6">Passport Details</Typography>
      <TextField
        label="Passport Code"
        value={passportCode}
        onChange={(e) => setPassportCode(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ padding: 2, paddingInline: 4 , mt:2}}
        fullWidth
      >
        Add Passport Details
      </Button>
    </Box>
  );
};

export default AddPassport;
