import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

export default function App() {
  const region = {
    latitude: -23.5995593,
    longitude: -46.602116,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006 
  }
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        loadingEnabled={true}
        initialRegion={region}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  map: {
      ...StyleSheet.absoluteFillObject,
      flex: 1
  }
});