import React from 'react';
import {Modal, View, Text, FlatList, StyleSheet} from 'react-native';

import RadioButtonTile from './RadioButtonTile';
import {DailyAverage, Location} from './global.interface';
import {Dispatch, SetStateAction} from 'react';
import {LocationStateType} from '../App';

/**
 * A React component that renders a modal with a list of radio buttons for
 * selecting a location from a list of locations with the same name.
 *
 * @param {{
 *   isModalVisible: boolean,
 *   locationsList: Location[],
 *   setLocationData: (location: Location) => void,
 *   setIsModalVisible: (isModalVisible: boolean) => void,
 *   setWeeklyData: (weeklyData: DailyAverage[]) => void,
 * }} props The properties for this component.
 * @returns {JSX.Element} A JSX element representing the modal.
 */
const LocationsModal = ({
  isModalVisible,
  locationsList,
  setLocationData,
  setIsModalVisible,
  setWeeklyData,
}: {
  isModalVisible: boolean;
  locationsList: Array<Location>;
  setLocationData: Dispatch<SetStateAction<LocationStateType>>;
  setIsModalVisible: (isModalVisible: boolean) => void;
  setWeeklyData: (weeklyData: Array<DailyAverage>) => void;
}): JSX.Element => {
  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>
            There are multiple places with this name. Please select one.
          </Text>
          <View style={styles.listContainer}>
            <FlatList
              data={locationsList}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <RadioButtonTile
                  item={item}
                  setLocationData={setLocationData}
                  setIsModalVisible={setIsModalVisible}
                  locationsList={locationsList}
                  setWeeklyData={setWeeklyData}
                />
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: 20,
    backgroundColor: '#eee',
    width: 300,
    padding: 20,
  },
  headerText: {fontSize: 16, fontWeight: 'bold', marginBottom: 20},
  listContainer: {maxHeight: 400},
});
