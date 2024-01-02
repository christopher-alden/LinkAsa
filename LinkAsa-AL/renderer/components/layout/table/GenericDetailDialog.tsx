import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

const GenericDetailDialog = ({ open, onClose, data }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: "1rem" }}>
        <DialogTitle><Typography variant="h5" py={1}>Details</Typography></DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 1, minWidth:'500px' }}
        >
          {Object.entries(data).map(([key, value], index) => {
            if (key === "id") return null;
            return (
              <Typography key={index}>
                <strong>{key}:</strong> {value.toString()}
              </Typography>
            );
          })}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default GenericDetailDialog;
