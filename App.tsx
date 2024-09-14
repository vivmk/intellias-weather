import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from 'react';
import React from 'react';

import {
  getIsMultipleLocations,
  getWeatherFromLocation,
} from './src/helpers/weatherApiHelpers';
import LocationsModal from './src/LocationsModal';
import ResetAndWeeklyData from './src/ResetAndWeeklyData';
import NameTempAndImage from './src/NameTempAndImage';
import {Location, DailyAverage, WeatherCard} from './src/global.interface';

export type LocationStateType = WeatherCard | null;

export default function App(): JSX.Element {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [locationsList, setLocationsList] = useState<Location[]>([]);
  const [weeklyData, setWeeklyData] = useState<DailyAverage[]>([]);
  const [locationData, setLocationData] = useState<LocationStateType>(
    {} as WeatherCard,
  );

  /**
   * Fetches the weather data for the selected location. If the location has
   * multiple matches, sets the modal visible. Otherwise, sets the location data
   * and the weekly data.
   */
  const fetchLocationsData = async (): Promise<void> => {
    const isMultipleLocations = await getIsMultipleLocations(
      selectedLocation,
      setLocationsList,
    );
    if (isMultipleLocations) {
      setIsModalVisible(true);
    } else {
      const locationLiveData = await getWeatherFromLocation(
        locationsList,
        locationsList[0].id,
        setWeeklyData,
      );
      setLocationData(locationLiveData);
    }
  };

  /**
   * Resets the weather data to its initial state.
   */
  const resetWeatherData = (): void => {
    setLocationData({} as LocationStateType);
    setSelectedLocation('');
    setLocationsList([]);
    setWeeklyData([]);
  };

  return (
    <View style={styles.container}>
      {!locationData ? (
        <Text style={styles.loadingText}>Loading ...</Text>
      ) : (
        <>
          <LocationsModal
            isModalVisible={isModalVisible}
            locationsList={locationsList}
            setLocationData={setLocationData}
            setIsModalVisible={setIsModalVisible}
            setWeeklyData={setWeeklyData}
          />
          {!locationData?.name && (
            <>
              <TextInput
                onChangeText={setSelectedLocation}
                placeholder="Enter Place Name"
                style={styles.placeInput}
              />
              <Button title="Get Weather" onPress={fetchLocationsData} />
            </>
          )}
          <NameTempAndImage locationData={locationData} />
          <ResetAndWeeklyData
            weeklyData={weeklyData}
            locationData={locationData}
            resetWeatherData={resetWeatherData}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {fontSize: 20},
  placeInput: {
    borderWidth: 1,
    fontSize: 18,
    marginVertical: 20,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
