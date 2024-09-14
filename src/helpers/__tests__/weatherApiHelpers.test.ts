import {getDailyAverages} from '../weatherApiHelpers';

describe('getDailyAverages', () => {
  it('should calculate average temperature and weather code for multiple days', () => {
    const hourlyData = {
      time: [
        '2024-09-14T00:00',
        '2024-09-14T01:00',
        '2024-09-15T00:00',
        '2024-09-15T01:00',
      ],
      temperature_2m: [20, 22, 18, 20],
      weather_code: [1, 1, 2, 2],
    };
    const result = getDailyAverages(hourlyData);
    expect(result).toEqual([
      {date: '2024-09-14', avgTemp: '21.00', avgCode: '1'},
      {date: '2024-09-15', avgTemp: '19.00', avgCode: '2'},
    ]);
  });

  it('should handle a single day with multiple hourly data points', () => {
    const hourlyData = {
      time: ['2024-09-14T00:00', '2024-09-14T01:00', '2024-09-14T02:00'],
      temperature_2m: [20, 22, 24],
      weather_code: [1, 1, 2],
    };
    const result = getDailyAverages(hourlyData);
    expect(result).toEqual([
      {date: '2024-09-14', avgTemp: '22.00', avgCode: '1'},
    ]);
  });

  it('should return an empty array for no input data', () => {
    const hourlyData = {
      time: [],
      temperature_2m: [],
      weather_code: [],
    };
    const result = getDailyAverages(hourlyData);
    expect(result).toEqual([]);
  });

  it('should calculate average temperature and weather code with decimal results', () => {
    const hourlyData = {
      time: ['2024-09-14T00:00', '2024-09-14T01:00'],
      temperature_2m: [20.5, 22.3],
      weather_code: [2, 3],
    };
    const result = getDailyAverages(hourlyData);
    expect(result).toEqual([
      {date: '2024-09-14', avgTemp: '21.40', avgCode: '3'},
    ]);
  });

  it('should handle multiple dates with different hourly data points', () => {
    const hourlyData = {
      time: ['2024-09-14T00:00', '2024-09-14T01:00', '2024-09-15T00:00'],
      temperature_2m: [20, 22, 18],
      weather_code: [1, 1, 2],
    };
    const result = getDailyAverages(hourlyData);
    expect(result).toEqual([
      {date: '2024-09-14', avgTemp: '21.00', avgCode: '1'},
      {date: '2024-09-15', avgTemp: '18.00', avgCode: '2'},
    ]);
  });
});
