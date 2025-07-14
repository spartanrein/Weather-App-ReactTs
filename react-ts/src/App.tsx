import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [weatherData, setWeatherData] = useState<{ generalSituation?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weatherData) return <div>No data available.</div>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Weather Data
        </Typography>
        {weatherData.generalSituation && (
          <Card sx={{ maxWidth: 600, margin: '2rem auto' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                General Situation
              </Typography>
              <Typography variant="body1">
                {weatherData.generalSituation}
              </Typography>
            </CardContent>
          </Card>
        )}
        {/* <pre>{JSON.stringify(weatherData, null, 2)}</pre> */}
      </Box>
    </ThemeProvider>
  );
}

export default App;