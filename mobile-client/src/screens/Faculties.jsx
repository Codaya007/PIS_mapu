import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Select } from "native-base";
import { getFaculties } from "../services/faculty";
import Toast from "react-native-toast-message";
import FacultiesMap from "../components/FacultiesMap";

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    handleFaculties();
  }, []);

  const handleFaculties = async () => {
    try {
      const { results } = await getFaculties();
      setFaculties(results);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No se han podido obtener las facultades",
        position: "bottom",
      });
      console.log({ error });
    }
  };

  return (
    <View style={styles.container}>
      <FacultiesMap faculties={faculties} faculty={faculty} />
      <View style={styles.appBar}>
        <Box bg='white' w='100%' p={4} color='black'>
          <Box>
            <Select
              minWidth="200"
              placeholder={faculty?.name || "Seleccione una facultad"}
              mt={1}
              onValueChange={(itemValue) => { setFaculty(itemValue) }}
            >
              <Select.Item key={"1"} label={"Todas las facultades"} value={null} />
              {faculties.map((faculty) => (
                <Select.Item
                  key={faculty._id}
                  label={faculty?.name || "No hay nombre"}
                  value={faculty}
                />
              ))}
            </Select>
          </Box>
        </Box>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  appBar: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    zIndex: 1,

  },
});
