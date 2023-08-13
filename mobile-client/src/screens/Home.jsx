import { Fab, Box, Button, Heading, Text } from 'native-base';
import { View, StyleSheet, Dimensions, PixelRatio } from "react-native";
import MapApi from "../components/MapApi";
import SearchBar from "../components/SearchBar";
import FromTo from "../components/FromTo";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { clearError, setCurrentNode, setDestination, setOnSearchProcess } from '../store/slices/searchSlice';
import { useEffect } from 'react';
import Toast from "react-native-toast-message";

export default function Home() {
  const dispatch = useDispatch();
  const { currentNode, errorOnPathSearch, onSearchProcess } = useSelector(state => state.searchReducer);

  // Función para convertir píxeles a dp
  const scalePixelToDp = (pixelValue) => {
    const screenWidth = Dimensions.get('window').width;
    const dpValue = PixelRatio.roundToNearestPixel((pixelValue * screenWidth) / 375);
    return dpValue;
  };

  const handleFabClick = () => {
    dispatch(setOnSearchProcess(!onSearchProcess));
  };

  const bottomActive = scalePixelToDp(-575);
  const right = scalePixelToDp(-5);
  const bottomInactive = scalePixelToDp(-618);

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
        {currentNode && !onSearchProcess &&
          <Box
            position={"absolute"}
            top={"570"}
            // bottom={0}
            left={"0"}
            right={"0"}
            width={"100%"}
            // height={"25%"}
            bgColor={"white"}
            zIndex={3}
            borderRadius={30}
            padding={3}
          >
            <Heading size={"md"} padding={2}>
              {currentNode?.title}
            </Heading>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text width={"70%"} textAlign={"justify"}>{currentNode?.description || "Sin descripción"}</Text>
              <Box width={"25%"}>
                <Button onPress={() => {
                  dispatch(setOnSearchProcess(true))
                  dispatch(setDestination(currentNode))
                  dispatch(setCurrentNode(null))
                }} borderRadius={"50"} width={"20"}>
                  <Ionicons name="return-up-forward" size={20} color="black" />
                </Button>
                <Text>Cómo llegar</Text>
              </Box>
            </View>
          </Box>
        }
        <Box
          position="absolute"
          bottom={onSearchProcess ? bottomActive : bottomInactive}
          right={right}
        >
          <Fab
            renderInPortal={false}
            shadow={2}
            size="sm"
            backgroundColor={"indigo.500"}
            icon={
              onSearchProcess ? (
                <MaterialIcons name="navigation" size={20} color="white" />
              ) : (
                <Entypo name="dots-three-horizontal" size={20} color="white" />
              )}
            onPress={handleFabClick}
          />
        </Box>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  appBar: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    zIndex: 1,
    flex: 1,
  },
});
