import { Fab, Box, Button, Heading, Text, Toast } from 'native-base';
import { View, StyleSheet, Dimensions, PixelRatio } from "react-native";
import MapApi from "../components/MapApi";
import SearchBar from "../components/SearchBar";
import FromTo from "../components/FromTo";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { clearError, setCurrentNode, setDestination } from '../store/slices/searchSlice';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useDispatch();
  const [showComponent, setShowComponent] = useState(false);
  const { currentNode } = useSelector(state => state.searchReducer);

  // Función para convertir píxeles a dp
  const scalePixelToDp = (pixelValue) => {
    const screenWidth = Dimensions.get('window').width;
    const dpValue = PixelRatio.roundToNearestPixel((pixelValue * screenWidth) / 375);
    return dpValue;
  };

  const handleFabClick = () => {
    setShowComponent(!showComponent);
  };

  const bottomActive = scalePixelToDp(-575);
  const right = scalePixelToDp(-5);
  const bottomInactive = scalePixelToDp(-618);

  return (
    <View style={styles.container}>
      <MapApi nodeSelected={currentNode} />
      <View style={styles.appBar}>
        {showComponent ? (
          <FromTo />
        ) : (
          <SearchBar />
        )}
        {currentNode &&
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
            borderTopRadius={30}
            padding={3}
          >
            <Heading size={"md"} padding={2}>
              {currentNode?.detail?.title}
            </Heading>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text width={"70%"} textAlign={"justify"}>{currentNode?.detail?.description}</Text>
              <Box width={"25%"}>
                <Button onPress={() => {
                  setShowComponent(true)
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
          bottom={showComponent ? bottomActive : bottomInactive}
          right={right}
        >
          <Fab
            renderInPortal={false}
            shadow={2}
            size="sm"
            backgroundColor={"indigo.500"}
            icon={
              showComponent ? (
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
