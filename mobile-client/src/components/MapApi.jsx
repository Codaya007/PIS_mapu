import { StatusBar, View, StyleSheet, LinkStyle } from "react-native";
import MapView, { Marker, Polygon, Polyline } from "react-native-maps";
import { findNearestRoute, getAllNodes } from "../services/Nodes";
import Toast from "react-native-toast-message";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

const initialState = {
  coordinates: ["0", "0"],
  latitude: "0",
  longitude: "0",
  latitudeDelta: "0.00005",
  longitudeDelta: "0.00005",
  name: "Mi Ubicación",
  type: "Mi Ubicación",
};
const allowedColors = ["rgba(255, 0, 0, 0.5)", "rgba(252, 236, 80 , 0.5)", "rgba(70, 144, 250, 0.5)", "rgba(21, 254, 67, 0.5)", "rgba(241, 53, 244, 0.5)", "rgba(17, 16, 17, 0.5)"]

export default function MapApi({ nodeSelected, faculty }) {
  const [nodesPoint, setNodesPoint] = useState([]);
  const [onSelect, setOnSelect] = useState(false);
  const [path, setPath] = useState([]);
  const [nodeMarkerStart, setNodeMarkerStart] = useState("");
  const [nodeMarkerEnd, setNodeMarkerEnd] = useState("");
  const [polygon, setPolygon] = useState([]);
  const [gpsNode, setGpsNode] = useState(initialState);
  const mapRef = useRef(null);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * allowedColors.length);
    return allowedColors[randomIndex];
  };
  
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
    console.log(gpsNode);
  };

  const printNode = (node) => {
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
      console.log("Initial position", latitude, longitude);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: "0.00005",
          longitudeDelta: "0.00005",
        });
      }
    };

    handleInitialLocation();
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

  useEffect(() => {

    if (faculty?.polygons?.length > 0) {
      const polygonCoordinates = faculty?.polygons.map((polygon) => {
        return polygon.map((point) => {
          return { latitude: point[0], longitude: point[1] };
        });
      });
      setPolygon(polygonCoordinates);
      Toast.show({
        type: "success",
        text1: "Poligono graficado",
        position: "bottom",
      });
    }else{
      Toast.show({
        type: "error",
        text1: "La Facultad no tiene un poligono definido",
        position: "bottom",
      });
    }
  }, [faculty]);

  const handleShortPath = async (node) => {
    try {
      const information = await findNearestRoute(node);
      setPath(createArrayToMap(information.result.path));
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

  const showInformation = () => {};

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
        {polygon && polygon.map( (poly) => (
          <Polygon
            coordinates={poly}
            fillColor={getRandomColor()}
            strokeColor="black"
            strokeWidth={3}
          />
        )
        )}

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
