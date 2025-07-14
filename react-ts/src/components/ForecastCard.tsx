import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ForecastCardProps {
  forecast: any;
}

const fieldLabels: Record<string, string> = {
  forecastDate: 'Date',
  week: 'Day',
  forecastWeather: 'Weather',
  minTemp: 'Min Temperature',
  maxTemp: 'Max Temperature',
  humidity: 'Humidity',
  wind: 'Wind',
  forecastWind: 'Wind Forecast',
  forecastMaxtemp: 'Max Temp',
  forecastMintemp: 'Min Temp',
  forecastMaxrh:  'Max Relative Humidity',
  forecastMinrh:  'Min Relative Humidity',
  Forecast: 'Forecast',
  PSR:  'Probability of Significant Rain'
};

function formatField(key: string, value: any) {
  switch (key) {
    case 'forecastDate':
      // Handle YYYYMMDD format
      if (typeof value === 'string' && /^\d{8}$/.test(value)) {
        const year = value.slice(0, 4);
        const month = value.slice(4, 6);
        const day = value.slice(6, 8);
        return `${year}-${month}-${day}`;
      }git
      // Try to handle ISO or other formats
      const date = new Date(value);
      return isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
    case 'minTemp':
    case 'maxTemp':
      if (value && typeof value === 'object' && 'value' in value && 'unit' in value) {
        return `${value.value}°${value.unit}`;
      }
      return String(value);
    case 'forecastMaxtemp':
    case 'forecastMintemp':
      // If value is an object with value/unit, use that, else just append °C
      if (value && typeof value === 'object' && 'value' in value) {
        return `${value.value}${value.unit ? `°${value.unit}` : ''}`;
      }
      if (typeof value === 'string' || typeof value === 'number') {
        return `${value}`;
      }
      return String(value);
    case 'humidity':
      if (value && typeof value === 'object' && 'min' in value && 'max' in value) {
        return `${value.min}% - ${value.max}%`;
      }
      return String(value);
    case 'forecastMaxrh':
    case 'forecastMinrh':
      if (value && typeof value === 'object' && 'value' in value) {
        return `${value.value}%`;
      }
      if (typeof value === 'string' || typeof value === 'number') {
        return `${value}%`;
      }
      return String(value);
    default:
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value, null, 2);
      }
      return String(value);
  }
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => (
  <Card sx={{ width: 600, height: 650, margin: 0, display: 'flex', flexDirection: 'column' }}>
    <CardContent>
      <Typography variant="h6" component="div">
        Selected Forecast
      </Typography>
      <Box sx={{ overflow: 'auto', height: 550, mt: 2 }}>
        {forecast && Object.entries(forecast).map(([key, value]) => (
          <Box key={key} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: 160, mr: 2 }}>
              {fieldLabels[key] || key}
            </Typography>
            <Typography variant="body1" sx={{ wordBreak: 'break-word', flex: 1 }}>
              {formatField(key, value)}
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default ForecastCard; 