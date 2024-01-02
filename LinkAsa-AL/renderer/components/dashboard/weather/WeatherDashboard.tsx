import DashboardCard from "../../shared/DashboardCard";
import WeatherWidget from "../../widgets/weather/WeatherWidget";
import { Button, TextField, Stack, Grid, Box } from "@mui/material";
import { useEffect, useState } from "react";
import CustomTextField from "../../forms/CustomTextField";


const WeatherDashboard = () => {
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLocation = e.target[0].value;
    setLocation(newLocation);
  };

  useEffect(() => {
    setLocation("Jakarta");
  }, []);

  return (
    <DashboardCard title="Weather Dashboard">
        <Stack spacing={4}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                
              <CustomTextField
                fullWidth
                variant="outlined"
                placeholder="Input Location"
              />
              <Button
                sx={{ padding: 2, paddingInline: 4 , whiteSpace:'nowrap'}}
                type="submit"
                variant="contained"
                
              >
                Get Weather
              </Button>
            </Box>
          </form>
          <WeatherWidget location={location} width="full" />
          <Grid container sx={{ justifyContent: "space-between" }} gap={2}>
            <Grid item xs={3.5}>
              <WeatherWidget location={"Seoul"} width="400px" />
            </Grid>
            <Grid item xs={3.5}>
              <WeatherWidget location={"Amsterdam"} width="400px" />
            </Grid>
            <Grid item xs={3.5}>
              <WeatherWidget location={"Japan"} width="400px" />
            </Grid>
          </Grid>
        </Stack>
    </DashboardCard>
  );
};

export default WeatherDashboard;
