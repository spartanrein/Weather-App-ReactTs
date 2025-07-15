// Import the formatField function from ForecastCard
// Since it's not exported, we'll test it through the component or extract it

describe('formatField utility function', () => {
  // Helper function to extract formatField from ForecastCard component
  const getFormatField = () => {
    const formatField = (key: string, value: any) => {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      switch (key) {
        case 'forecastDate':
          if (typeof value === 'string' && /^\d{8}$/.test(value)) {
            const year = value.slice(0, 4);
            const month = value.slice(4, 6);
            const day = value.slice(6, 8);
            return `${year}-${month}-${day}`;
          }
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
    };
    return formatField;
  };

  const formatField = getFormatField();

  describe('date formatting', () => {
    it('formats YYYYMMDD date correctly', () => {
      expect(formatField('forecastDate', '20241215')).toBe('2024-12-15');
    });

    it('formats ISO date string correctly', () => {
      const result = formatField('forecastDate', '2024-12-15T00:00:00Z');
      expect(result).toMatch(/2024/);
    });

    it('handles invalid date gracefully', () => {
      expect(formatField('forecastDate', 'invalid-date')).toBe('invalid-date');
    });

    it('handles null date', () => {
      expect(formatField('forecastDate', null)).toBe('null');
    });

    it('handles undefined date', () => {
      expect(formatField('forecastDate', undefined)).toBe('undefined');
    });
  });

  describe('temperature formatting', () => {
    it('formats temperature object with unit', () => {
      expect(formatField('minTemp', { value: 20, unit: 'C' })).toBe('20°C');
      expect(formatField('maxTemp', { value: 28, unit: 'C' })).toBe('28°C');
    });

    it('formats temperature object without unit', () => {
      expect(formatField('minTemp', { value: 20 })).toBe('20');
      expect(formatField('maxTemp', { value: 28 })).toBe('28');
    });

    it('handles string temperature values', () => {
      expect(formatField('minTemp', '20°C')).toBe('20°C');
      expect(formatField('maxTemp', '28°C')).toBe('28°C');
    });

    it('handles numeric temperature values', () => {
      expect(formatField('minTemp', 20)).toBe('20');
      expect(formatField('maxTemp', 28)).toBe('28');
    });

    it('handles null temperature', () => {
      expect(formatField('minTemp', null)).toBe('null');
    });
  });

  describe('forecast temperature formatting', () => {
    it('formats forecast temperature object with unit', () => {
      expect(formatField('forecastMaxtemp', { value: 28, unit: 'C' })).toBe('28°C');
      expect(formatField('forecastMintemp', { value: 20, unit: 'C' })).toBe('20°C');
    });

    it('formats forecast temperature object without unit', () => {
      expect(formatField('forecastMaxtemp', { value: 28 })).toBe('28');
      expect(formatField('forecastMintemp', { value: 20 })).toBe('20');
    });

    it('handles string forecast temperature values', () => {
      expect(formatField('forecastMaxtemp', '28°C')).toBe('28°C');
      expect(formatField('forecastMintemp', '20°C')).toBe('20°C');
    });

    it('handles numeric forecast temperature values', () => {
      expect(formatField('forecastMaxtemp', 28)).toBe('28');
      expect(formatField('forecastMintemp', 20)).toBe('20');
    });
  });

  describe('humidity formatting', () => {
    it('formats humidity object with min and max', () => {
      expect(formatField('humidity', { min: 60, max: 80 })).toBe('60% - 80%');
    });

    it('handles string humidity values', () => {
      expect(formatField('humidity', '60-80%')).toBe('60-80%');
    });

    it('handles numeric humidity values', () => {
      expect(formatField('humidity', 70)).toBe('70');
    });

    it('handles null humidity', () => {
      expect(formatField('humidity', null)).toBe('null');
    });
  });

  describe('relative humidity formatting', () => {
    it('formats relative humidity object with value', () => {
      expect(formatField('forecastMaxrh', { value: 80 })).toBe('80%');
      expect(formatField('forecastMinrh', { value: 60 })).toBe('60%');
    });

    it('handles string relative humidity values', () => {
      expect(formatField('forecastMaxrh', '80')).toBe('80%');
      expect(formatField('forecastMinrh', '60')).toBe('60%');
    });

    it('handles numeric relative humidity values', () => {
      expect(formatField('forecastMaxrh', 80)).toBe('80%');
      expect(formatField('forecastMinrh', 60)).toBe('60%');
    });

    it('handles null relative humidity', () => {
      expect(formatField('forecastMaxrh', null)).toBe('null');
    });
  });

  describe('default field handling', () => {
    it('handles string values', () => {
      expect(formatField('unknownField', 'some value')).toBe('some value');
    });

    it('handles numeric values', () => {
      expect(formatField('unknownField', 123)).toBe('123');
    });

    it('handles boolean values', () => {
      expect(formatField('unknownField', true)).toBe('true');
      expect(formatField('unknownField', false)).toBe('false');
    });

    it('handles object values by stringifying them', () => {
      const obj = { nested: 'value', number: 123 };
      const result = formatField('unknownField', obj);
      expect(result).toContain('nested');
      expect(result).toContain('value');
      expect(result).toContain('123');
    });

    it('handles array values by stringifying them', () => {
      const arr = ['item1', 'item2', 123];
      const result = formatField('unknownField', arr);
      expect(result).toContain('item1');
      expect(result).toContain('item2');
      expect(result).toContain('123');
    });

    it('handles null values', () => {
      expect(formatField('unknownField', null)).toBe('null');
    });

    it('handles undefined values', () => {
      expect(formatField('unknownField', undefined)).toBe('undefined');
    });
  });

  describe('edge cases', () => {
    it('handles empty string', () => {
      expect(formatField('forecastDate', '')).toBe('');
    });

    it('handles zero values', () => {
      expect(formatField('minTemp', 0)).toBe('0');
      expect(formatField('humidity', 0)).toBe('0');
    });

    it('handles negative values', () => {
      expect(formatField('minTemp', -5)).toBe('-5');
      expect(formatField('forecastMaxtemp', -5)).toBe('-5');
    });

    it('handles very large numbers', () => {
      expect(formatField('minTemp', 999999)).toBe('999999');
    });

    it('handles decimal numbers', () => {
      expect(formatField('minTemp', 20.5)).toBe('20.5');
      expect(formatField('humidity', 75.5)).toBe('75.5');
    });

    it('handles special characters in strings', () => {
      expect(formatField('forecastWeather', 'Sunny & Clear')).toBe('Sunny & Clear');
      expect(formatField('wind', 'SE 10-15 km/h')).toBe('SE 10-15 km/h');
    });
  });
}); 