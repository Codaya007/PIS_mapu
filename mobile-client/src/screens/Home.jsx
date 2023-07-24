import { Text, View } from "react-native";
import React from "react";
import MapApi from "../components/MapApi";
import SearchBar from "../components/SearchBar";
import ResultSearch from "../components/ResultSearch";
import Filter from "../screens/Filter"

export default function Home() {
  return (
    <View>
      <SearchBar/>
      <ResultSearch/>
      {/* <Text>M A P U</Text> */}
      {/* <MapApi /> */}
      {/* <Filter/> */}
    </View>
  );
}
