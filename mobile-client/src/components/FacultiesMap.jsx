import { StatusBar, View, StyleSheet, } from "react-native";
import React from "react";
import MapView, { Polygon } from "react-native-maps";
import Toast from "react-native-toast-message";
import { useEffect, useRef, useState } from "react";

const allowedColors = [
  "rgba(255, 0, 0, 0.5)",
  "rgba(252, 236, 80 , 0.5)",
  "rgba(70, 144, 250, 0.5)",
  "rgba(21, 254, 67, 0.5)",
  "rgba(241, 53, 244, 0.5)",
  "rgba(17, 16, 17, 0.5)"
]

const formatPolygon = (polygon) => {
  return polygon.map((point) => {
    return { latitude: point[0], longitude: point[1] };
  });
}

export default function FacultiesMap({ faculty, faculties }) {
  const [polygons, setPolygons] = useState([]);
  const mapRef = useRef(null);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * allowedColors.length);
    return allowedColors[randomIndex];
  };

  useEffect(() => {

    if (faculty) {
      if (faculty && faculty?.polygons?.length > 0) {
        const color = getRandomColor();
        const polygonCoordinates = faculty?.polygons.map(polygon => ({ polygon: formatPolygon(polygon), color }));

        setPolygons(polygonCoordinates);

        // Toast.show({
        //   type: "success",
        //   text1: faculty.name,
        //   position: "top",
        // });
      } else {
        setPolygons([])
        Toast.show({
          type: "error",
          text1: `La facultad no tiene áreas grográficas definidas.`,
          position: "bottom",
        });
      }
    }
  }, [faculty]);

  useEffect(() => {
    // Si no ha seleccionado una facultad pero si hay el resto de facultades
    if (!faculty) {
      let allPolygons = [];
      faculties.map(faculty => {
        // Un color diferente para cada facultad
        const color = getRandomColor();
        // Mapeo todos los polígonos de la facultad
        const polygonCoordinates = faculty?.polygons.map(polygon => ({ polygon: formatPolygon(polygon), color }));

        // Concateno los polígonos al array de todos los polígonos
        allPolygons = allPolygons.concat(polygonCoordinates)
      })

      setPolygons(allPolygons);
    }
  }, [faculties, faculty]);

  useEffect(() => {
    const handleInitialLocation = async () => {
      if (mapRef.current) {
        await mapRef.current.animateCamera({
          center: {
            latitude: -4.032925984682419,
            longitude: -79.20254656812386,
          },
          pitch: 0,
          heading: 0,
        }, 5000);
      }
    };

    handleInitialLocation();
  }, [mapRef.current]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -4.032925984682419,
          latitudeDelta: 0.095,
          longitude: -79.20254656812386,
          longitudeDelta: 0.095,
        }}
        showsUserLocation={true}
      // followsUserLocation={false}
      // userLocationPriority="high"
      // userLocationUpdateInterval={5000}
      // userLocationFastestInterval={5000}
      >
        {polygons?.map(({ polygon = [], color }, index) => (
          <Polygon
            key={index}
            coordinates={polygon}
            fillColor={color}
            strokeColor="black"
            strokeWidth={3}
          />
        ))}
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
