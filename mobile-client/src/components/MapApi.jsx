import { StatusBar, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

let placesOfInterest = [
  {
    title: "Redondel",
    location: {
      latitude: -4.0328,
      longitude: -79.2024,
    },
    description: "Redondel de la Universidad Nacional de Loja",
  },
];

export default function MapApi() {
  const onRegionChange = (region) => {
    // console.log(region); // Visualizar las coordenadas
  };

  const showLocationsOfInterest = () => {
    return placesOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: -4.032768234697718,
          latitudeDelta: 0.000546819178341984,
          longitude: -79.20239863917232,
          longitudeDelta: 0.00026654452085494995,
        }}
      >
        {showLocationsOfInterest()}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});