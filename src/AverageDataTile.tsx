import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import getWeatherImage, {
  findClosestKey,
  WeatherCode,
} from './helpers/getWeatherImage';
import {getFormattedDate} from './helpers/getFormattedDate';
import {DailyAverage} from './global.interface';

/**
 * A React component that renders a tile for average weather data.
 *
 * @param {DailyAverage} item An object containing the date, average temperature, and average weather code.
 * @returns {JSX.Element} A JSX element representing the average weather data tile.
 */
const AverageDataTile = ({item}: {item: DailyAverage}): JSX.Element => {
  const weatherImage = getWeatherImage(
    findClosestKey(item.avgCode) as unknown as WeatherCode,
  );

  return (
    <View style={styles.container}>
      <View style={styles.dateTempContainer}>
        <Text style={styles.dateContainer}>{getFormattedDate(item.date)}</Text>
        <Text style={styles.tempContainer}>Avg Temp: {item.avgTemp}</Text>
      </View>
      <Image source={{uri: weatherImage}} width={50} height={50} />
    </View>
  );
};

export default AverageDataTile;

const styles = StyleSheet.create({
  tempContainer: {fontSize: 12},
  dateContainer: {fontWeight: 'bold'},
  dateTempContainer: {paddingRight: 20},
  container: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#d5d8dc',
    marginVertical: 4,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
