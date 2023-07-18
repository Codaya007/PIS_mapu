import { Text, View } from "react-native";
import React, { Component } from "react";
import MapApi from './MapApi';

export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>M A P U</Text>
        <MapApi/>
      </View>
    );
  }
}
