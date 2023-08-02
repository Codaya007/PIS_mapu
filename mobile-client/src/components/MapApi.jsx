import { StatusBar, View, StyleSheet, LinkStyle } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useEffect, useState } from "react";
import { findNearestRoute, getAllNodes } from "../services/Nodes";

export default function MapApi({ nodeSelected }) {
  const [nodesPoint, setNodesPoint] = useState([]);
  const [onSelect, setOnSelect] = useState(false);
  const [path, setPath] = useState([]);

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
    handleShortPath();
  }, []);

  const node = {
    origin: "64bdb67659c2ddc3c95f4159",
    destination: "64bdb67659c2ddc3c95f415b",
    type: "byNode",
  };

  const handleShortPath = async () => {
    console.log("short path");
    const information = await findNearestRoute(node);
    drawPath(information.result.path);
  };
  const drawPath = async (points) => {
    //Aniadir las coordenadas par alel polyname
    const coordinates = [];

    for (let i = 0; i < points.length; i++) {
      // console.log(path[i].coordinate);
      coordinates.push(points[i].coordinate);
    }
    const convertedCoordinates = coordinates.map((coordinate) => {
      return {
        latitude: coordinate[0],
        longitude: coordinate[1],
      };
    });
    console.log('first')
    setPath(convertedCoordinates);
    console.log(path);

    // Trazar la ruta del polilyne
    // polyline(coordinates).addTo(this.map);
  };

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
        <Polyline
          coordinates={path}
          strokeColor="#238C23"
          strokeWidth={6}
        />

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
