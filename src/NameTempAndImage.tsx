import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';

import {WeatherCard} from './global.interface';

/**
 * A React component that renders a tile with a location name, current temperature,
 * and weather image.
 *
 * @param {WeatherCard} locationData
 * An object containing the name, temperature, and weather image of the location.
 * @returns {JSX.Element} A JSX element representing the name, temperature, and
 * weather image.
 */
const NameTempAndImage = ({
  locationData,
}: {
  locationData: WeatherCard;
}): JSX.Element => {
  return (
    <>
      <Text style={styles.nameContainer}>{locationData.name}</Text>
      <Text style={styles.tempContainer}>{locationData.temperature}</Text>
      {locationData.weatherImage && (
        <Image
          source={{uri: locationData.weatherImage}}
          width={100}
          height={100}
        />
      )}
    </>
  );
};

export default NameTempAndImage;

const styles = StyleSheet.create({
  nameContainer: {fontSize: 26, fontWeight: 'bold'},
  tempContainer: {fontSize: 22, fontWeight: 'bold', marginTop: 10},
});
