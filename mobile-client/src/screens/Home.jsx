import { Fab, Box, Text, Heading, Button } from 'native-base';
import { View, StyleSheet, Dimensions, PixelRatio } from "react-native";
import MapApi from "../components/MapApi";
import SearchBar from "../components/SearchBar";
import FromTo from "../components/FromTo";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, restartSearch, setOnSearchProcess } from '../store/slices/searchSlice';
import { useEffect } from 'react';
import Toast from "react-native-toast-message";

export default function Home() {
  const dispatch = useDispatch();
  const {
    currentNode,
    errorOnPathSearch,
    onSearchProcess,
    resultMessage,
    resultAccessNode,
    totalDistance,
    origin,
    destination
  } = useSelector(state => state.searchReducer);

  // Función para convertir píxeles a dp
  const scalePixelToDp = (pixelValue) => {
    const screenWidth = Dimensions.get('window').width;
    const dpValue = PixelRatio.roundToNearestPixel((pixelValue * screenWidth) / 375);
    return dpValue;
  };

  const handleFabClick = () => {
    dispatch(setOnSearchProcess(!onSearchProcess));
  };

  const right = scalePixelToDp(-5);

  useEffect(() => {
    if (errorOnPathSearch) {
      Toast.show({
        type: "error",
        text1: errorOnPathSearch,
        position: "bottom"
      });
      dispatch(clearError())
    }
  }, [errorOnPathSearch]);

  return (
    <View style={styles.container}>
      <MapApi nodeSelected={currentNode} />
      <View style={styles.appBar}>
        {onSearchProcess ? (
          <FromTo />
        ) : (
          <SearchBar />
        )}
      </View>
      {(!!totalDistance && origin && destination) &&
        <Box position="absolute"
          bottom={0}
          width={"72%"}
          left={0}
          bgColor={"white"}
          borderRadius={5}
          margin={2}
          p={1}
        >
          <Box p={2}>
            <Heading size={"xs"}>Indicaciones:</Heading>
            <Text>Desde '{origin.title || origin.name || "el punto de origen seleccionado"}' hasta '{destination.title || destination.name || "el punto de destino seleccionado"}' hay {parseInt(totalDistance)} metros de distancia.</Text>
            <Text>Puede visualizar la ruta en el mapa</Text>
          </Box>
          {!!resultMessage && <Box p={1}>
            <Heading size={"xs"}>Información adicional:</Heading>
            <Text>{resultMessage || "-"}</Text>
          </Box>}
          <Button
            colorScheme={"red"}
            width={"80%"}
            marginX={"auto"}
            marginY={1}
            variant={"subtle"}
            onPress={() => { dispatch(restartSearch()) }}
          >
            Quitar ruta
          </Button>
        </Box>}
      <Box
        position="absolute"
        bottom={0}
        right={right}
      >
        <Fab
          renderInPortal={false}
          shadow={2}
          size="sm"
          icon={
            onSearchProcess ? (
              <MaterialIcons name="navigation" size={20} color="white" />
            ) : (
              <Entypo name="dots-three-horizontal" size={20} color="white" />
            )}
          onPress={handleFabClick}
        />
      </Box>
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
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
