type WeatherImage = Record<
  'day' | 'night',
  {
    description: string;
    image: string;
  }
>;

export type WeatherCode =
  | '0'
  | '1'
  | '2'
  | '3'
  | '45'
  | '48'
  | '51'
  | '53'
  | '55'
  | '56'
  | '57'
  | '61'
  | '63'
  | '65'
  | '66'
  | '67'
  | '71'
  | '73'
  | '75'
  | '77'
  | '80'
  | '81'
  | '82'
  | '85'
  | '86'
  | '95'
  | '96'
  | '99';

const items: Record<WeatherCode, WeatherImage> = {
  '0': {
    day: {
      description: 'Sunny',
      image: 'https://openweathermap.org/img/wn/01d@2x.png',
    },
    night: {
      description: 'Clear',
      image: 'https://openweathermap.org/img/wn/01n@2x.png',
    },
  },
  '1': {
    day: {
      description: 'Mainly Sunny',
      image: 'https://openweathermap.org/img/wn/01d@2x.png',
    },
    night: {
      description: 'Mainly Clear',
      image: 'https://openweathermap.org/img/wn/01n@2x.png',
    },
  },
  '2': {
    day: {
      description: 'Partly Cloudy',
      image: 'https://openweathermap.org/img/wn/02d@2x.png',
    },
    night: {
      description: 'Partly Cloudy',
      image: 'https://openweathermap.org/img/wn/02n@2x.png',
    },
  },
  '3': {
    day: {
      description: 'Cloudy',
      image: 'https://openweathermap.org/img/wn/03d@2x.png',
    },
    night: {
      description: 'Cloudy',
      image: 'https://openweathermap.org/img/wn/03n@2x.png',
    },
  },
  '45': {
    day: {
      description: 'Foggy',
      image: 'https://openweathermap.org/img/wn/50d@2x.png',
    },
    night: {
      description: 'Foggy',
      image: 'https://openweathermap.org/img/wn/50n@2x.png',
    },
  },
  '48': {
    day: {
      description: 'Rime Fog',
      image: 'https://openweathermap.org/img/wn/50d@2x.png',
    },
    night: {
      description: 'Rime Fog',
      image: 'https://openweathermap.org/img/wn/50n@2x.png',
    },
  },
  '51': {
    day: {
      description: 'Light Drizzle',
      image: 'https://openweathermap.org/img/wn/09d@2x.png',
    },
    night: {
      description: 'Light Drizzle',
      image: 'https://openweathermap.org/img/wn/09n@2x.png',
    },
  },
  '53': {
    day: {
      description: 'Drizzle',
      image: 'https://openweathermap.org/img/wn/09d@2x.png',
    },
    night: {
      description: 'Drizzle',
      image: 'https://openweathermap.org/img/wn/09n@2x.png',
    },
  },
  '55': {
    day: {
      description: 'Heavy Drizzle',
      image: 'https://openweathermap.org/img/wn/09d@2x.png',
    },
    night: {
      description: 'Heavy Drizzle',
      image: 'https://openweathermap.org/img/wn/09n@2x.png',
    },
  },
  '56': {
    day: {
      description: 'Light Freezing Drizzle',
      image: 'https://openweathermap.org/img/wn/09d@2x.png',
    },
    night: {
      description: 'Light Freezing Drizzle',
      image: 'https://openweathermap.org/img/wn/09n@2x.png',
    },
  },
  '57': {
    day: {
      description: 'Freezing Drizzle',
      image: 'https://openweathermap.org/img/wn/09d@2x.png',
    },
    night: {
      description: 'Freezing Drizzle',
      image: 'https://openweathermap.org/img/wn/09n@2x.png',
    },
  },
  '61': {
    day: {
      description: 'Light Rain',
      image: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    night: {
      description: 'Light Rain',
      image: 'https://openweathermap.org/img/wn/10n@2x.png',
    },
  },
  '63': {
    day: {
      description: 'Rain',
      image: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    night: {
      description: 'Rain',
      image: 'https://openweathermap.org/img/wn/10n@2x.png',
    },
  },
  '65': {
    day: {
      description: 'Heavy Rain',
      image: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    night: {
      description: 'Heavy Rain',
      image: 'https://openweathermap.org/img/wn/10n@2x.png',
    },
  },
  '66': {
    day: {
      description: 'Light Freezing Rain',
      image: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    night: {
      description: 'Light Freezing Rain',
      image: 'https://openweathermap.org/img/wn/10n@2x.png',
    },
  },
  '67': {
    day: {
      description: 'Freezing Rain',
      image: 'https://openweathermap.org/img/wn/10d@2x.png',
    },
    night: {
      description: 'Freezing Rain',
      image: 'https://openweathermap.org/img/wn/10n@2x.png',
    },
  },
  '71': {
    day: {
      description: 'Light Snow',
      image: 'https://openweathermap.org/img/wn/13d@2x.png',
    },
    night: {
      description: 'Light Snow',
      image: 'https://openweathermap.org/img/wn/13n@2x.png',
    },
  },
  '73': {
    day: {
      description: 'Snow',
      image: 'https://openweathermap.org/img/wn/13d@2x.png',
    },
    night: {
      description: 'Snow',
      image: 'https://openweathermap.org/img/wn/13n@2x.png',
    },
  },
  '75': {
    day: {
      description: 'Heavy Snow',
      image: 'https://openweathermap.org/img/wn/13d@2x.png',
    },
    night: {
      description: 'Heavy Snow',
      image: 'https://openweathermap.org/img/wn/13n@2x.png',
    },
  },
  '77': {
    day: {
      description: 'Snow Grains',
      image: 'https://openweathermap.org/img/wn/13d@2x.png',
    },
    night: {
      description: 'Snow Grains',
      image: 'https://openweathermap.org/img/wn/13n@2x.png',
    },
  },
  '80': {
    day: {
      description: 'Light Showers',
      image: 'https://openweathermap.org/img/wn/09d@2x.png',
    },
    night: {
      description: 'Light Showers',
      image: 'https://openweathermap.org/img/wn/09n@2x.png',
    },
  },
  '81': {
    day: {
      description: 'Showers',
      image: 'https://openweathermap.org/img/wn/09d@2x.png',
    },
    night: {
      description: 'Showers',
      image: 'https://openweathermap.org/img/wn/09n@2x.png',
    },
  },
  '82': {
    day: {
      description: 'Heavy Showers',
      image: 'https://openweathermap.org/img/wn/09d@2x.png',
    },
    night: {
      description: 'Heavy Showers',
      image: 'https://openweathermap.org/img/wn/09n@2x.png',
    },
  },
  '85': {
    day: {
      description: 'Light Snow Showers',
      image: 'https://openweathermap.org/img/wn/13d@2x.png',
    },
    night: {
      description: 'Light Snow Showers',
      image: 'https://openweathermap.org/img/wn/13n@2x.png',
    },
  },
  '86': {
    day: {
      description: 'Snow Showers',
      image: 'https://openweathermap.org/img/wn/13d@2x.png',
    },
    night: {
      description: 'Snow Showers',
      image: 'https://openweathermap.org/img/wn/13n@2x.png',
    },
  },
  '95': {
    day: {
      description: 'Thunderstorm',
      image: 'https://openweathermap.org/img/wn/11d@2x.png',
    },
    night: {
      description: 'Thunderstorm',
      image: 'https://openweathermap.org/img/wn/11n@2x.png',
    },
  },
  '96': {
    day: {
      description: 'Light Thunderstorms With Hail',
      image: 'https://openweathermap.org/img/wn/11d@2x.png',
    },
    night: {
      description: 'Light Thunderstorms With Hail',
      image: 'https://openweathermap.org/img/wn/11n@2x.png',
    },
  },
  '99': {
    day: {
      description: 'Thunderstorm With Hail',
      image: 'https://openweathermap.org/img/wn/11d@2x.png',
    },
    night: {
      description: 'Thunderstorm With Hail',
      image: 'https://openweathermap.org/img/wn/11n@2x.png',
    },
  },
};

/**
 * A function to return an image representation of a WMO weather code.
 * @{link: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM}
 *
 * The image mapping was obtained from Github and uses Open Weather Map imagery.
 * @{link: https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c}
 * @param weatherCode The WMO weather code
 * @returns A "day" image representation of the WMO weather code
 */
export function getWeatherImage(weatherCode: WeatherCode) {
  const weatherCodeObj = items[weatherCode];
  if (weatherCodeObj && weatherCodeObj.day) {
    return weatherCodeObj.day.image;
  } else {
    return 'No image available';
  }
}

/**
 * A function to find the closest WMO weather code to the given number.
 *
 * @param targetNumber The number to find the closest WMO weather code to.
 * @returns The WMO weather code that is closest to the given number.
 */
export function findClosestKey(targetNumber: string): number {
  const keys = Object.keys(items).map(Number);

  let closestKey = keys[0];
  let smallestDiff = Math.abs(Number(targetNumber) - keys[0]);

  keys.forEach(key => {
    const diff = Math.abs(Number(targetNumber) - key);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestKey = key;
    }
  });

  return closestKey;
}

export default getWeatherImage;
