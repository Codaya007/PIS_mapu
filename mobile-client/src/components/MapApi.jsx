import { StatusBar, View, StyleSheet, LinkStyle } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { getAllNodes } from "../services/Nodes";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import React from "react";

export default function MapApi({route}) {
  // const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [nodesPoint, setNodesPoint] = useState([]);
  const [onSelect, setOnSelect] = useState(false);

  // const { node } = route.params;
  console.log("hola con route: ", route);
 
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
    // console.log("hola")
    // console.log(nodeSelected)
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
        {showNodesOnMap()}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    marginHorizontal: 0,
    marginVertical: 0,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
