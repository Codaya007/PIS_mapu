import { Fab, Box, Flex } from 'native-base';
import { Text, View, StyleSheet, Dimensions, PixelRatio } from "react-native";
import MapApi from "../components/MapApi";
import SearchBar from "../components/SearchBar";
import FromTo from "../components/FromTo";
import { IconName } from "react-icons/ai";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import Filter from "../screens/Filter"
import BeginRoute from "./BeginRoute";
import React, { useState } from "react";

export default function Home({ route }) {

  // Función para convertir píxeles a dp
  const scalePixelToDp = (pixelValue) => {
    const screenWidth = Dimensions.get('window').width;
    const dpValue = PixelRatio.roundToNearestPixel((pixelValue * screenWidth) / 375);
    return dpValue;
  };

  const bottomActive = scalePixelToDp(-575);
  const right = scalePixelToDp(-5);
  const bottomInactive = scalePixelToDp(-618);

  const [showComponent, setShowComponent] = useState(false);

  const handleFabClick = () => {
    setShowComponent(!showComponent);
  };

  return (
    <View style={styles.container}>
      <MapApi />
      <View style={styles.appBar}>
        {showComponent ? (
          <FromTo />
        ) : (
          <SearchBar />
        )}
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
                <MaterialIcons name="navigation" size={24} color="white" />
              ) : (
                <Entypo name="dots-three-horizontal" size={24} color="white" />
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
    // Ajusta otros estilos del AppBar según tus necesidades
    // backgroundColor: 'white',
    // padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'gray',
  },
});
