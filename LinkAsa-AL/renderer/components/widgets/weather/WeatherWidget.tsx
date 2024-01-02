import { Typography, Card, Grid, Stack, Box } from "@mui/material";
import {
  IconSun,
  IconCloudRain,
  IconSnowflake,
  IconCloud,
  IconWind,
  IconDroplet,
  IconTemperature,
} from "@tabler/icons-react";
import useWeather from "../../../hooks/useWeather";
import { useEffect } from "react";

type WeatherWidgetProps = {
  location: string;
  width: string;
};

const WeatherWidget = ({ location, width }: WeatherWidgetProps) => {
  const { toCelsius, searchWeather, weatherData } = useWeather();

  const getWeatherIcon = (weather) => {
    const main = weather?.weather[0]?.main.toLowerCase();
    switch (main) {
      case "clear":
        return <IconSun />;
      case "rain":
        return <IconCloudRain />;
      case "snow":
        return <IconSnowflake />;
      case "clouds":
        return <IconCloud />;
      default:
        return <IconCloud />;
    }
  };

  useEffect(() => {
    if (location) {
      searchWeather(location);
    }
  }, [location]);

  if (!weatherData?.main) return null;

  return (
    <Card
      elevation={0}
      style={{
        maxWidth: width,
        // padding: "2rem",
        textAlign: "start",
        boxShadow: "0px 0px 20px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack
        borderRadius={3}
        padding={4}
        spacing={2}
        width={"100%"}
        bgcolor={"white"}
        color={"text.primary"}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignContent: "start",
          
        }}
      >
        <Box >
          <Typography variant="h6" gutterBottom>
            {weatherData.name}
          </Typography>
          <Typography variant="h3" mb={2}>
            {Math.round(toCelsius(weatherData.main.temp))}°C
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography textAlign={"center"}>
            {getWeatherIcon(weatherData)}
          </Typography>
          <Typography variant="subtitle1" whiteSpace={'nowrap'}>
            {weatherData.weather[0].description}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} maxWidth={400}>
          <Grid item gap={0.5} display={"flex"}>
            <IconTemperature />
            <Typography variant="subtitle1" whiteSpace={'nowrap'}>
              {Math.round(toCelsius(weatherData.main.feels_like))}°C
            </Typography>
          </Grid>
          <Grid item gap={0.5} display={"flex"}>
            <IconDroplet />
            <Typography variant="subtitle1" whiteSpace={'nowrap'}>
              {weatherData.main.humidity}%
            </Typography>
          </Grid>
          <Grid item gap={0.5} display={"flex"}>
            <IconWind />
            <Typography variant="subtitle1" whiteSpace={'nowrap'}>
              {weatherData.wind.speed} m/s
            </Typography>
          </Grid>
        </Box>
      </Stack>
    </Card>
  );
};

export default WeatherWidget;
