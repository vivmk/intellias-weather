import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import AverageDataTile from './AverageDataTile';
import {DailyAverage, WeatherCard} from './global.interface';

/**
 * A React component that renders a button to reset the location and a list of
 * average temperatures for the week.
 *
 * @param {{
 *   weeklyData: DailyAverage[], // the weekly temperatures
 *   locationData: WeatherCard | null, // the current location data
 *   resetWeatherData: () => void // the function to reset the location data
 * }} props The properties for this component.
 * @returns {React.ReactElement | null} A JSX element representing the
 * weekly data or null if the location has no temperature.
 */
const ResetAndWeeklyData = ({
  weeklyData,
  locationData,
  resetWeatherData,
}: {
  weeklyData: DailyAverage[];
  locationData: WeatherCard | null;
  resetWeatherData: () => void;
}): React.ReactElement | null => {
  return locationData?.temperature ? (
    <>
      <Button title="Reset Location" onPress={resetWeatherData} />
      <View style={styles.sectionContainer}>
        <Text style={styles.headerText}>Weekly Data</Text>
        <FlatList
          data={weeklyData}
          keyExtractor={item => item.date}
          renderItem={({item}) => <AverageDataTile item={item} />}
        />
      </View>
    </>
  ) : (
    <></>
  );
};

export default ResetAndWeeklyData;

const styles = StyleSheet.create({
  sectionContainer: {
    maxHeight: 400,
    borderRadius: 16,
    borderColor: 'grey',
    padding: 25,
    borderWidth: 2,
    marginTop: 30,
  },
  headerText: {
    fontSize: 16,
    marginBottom: 10,
    paddingLeft: 5,
    fontWeight: 'bold',
    color: 'grey',
  },
});
