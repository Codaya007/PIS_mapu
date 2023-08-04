import { Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapApi from "../components/MapApi";
import { Box, Select, Item, Picker, FormControl } from "native-base";
import { getFaculties } from "../services/faculty";
import Toast from "react-native-toast-message";

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [faculty, setFaculty] = useState('');

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
        text1: "Error al cargar nodos",
        position: "bottom",
      });
      console.log({ error });
    }
  };

  return (
    <View style={styles.container}>
      <MapApi  faculty={faculty}/>
      <View style={styles.appBar}>
        <Box bg='white' w='100%' p={4} color='black'>
        <FormControl>
          <FormControl.Label>
            Selecione la facultad <Text style={{ color: "red" }}>*</Text>
          </FormControl.Label>
          <Select
            selectedValue= {faculty?.name}
            minWidth="200"
            accessibilityLabel="Elige la facultad"
            placeholder="Elige la facultad"
            mt={1}
            onValueChange={(itemValue) => {setFaculty(itemValue)}}
          >
            {faculties.map((faculty) => (
              <Select.Item
                key={faculty._id}
                label={faculty?.name || "No hay nombre"}
                value={faculty || "No hay nombre"}
              />
            ))}
          </Select>
        </FormControl>
        </Box>
      </View>
    </View>
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
