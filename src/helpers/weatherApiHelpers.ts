import {LocationStateType} from '../../App';
import {DailyAverage, GeocodingResponse, Location} from '../global.interface';
import getWeatherImage, {WeatherCode} from './getWeatherImage';

export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

/**
 * Returns a string in the format 'YYYY-MM-DDTHH:00' for the current date and
 * hour.
 *
 * @returns {string} The formatted date string.
 */
const getFormattedDateWithHour = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:00`;
};

/**
 * Checks if the given location name has multiple locations associated with it.
 * If it does, sets the locations list and returns true.
 * If it doesn't, returns false.
 * @param {string} locationName The location name to query.
 * @param {React.Dispatch<React.SetStateAction<Location[]>>} setLocationsList A function to set the locations list.
 * @returns {Promise<boolean>} A promise that resolves to true if the location has multiple locations associated with it, false otherwise.
 */
export const getIsMultipleLocations = async (
  locationName: string,
  setLocationsList: React.Dispatch<React.SetStateAction<Location[]>>,
): Promise<boolean> => {
  try {
    const geocodingResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}`,
    );
    const geocodingData: GeocodingResponse = await geocodingResponse.json();
    if (geocodingData.results) {
      setLocationsList(geocodingData.results);
      return geocodingData.results.length > 1;
    }
    return false;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return false;
  }
};

/**
 * Takes an Open Meteo API response and returns the current weather code and temperature.
 * @param {Object} apiResponse The Open Meteo API response.
 * @param {string[]} apiResponse.hourly.time The hourly times in the Open Meteo response.
 * @param {number[]} apiResponse.hourly.temperature_2m The hourly temperatures in the Open Meteo response.
 * @param {number[]} apiResponse.hourly.weather_code The hourly weather codes in the Open Meteo response.
 * @returns {{code: number, temperature: number}} The current weather code and temperature, or {code: -1, temperature: -1} if the current time is not found.
 */
const getWeatherCodeForCurrentTime = (apiResponse: {
  hourly: HourlyData;
}): {code: number; temperature: number} => {
  try {
    const hourlyTimes = apiResponse.hourly.time;
    const hourlyTemperatures = apiResponse.hourly.temperature_2m;
    const weatherCodes = apiResponse.hourly.weather_code;

    for (let i = 0; i < hourlyTimes.length; i++) {
      if (hourlyTimes[i] === getFormattedDateWithHour()) {
        return {
          code: weatherCodes[i],
          temperature: hourlyTemperatures[i],
        };
      }
    }
    return {code: -1, temperature: -1};
  } catch (error) {
    console.error('Error finding matching weather code:', error);
    return {code: -1, temperature: -1};
  }
};

/**
 * Takes hourly weather data and returns an array of daily averages.
 * @param {{time: string[], temperature_2m: number[], weather_code: number[]}} hourlyData The hourly weather data.
 * @returns {{ date: string; avgTemp: string; avgCode: string; }[]} An array of daily averages, where each item is an object with date, avgTemp, and avgCode.
 */
function getDailyAverages(hourlyData: {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}): DailyAverage[] {
  const {time, temperature_2m, weather_code} = hourlyData;
  const dataByDate: {
    [date: string]: {totalTemp: number; totalCode: number; count: number};
  } = {};

  time.forEach((timeString, index) => {
    const date = timeString ? timeString.split('T')[0] : '';
    const temp = temperature_2m ? temperature_2m[index] : 0;
    const weatherCode = weather_code ? weather_code[index] : 0;

    if (!dataByDate[date]) {
      dataByDate[date] = {totalTemp: 0, totalCode: 0, count: 0};
    }
    dataByDate[date].totalTemp += temp;
    dataByDate[date].totalCode += weatherCode;
    dataByDate[date].count += 1;
  });

  const avgDataArray = Object.keys(dataByDate).map(date => {
    const {totalTemp, totalCode, count} = dataByDate[date];
    return {
      date,
      avgTemp: (totalTemp / count).toFixed(2),
      avgCode: (totalCode / count).toFixed(0),
    };
  });

  return avgDataArray;
}

/**
 * Fetches the weather data from the Open Meteo API.
 * @param {number} latitude The latitude of the location to fetch the weather for.
 * @param {number} longitude The longitude of the location to fetch the weather for.
 * @param {(weeklyData: DailyAverage[]) => void} setWeeklyData A function to set the weekly data.
 * @returns {Promise<{temperature: number; weatherImage: string}>} A promise that resolves with an object containing the current temperature and a URL to an image representing the current weather, or rejects with an error if the fetch fails.
 */
const fetchWeather = async (
  latitude: number,
  longitude: number,
  setWeeklyData: (weeklyData: DailyAverage[]) => void,
): Promise<{temperature: number; weatherImage: string}> => {
  try {
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m,weather_code`,
    );
    const weatherData: {
      current: {temperature_2m: number};
      hourly: HourlyData;
    } = await weatherResponse.json();

    if (weatherData.current) {
      setWeeklyData(getDailyAverages(weatherData?.hourly));
      const {code, temperature} = getWeatherCodeForCurrentTime(weatherData);
      const weatherImage = getWeatherImage(code.toString() as WeatherCode);
      return {temperature, weatherImage};
    } else {
      throw new Error('Weather data not found');
    }
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

/**
 * Fetches the coordinates for a given location name.
 * @param {Location[]} locationsList The list of locations to search in.
 * @param {string} locationId The ID of the location to search for.
 * @returns {{latitude: number, longitude: number, name: string}} An object with the latitude, longitude and name of the location, or a default object if the location is not found.
 */
const fetchCoordinates = (
  locationsList: Location[],
  locationId: number,
): {latitude: number; longitude: number; name: string} => {
  const location = locationsList?.find(result => result?.id === locationId);
  if (location) {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
    };
  } else {
    return {
      latitude: 0,
      longitude: 0,
      name: '',
    };
  }
};

/**
 * Fetches the weather data from the Open Meteo API and returns a location state object.
 * @param {Location[]} locationsList The list of locations to fetch the weather from.
 * @param {number} locationId The ID of the location to fetch the weather for.
 * @param {(weeklyData: DailyAverage[]) => void} setWeeklyData A function to set the weekly data.
 * @returns {Promise<LocationStateType>} A promise that resolves with a location state object.
 */
export const getWeatherFromLocation = async (
  locationsList: Location[],
  locationId: number = 0,
  setWeeklyData: (weeklyData: DailyAverage[]) => void,
): Promise<LocationStateType> => {
  try {
    const {latitude, longitude, name} = fetchCoordinates(
      locationsList,
      locationId,
    );

    if (latitude && longitude) {
      const {temperature, weatherImage} = await fetchWeather(
        latitude,
        longitude,
        setWeeklyData,
      );

      if (temperature && weatherImage) {
        return {name, temperature, weatherImage};
      }
      return {name: '', temperature: 0, weatherImage: ''};
    } else {
      throw new Error('Could not fetch coordinates or weather data.');
    }
  } catch (error) {
    console.error('Error:', error);
    return {name: '', temperature: 0, weatherImage: ''};
  }
};
