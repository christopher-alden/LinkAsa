import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import DashboardCard from "../../shared/DashboardCard";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TopDown from "../../layout/chat/TopDown";
import { useSnackbar } from "../../../hooks/useSnackbar";
import usePhoto from "../../../hooks/usePhoto";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { LostItemStatus } from "../../../model/status";

const RegisterLostItem = () => {
  const { createDocument } = useCrud({
    db: clientDb,
    collectionName: "lost_and_found",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const { uploadPhoto } = usePhoto();
  const snackbarDuration = 3000;

  useEffect(() => {
    if (photo) {
      handleSnackbarResponse({ success: true }, "File Successfully Attached");
    }
  }, [photo]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const photoUrl = photo
        ? await uploadPhoto(photo, "lost_and_found")
        : null;
      const lostItem = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        locationFound: formData.get("locationFound") as string,
        timestamp: formData.get("dateFound") as unknown as Date,
        status: LostItemStatus.unclaimed,
        photo: photoUrl,
      };

      await createDocument(lostItem);
      handleSnackbarResponse(
        { success: true },
        "Lost Item Uploaded Successfully"
      );
    } catch (error) {
      handleSnackbarResponse({ success: false, error: error.message }, "");
    }
  };

  return (
    <DashboardCard title="Register Lost Item">
      <>
        <form onSubmit={onSubmit}>
          <TopDown>
            <Box>
              <Stack spacing={0}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  component="label"
                  htmlFor="name"
                  mb="5px"
                >
                  Lost Item Name
                </Typography>
                <CustomTextField name="name" variant="outlined" fullWidth />

                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  component="label"
                  htmlFor="description"
                  mb="5px"
                  mt="25px"
                >
                  Description
                </Typography>
                <CustomTextField
                  name="description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />

                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  component="label"
                  htmlFor="locationFound"
                  mb="5px"
                  mt="25px"
                >
                  Location
                </Typography>
                <CustomTextField
                  name="locationFound"
                  variant="outlined"
                  fullWidth
                />

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mb="5px"
                  mt="25px"
                >
                  <Box
                    sx={{
                      padding: 0,
                      width: "45%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      component="label"
                      htmlFor="dateFound"
                    >
                      Date Registered
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ padding: 0 }}
                      >
                        <DatePicker
                          name="dateFound"
                          sx={{
                            padding: 0,
                            width: "100%",
                            "&& .Mui-selected": {
                              backgroundColor: "pink",
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      padding: 0,
                      width: "45%",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      component="label"
                      htmlFor="dateFound"
                    >
                      Attach Photo
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{ height: "65%" }}
                    >
                      Attach Photo
                      <input type="file" hidden onChange={handlePhotoChange} />
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Box>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              sx={{ p: 2 }}
            >
              Register Lost Item
            </Button>
          </TopDown>
        </form>
        <Snackbar
          open={snackbarStatus.open}
          autoHideDuration={snackbarDuration}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarStatus.severity}
            sx={{ width: "100%" }}
          >
            {snackbarStatus.message}
          </Alert>
        </Snackbar>
      </>
    </DashboardCard>
  );
};

export default RegisterLostItem;
