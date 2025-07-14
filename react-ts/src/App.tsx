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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ForecastCard from './components/ForecastCard';

function App() {
  const [weatherData, setWeatherData] = useState<{ generalSituation?: string; weatherForecast?: any[] } | null>(null);
  const [selectedForecast, setSelectedForecast] = useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
        if (data.weatherForecast && Array.isArray(data.weatherForecast) && data.weatherForecast.length > 0) {
          setSelectedForecast(data.weatherForecast[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (weatherData && weatherData.weatherForecast && Array.isArray(weatherData.weatherForecast) && weatherData.weatherForecast.length > 0) {
      setSelectedForecast(weatherData.weatherForecast[selectedIndex]);
    }
  }, [weatherData, selectedIndex]);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weatherData) return <div>No data available.</div>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', bgcolor: 'background.default', color: 'text.primary', paddingTop:"1rm" }}>
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
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <IconButton
            onClick={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
            disabled={!weatherData?.weatherForecast || selectedIndex === 0}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          {selectedForecast && <ForecastCard forecast={selectedForecast} />}
          <IconButton
            onClick={() => setSelectedIndex((prev) =>
              weatherData?.weatherForecast ? Math.min(prev + 1, weatherData.weatherForecast.length - 1) : prev
            )}
            disabled={!weatherData?.weatherForecast || selectedIndex === (weatherData?.weatherForecast?.length ?? 1) - 1}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>

        
    </ThemeProvider>
  );
}

export default App;