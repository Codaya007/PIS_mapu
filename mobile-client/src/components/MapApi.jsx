import { StatusBar, View, StyleSheet, LinkStyle } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useEffect, useState } from "react";
import { findNearestRoute, getAllNodes } from "../services/Nodes";
import { Button } from "native-base";
import Toast from "react-native-toast-message";

const nodeState = {
  origin: "",
  destination: "",
  type: "byNode",
};

const coordenate = {
  latitude: null,
  longitude: null,
};
export default function MapApi({ nodeSelected }) {
  const [nodesPoint, setNodesPoint] = useState([]);
  const [onSelect, setOnSelect] = useState(false);
  const [path, setPath] = useState([]);
  const [nodeMarkerStart, setNodeMarkerStart] = useState("");
  const [nodeMarkerEnd, setNodeMarkerEnd] = useState("");

  const onRegionChange = (region) => {
    // console.log(region); // Visualizar las coordenadas
  };

  const handleNodes = async () => {
    try {
      const { nodes } = await getAllNodes();
      setNodesPoint(nodes);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al cargar nodos",
        position: "bottom",
      });
      console.log({ error });
    }
  };

  useEffect(() => {
    handleNodes();
  }, []);

  useEffect(() => {
    if ((nodeMarkerStart != "") & (nodeMarkerEnd != "")) {
      const node = {
        type: "byNode",
        origin: nodeMarkerStart,
        destination: nodeMarkerEnd,
      };
      handleShortPath(node);
      setNodeMarkerStart("");
      setNodeMarkerEnd("");
    }
  }, [nodeMarkerStart, nodeMarkerEnd]);

  const handleShortPath = async (node) => {
    try {
      const information = await findNearestRoute(node);
      drawPath(information.result.path);
      Toast.show({
        type: "success",
        text1: "Ruta calculada",
        position: "bottom",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Los nodos no estan conectados",
        position: "bottom",
      });
    }
  };

  const drawPath = async (points) => {
    const coordinates = [];

    for (let i = 0; i < points.length; i++) {
      coordinates.push(points[i].coordinate);
    }

    const convertedCoordinates = coordinates.map((coordinate) => {
      return {
        latitude: coordinate[0],
        longitude: coordinate[1],
      };
    });
    setPath(convertedCoordinates);
  };

  const handleNode = (node) => {
    if (nodeMarkerStart == "") {
      setNodeMarkerStart(node._id);
    } else if (nodeMarkerEnd == "") {
      setNodeMarkerEnd(node._id);
    }
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
            onPress={() => handleNode(node)}
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
        <Polyline coordinates={path} strokeColor="#238C23" strokeWidth={6} />
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
