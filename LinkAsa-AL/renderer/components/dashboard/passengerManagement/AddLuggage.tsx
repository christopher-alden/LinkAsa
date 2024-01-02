import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import usePhoto from "../../../hooks/usePhoto";
import { v4 } from "uuid";

const AddLuggage = ({ onSubmit }) => {
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [contents, setContents] = useState("");
  const [photo, setPhoto] = useState(null);
  const { uploadPhoto } = usePhoto();

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!(weight && dimensions && contents && photo)) return;
    const id = v4();
    const photoUrl = photo ? await uploadPhoto(photo, "luggage_photos") : null;
    const luggageData = {
      id,
      weight,
      dimensions,
      contents,
      photo: photoUrl,
    };
    onSubmit(luggageData);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6">Luggage Details</Typography>
      <TextField
        type="number"
        label="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Dimensions"
        value={dimensions}
        onChange={(e) => setDimensions(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
        Upload Photo
        <input type="file" hidden onChange={handlePhotoChange} />
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ padding: 2, paddingInline: 4, mt:2}}
        fullWidth
      >
        Add Luggage Details
      </Button>
    </Box>
  );
};

export default AddLuggage;
