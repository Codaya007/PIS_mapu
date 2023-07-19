import { NativeBaseProvider } from "native-base";
// import { NativeRouter } from "react-router-native";
import Main from "./src/screens/Main";
import Toast from "react-native-toast-message";
import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Events from "./src/screens/Events";
import LoginForm from "./src/screens/Login";
import Register from "./src/screens/Register";
import About from "./src/screens/About";
import Favorites from "./src/screens/Favorites";
import ForgotPasswordForm from "./src/screens/ForgotPasswordForm";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  // <Main />
  return (
    <NativeBaseProvider>
      {/* <NativeRouter> */}
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Eventos" component={Events} />
            <Drawer.Screen name="Favoritos" component={Favorites} />
            <Drawer.Screen name="Iniciar sesión" component={LoginForm} />
            <Drawer.Screen name="Registrarse" component={Register} />
            <Drawer.Screen
              name="Olvidé mi contraseña"
              component={ForgotPasswordForm}
            />
            <Drawer.Screen name="Acerca de" component={About} />
          </Drawer.Navigator>
        </NavigationContainer>
        <Toast />
      {/* </NativeRouter> */}
    </NativeBaseProvider>
  );
}
