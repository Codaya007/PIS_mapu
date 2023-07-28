import { StatusBar, View, StyleSheet, LinkStyle } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { getAllNodes } from "../services/Nodes";

export default function MapApi({ nodeSelected }) {
  const [nodesPoint, setNodesPoint] = useState([]);
  const [onSelect, setOnSelect] = useState(false);

  const onRegionChange = (region) => {
    // console.log(region); // Visualizar las coordenadas
  };

  const handleNodes = async () => {
    try {
      const { nodes } = await getAllNodes();
      setNodesPoint(nodes);
    } catch (error) {
      // Mostrar error
      console.log({ error });
    }
  };

  useEffect(() => {
    handleNodes();
  }, []);

  const showNodesOnMap = () => {
    return nodesPoint.map((node) => {
      if (node.type !== "Ruta" && !onSelect) {
        return (
          <Marker
            key={node?._id}
            coordinate={{
              latitude: node?.latitude,
              longitude: node?.longitude,
            }}
            title={node?.name}
            description={node?.type}
            pinColor={node?.color}
          />
        );
      }
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
        {/* {showLocationsOfInterest()} */}
        {showNodesOnMap()}
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
