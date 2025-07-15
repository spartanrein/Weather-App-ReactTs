import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ForecastCard from '../ForecastCard';
import pic51 from '../../assets/pic51.png';

// Mock the image imports
jest.mock('../../assets/pic50.png', () => 'pic50.png');
jest.mock('../../assets/pic52.png', () => 'pic52.png');
jest.mock('../../assets/pic53.png', () => 'pic53.png');
jest.mock('../../assets/pic54.png', () => 'pic54.png');
jest.mock('../../assets/pic60.png', () => 'pic60.png');
jest.mock('../../assets/pic61.png', () => 'pic61.png');
jest.mock('../../assets/pic62.png', () => 'pic62.png');
jest.mock('../../assets/pic63.png', () => 'pic63.png');
jest.mock('../../assets/pic64.png', () => 'pic64.png');
jest.mock('../../assets/pic65.png', () => 'pic65.png');
jest.mock('../../assets/pic70.png', () => 'pic70.png');
jest.mock('../../assets/pic71.png', () => 'pic71.png');
jest.mock('../../assets/pic72.png', () => 'pic72.png');
jest.mock('../../assets/pic73.png', () => 'pic73.png');
jest.mock('../../assets/pic74.png', () => 'pic74.png');
jest.mock('../../assets/pic75.png', () => 'pic75.png');
jest.mock('../../assets/pic76.png', () => 'pic76.png');
jest.mock('../../assets/pic77.png', () => 'pic77.png');
jest.mock('../../assets/pic80.png', () => 'pic80.png');
jest.mock('../../assets/pic81.png', () => 'pic81.png');
jest.mock('../../assets/pic82.png', () => 'pic82.png');
jest.mock('../../assets/pic83.png', () => 'pic83.png');
jest.mock('../../assets/pic84.png', () => 'pic84.png');
jest.mock('../../assets/pic85.png', () => 'pic85.png');
jest.mock('../../assets/pic90.png', () => 'pic90.png');
jest.mock('../../assets/pic91.png', () => 'pic91.png');
jest.mock('../../assets/pic92.png', () => 'pic92.png');
jest.mock('../../assets/pic93.png', () => 'pic93.png');

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ForecastCard', () => {
  const mockForecast = {
    forecastDate: '20241215',
    week: 'Sunday',
    forecastWeather: 'Sunny',
    minTemp: { value: 20, unit: 'C' },
    maxTemp: { value: 28, unit: 'C' },
    humidity: { min: 60, max: 80 },
    wind: 'Light breeze',
    forecastWind: 'Southeast 10 km/h',
    forecastMaxtemp: { value: 28, unit: 'C' },
    forecastMintemp: { value: 20, unit: 'C' },
    forecastMaxrh: { value: 80 },
    forecastMinrh: { value: 60 },
    Forecast: 'Mainly fine',
    PSR: 'Low',
    ForecastIcon: 51
  };

  it('renders with valid forecast data', () => {
    renderWithTheme(<ForecastCard forecast={mockForecast} />);
    
    expect(screen.getByText('Selected Forecast')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('2024-12-15')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });

  it('formats humidity fields correctly', () => {
    renderWithTheme(<ForecastCard forecast={mockForecast} />);
    
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('60% - 80%')).toBeInTheDocument();
  });

  it('formats date correctly from YYYYMMDD format', () => {
    renderWithTheme(<ForecastCard forecast={mockForecast} />);
    
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('2024-12-15')).toBeInTheDocument();
  });

  it('handles different date formats', () => {
    const forecastWithISODate = {
      ...mockForecast,
      forecastDate: '2024-12-15T00:00:00Z'
    };
    
    renderWithTheme(<ForecastCard forecast={forecastWithISODate} />);
    
    expect(screen.getByText('Date')).toBeInTheDocument();
    // The exact format will depend on the user's locale
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('handles relative humidity fields correctly', () => {
    renderWithTheme(<ForecastCard forecast={mockForecast} />);
    
    expect(screen.getByText('Max Relative Humidity')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('Min Relative Humidity')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('handles string humidity values', () => {
    const forecastWithStringHumidity = {
      ...mockForecast,
      forecastMaxrh: '80',
      forecastMinrh: '60'
    };
    
    renderWithTheme(<ForecastCard forecast={forecastWithStringHumidity} />);
    
    expect(screen.getByText('Max Relative Humidity')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('Min Relative Humidity')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('handles unknown fields by displaying them as-is', () => {
    const forecastWithUnknownField = {
      ...mockForecast,
      unknownField: 'Some unknown value'
    };
    
    renderWithTheme(<ForecastCard forecast={forecastWithUnknownField} />);
    
    expect(screen.getByText('unknownField')).toBeInTheDocument();
    expect(screen.getByText('Some unknown value')).toBeInTheDocument();
  });

  it('handles object values by stringifying them', () => {
    const forecastWithObject = {
      ...mockForecast,
      complexField: { nested: 'value', number: 123 }
    };
    
    renderWithTheme(<ForecastCard forecast={forecastWithObject} />);
    
    expect(screen.getByText('complexField')).toBeInTheDocument();
    expect(screen.getByText(/nested/)).toBeInTheDocument();
    expect(screen.getByText(/value/)).toBeInTheDocument();
  });

  it('renders with empty forecast object', () => {
    renderWithTheme(<ForecastCard forecast={{}} />);
    
    expect(screen.getByText('Selected Forecast')).toBeInTheDocument();
    expect(screen.queryByText(/Date|Weather|Temperature/)).not.toBeInTheDocument();
  });

  it('renders with null forecast', () => {
    renderWithTheme(<ForecastCard forecast={null} />);
    
    expect(screen.getByText('Selected Forecast')).toBeInTheDocument();
    expect(screen.queryByText(/Date|Weather|Temperature/)).not.toBeInTheDocument();
  });

  it('handles invalid date formats gracefully', () => {
    const forecastWithInvalidDate = {
      ...mockForecast,
      forecastDate: 'invalid-date'
    };
    
    renderWithTheme(<ForecastCard forecast={forecastWithInvalidDate} />);
    
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('invalid-date')).toBeInTheDocument();
  });
});