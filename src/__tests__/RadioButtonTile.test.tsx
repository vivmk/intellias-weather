import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import RadioButtonTile from '../RadioButtonTile';
import {Location} from '../global.interface';
import {getWeatherFromLocation} from '../helpers/weatherApiHelpers';

jest.mock('../helpers/weatherApiHelpers', () => ({
  getWeatherFromLocation: jest.fn(),
}));

describe('RadioButtonTile', () => {
  let mockLocation: Location;
  let mockSetLocationData: jest.Mock<any, any, any>;
  let mockSetIsModalVisible: jest.Mock<any, any, any>;
  let mockLocationsList:
    | Location[]
    | {id: number; name: string; country: string}[];
  let mockSetWeeklyData: jest.Mock<any, any, any>;

  beforeEach(() => {
    mockLocation = {
      id: 1,
      name: 'London',
      country: 'UK',
      latitude: 1,
      longitude: 1,
    };
    mockSetLocationData = jest.fn();
    mockSetIsModalVisible = jest.fn();
    mockLocationsList = [mockLocation];
    mockSetWeeklyData = jest.fn();
  });

  it('renders location name and country', () => {
    const {getByText} = render(
      <RadioButtonTile
        item={mockLocation}
        setLocationData={mockSetLocationData}
        setIsModalVisible={mockSetIsModalVisible}
        locationsList={mockLocationsList as Location[]}
        setWeeklyData={mockSetWeeklyData}
      />,
    );

    expect(
      getByText(`${mockLocation.name}, ${mockLocation.country}`),
    ).toBeTruthy();
  });

  it('calls updateWeatherInfo on press', async () => {
    const {getByText} = render(
      <RadioButtonTile
        item={mockLocation}
        setLocationData={mockSetLocationData}
        setIsModalVisible={mockSetIsModalVisible}
        locationsList={mockLocationsList as Location[]}
        setWeeklyData={mockSetWeeklyData}
      />,
    );

    const button = getByText(`${mockLocation.name}, ${mockLocation.country}`);
    fireEvent.press(button);

    expect(mockSetLocationData).toHaveBeenCalledWith(null);
    expect(getWeatherFromLocation).toHaveBeenCalledWith(
      mockLocationsList,
      mockLocation.id,
      mockSetWeeklyData,
    );
  });
});
