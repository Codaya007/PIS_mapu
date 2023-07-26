import { Text, View, StyleSheet } from "react-native";
import React from "react";
import MapApi from "../components/MapApi";
import SearchBar from "../components/SearchBar";
import ResultSearch from "../components/ResultSearch";
import Filter from "../screens/Filter"

export default function Home() {
  return (

    <View style={styles.container}>
      <MapApi />
      <View style={styles.appBar}>
        <SearchBar />
        {/* <ResultSearch/> */}
        {/* <Text>M A P U</Text> */}
        {/* <Filter/> */}
        {/* Aquí puedes agregar más contenido para el AppBar */}
      </View>
    </View>

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
