import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

import {getWeatherFromLocation} from './helpers/weatherApiHelpers';
import {DailyAverage, Location} from './global.interface';
import {LocationStateType} from '../App';

/**
 * Fetches the weather data for the given location ID and updates the weekly and location data.
 *
 * @param {Location[]} locationsList The list of locations to fetch the weather from.
 * @param {number} itemId The ID of the location to fetch the weather for.
 * @param {(weeklyData: DailyAverage[]) => void} setWeeklyData A function to set the weekly data.
 * @returns {Promise<LocationStateType>} A promise that resolves with the updated location data.
 */
const updateWeatherInfo = async (
  locationsList: Location[],
  itemId: number,
  setWeeklyData: (weeklyData: Array<DailyAverage>) => void,
): Promise<LocationStateType> => {
  const updatedWeatherData = await getWeatherFromLocation(
    locationsList,
    itemId,
    setWeeklyData,
  );
  return updatedWeatherData;
};

/**
 * A React component that renders a radio button with a label and a callback for when pressed.
 *
 * @param {{
 *   item: Location,
 *   setLocationData: React.Dispatch<React.SetStateAction<LocationStateType>>,
 *   setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
 *   locationsList: Location[],
 *   setWeeklyData: (weeklyData: Array<DailyAverage>) => void,
 * }} props The properties for this component.
 * @returns {React.ReactElement} A JSX element representing the radio button tile.
 */
const RadioButtonTile = ({
  item,
  setLocationData,
  setIsModalVisible,
  locationsList,
  setWeeklyData,
}: {
  item: Location;
  setLocationData: Dispatch<SetStateAction<LocationStateType>>;
  setIsModalVisible: (isModalVisible: boolean) => void;
  locationsList: Location[];
  setWeeklyData: (weeklyData: Array<DailyAverage>) => void;
}): React.ReactElement => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={async () => {
        setLocationData(null);
        const updatedWeatherData = await updateWeatherInfo(
          locationsList,
          item.id,
          setWeeklyData,
        );
        setLocationData(updatedWeatherData);
        setIsModalVisible(false);
      }}>
      <View style={styles.radioContainer}>
        <View style={styles.radioElement} />
      </View>
      <Text style={styles.nameCountryContainer}>
        {item.name}, {item.country}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButtonTile;

const styles = StyleSheet.create({
  radioContainer: {marginRight: 10},
  radioElement: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 20,
    backgroundColor: 'white',
  },
  nameCountryContainer: {color: 'black', width: 150},
  container: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
