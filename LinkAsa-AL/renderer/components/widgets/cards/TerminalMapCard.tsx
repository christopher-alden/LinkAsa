import { useState } from "react";
import {
  Dialog,
  Card,
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  DialogContent,
} from "@mui/material";
import { IconInfoCircle } from "@tabler/icons-react";

const TerminalMapCard = ({ map }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Card
        elevation={2}
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0px 0px 20px -5px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
        onClick={handleClickOpen}
      >
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              backgroundColor: "#000000",
              position: "relative",
              "&:hover img": {
                opacity: 0.7,
              },
            }}
          >
            <img
              alt={map.title}
              src={map.image}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <Tooltip title={map.title}>
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                }}
              >
                <IconInfoCircle color="white" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle1" noWrap>
            {map.title}
          </Typography>
        </Stack>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent>
          <img
            src={map.image}
            alt={map.title}
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TerminalMapCard;
