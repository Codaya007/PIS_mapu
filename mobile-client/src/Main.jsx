import React from "react";
import Home from "./screens/Home";
import LoginForm from "./screens/Login";
import Register from "./screens/Register";
import About from "./screens/About";
import Events from "./screens/Events";
import Favorites from "./screens/Favorites";
import ForgotPasswordForm from "./screens/ForgotPasswordForm";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  AboutName,
  CommentName,
  EventsName,
  FavoritesName,
  ForgotPasswordName,
  HomeName,
  LoginName,
  RegisterName,
} from "./constants";
import Comment from "./screens/Comment";

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <>
      {/* <View style={{ flex: 1 }}>
        <Sidebar />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/login" Component={LoginForm} />
          <Route path="/sign-up" Component={Register} />
          <Route path="/about" Component={About} />
          <Route path="/events" Component={Events} />
          <Route path="/favorites" Component={Favorites} />
          <Route path="/forgot-password" Component={ForgotPasswordForm} />
          <Route path="/reset-password/:token" Component={ForgotPasswordForm} />
          <Route path="/*" Component={Home} />
        </Routes>
      </View> */}
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name={HomeName} component={Home} />
          <Drawer.Screen name={LoginName} component={LoginForm} />
          <Drawer.Screen name={RegisterName} component={Register} />
          <Drawer.Screen name={AboutName} component={About} />
          <Drawer.Screen name={EventsName} component={Events} />
          <Drawer.Screen name={FavoritesName} component={Favorites} />
          <Drawer.Screen
            name={ForgotPasswordName}
            component={ForgotPasswordForm}
          />
          <Drawer.Screen name={CommentName} component={Comment} />

        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Main;
