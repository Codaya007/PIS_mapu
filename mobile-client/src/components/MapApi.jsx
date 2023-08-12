import { StatusBar, View, StyleSheet, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import { getAllNodes } from "../services/Nodes";
import Toast from "react-native-toast-message";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

import {
  DetailNodeName
} from "../constants/index"
import { useSelector } from "react-redux";

const initialState = {
  coordinates: ["0", "0"],
  latitude: "0",
  longitude: "0",
  latitudeDelta: "0.0005",
  longitudeDelta: "0.0005",
  name: "Mi Ubicación",
  type: "Mi Ubicación",
};

export default function MapApi({ nodeSelected, onSelect = false }) {
  const [nodesPoint, setNodesPoint] = useState([]);
  const [path, setPath] = useState([]);
  const [nodeMarkerStart, setNodeMarkerStart] = useState("");
  const [nodeMarkerEnd, setNodeMarkerEnd] = useState("");
  const [gpsNode, setGpsNode] = useState(initialState);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const { path: originalPath, totalDistance = 0 } = useSelector(state => state.searchReducer)

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

  const handleGpsNode = (userLocation) => {
    const { latitude, longitude } = userLocation.nativeEvent.coordinate;
    const updatedGpsNode = {
      ...gpsNode,
      coordinates: [latitude.toString(), longitude.toString()],
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    };
    setGpsNode(updatedGpsNode);
  };

  const handlePressClickNode = (node) => {
    navigation.navigate(DetailNodeName, { nodeId: node?._id, type: node?.type });
  }

  const printNode = (node) => {
    return (
      <Marker
        key={node?._id}
        coordinate={{
          latitude: node?.latitude,
          longitude: node?.longitude,
        }}
        title={node?.name}
        description={"Ver más"}
        pinColor={node?.color}
      >
        <Callout onPress={() => handlePressClickNode(node)}>
        </Callout>
      </Marker>
    );
  };


  useEffect(() => {
    handleNodes();

    const handleInitialLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      if (mapRef.current) {
        await mapRef.current.animateCamera({
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 250, //altitud en metros para ios, ignorado por android
          zoom: 15 //zoom para android, ignorado por ios
        }, 5000);
      }
    };

    handleInitialLocation();
  }, [mapRef.current]);

  // useEffect(() => {
  //   if ((nodeMarkerStart != "") & (nodeMarkerEnd != "")) {
  //     const node = {
  //       type: "byNode",
  //       origin: nodeMarkerStart,
  //       destination: nodeMarkerEnd,
  //     };
  //     handleShortPath(node);
  //     setNodeMarkerStart("");
  //     setNodeMarkerEnd("");
  //   }
  // }, [nodeMarkerStart, nodeMarkerEnd]);

  const handleShortPath = () => {
    try {

      setPath(createArrayToMap(originalPath));

      Toast.show({
        type: "success",
        text1: `Hay ${parseInt(totalDistance)} ms hasta su destino`,
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

  const createArrayToMap = (points) => {
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
    return convertedCoordinates;
  };

  const showInformation = () => { };

  const handleNode = (node) => {
    showInformation();

    if (nodeMarkerStart == "") {
      setNodeMarkerStart(node._id);
    } else if (nodeMarkerEnd == "") {
      setNodeMarkerEnd(node._id);
    }
  };

  const showNodesOnMap = () => {
    return nodesPoint.map((node) => {
      if (node.type !== "Ruta" && !onSelect) {
        return printNode(node);
      }
    });
  };

  useEffect(() => {
    originalPath && handleShortPath();
  }, [originalPath]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: -0.19964851407494397,
          latitudeDelta: 100,
          longitude: -78.48328033483989,
          longitudeDelta: 100,
        }}
        showsUserLocation={true}
        followsUserLocation={false}
        userLocationPriority="high"
        userLocationUpdateInterval={5000}
        userLocationFastestInterval={5000}
        onUserLocationChange={handleGpsNode}
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
    marginHorizontal: 0,
    marginVertical: 0,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
