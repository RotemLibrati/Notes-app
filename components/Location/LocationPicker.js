import React from 'react';
import { View, StyleSheet } from 'react-native';
import Map from './Map';

const LocationPicker = props => {
  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        <Map />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: 280,
    height: 280,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LocationPicker;
