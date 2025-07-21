import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import pic50 from '../assets/pic50.png';
import pic51 from '../assets/pic51.png';
import pic52 from '../assets/pic52.png';
import pic53 from '../assets/pic53.png';
import pic54 from '../assets/pic54.png';
import pic60 from '../assets/pic60.png';
import pic61 from '../assets/pic61.png';
import pic62 from '../assets/pic62.png';
import pic63 from '../assets/pic63.png';
import pic64 from '../assets/pic64.png';
import pic65 from '../assets/pic65.png';
import pic70 from '../assets/pic70.png';
import pic71 from '../assets/pic71.png';
import pic72 from '../assets/pic72.png';
import pic73 from '../assets/pic73.png';
import pic74 from '../assets/pic74.png';
import pic75 from '../assets/pic75.png';
import pic76 from '../assets/pic76.png';
import pic77 from '../assets/pic77.png';
import pic80 from '../assets/pic80.png';
import pic81 from '../assets/pic81.png';
import pic82 from '../assets/pic82.png';
import pic83 from '../assets/pic83.png';
import pic84 from '../assets/pic84.png';
import pic85 from '../assets/pic85.png';
import pic90 from '../assets/pic90.png';
import pic91 from '../assets/pic91.png';
import pic92 from '../assets/pic92.png';
import pic93 from '../assets/pic93.png';
// Add more imports as needed for all possible icons

// Map icon numbers to imported images
const iconMap: Record<string | number, string> = {
  50: pic50,
  51: pic51,
  52: pic52,
  53: pic53,
  54: pic54,
  60: pic60,
  61: pic61,
  62: pic62,
  63: pic63,
  64: pic64,
  65: pic65,
  70: pic70,
  71: pic71,
  72: pic72,
  73: pic73,
  74: pic74,
  75: pic75,
  76: pic76,
  77: pic77,
  80: pic80,
  81: pic81,
  82: pic82,
  83: pic83,
  84: pic84,
  85: pic85,
  90: pic90,
  91: pic91,
  92: pic92,
  93: pic93,
};

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
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  switch (key) {
    case 'forecastDate':
      // Handle YYYYMMDD format
      if (typeof value === 'string' && /^\d{8}$/.test(value)) {
        const year = value.slice(0, 4);
        const month = value.slice(4, 6);
        const day = value.slice(6, 8);
        return `${year}-${month}-${day}`;
      }
      // Try to handle ISO or other formats
      return typeof value === 'string' ? (isNaN(Date.parse(value)) ? value : new Date(value).toLocaleDateString()) : String(value);
    case 'minTemp':
    case 'maxTemp':
      if (value && typeof value === 'object' && 'value' in value) {
        return value.unit ? `${value.value}°${value.unit}` : `${value.value}`;
      }
      return String(value);
    case 'forecastMaxtemp':
    case 'forecastMintemp':
      if (value && typeof value === 'object' && 'value' in value) {
        return value.unit ? `${value.value}°${value.unit}` : `${value.value}`;
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

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  // The icon number is typically in forecast.ForecastIcon or forecast.icon or similar
  // Adjust the field name as needed based on your data structure
  const iconNumber = forecast?.ForecastIcon || forecast?.forecastIcon || forecast?.icon || forecast?.Icon || forecast?.WeatherIcon || null;
  const iconSrc = iconNumber ? iconMap[iconNumber] : undefined;

  return (
    <Card sx={{ width: 600, height: 650, margin: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="div">
            Selected Forecast
          </Typography>
          {iconSrc && (
            <img
              src={iconSrc}
              alt={`Weather icon ${iconNumber}`}
              style={{ width: 80, height: 80, objectFit: 'contain', position: 'absolute', top: 16, right: 16 }}
            />
          )}
        </Box>
        <Box sx={{ overflow: 'auto', height: 550, mt: 2 }}>
          {forecast && Object.entries(forecast)
            .filter(([key]) => key !== 'ForecastIcon' && key !== 'forecastIcon' && key !== 'icon' && key !== 'Icon' && key !== 'WeatherIcon')
            .map(([key, value]) => (
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
};

export default ForecastCard; 