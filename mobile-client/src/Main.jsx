import React from "react";
import Home from "./screens/Home";
import LoginForm from "./screens/Login";
import Register from "./screens/Register";
import About from "./screens/About";
import Events from "./screens/Events";
// import Favorites from "./screens/Favorites";
import DetailNodeScreen from "./screens/DetailNodeScreen";
import Filter from "./screens/Filter";
// import MapApi from "./components/MapApi";
import ResultSearch from "./components/ResultSearch";
import CommentDetail from "./screens/CommentDetail";
import ForgotPasswordForm from "./screens/ForgotPasswordForm";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  AboutName,
  ChangePasswordName,
  CommentName,
  EditProfileName,
  EventsName,
  // FavoritesName,
  ForgotPasswordName,
  HomeName,
  LoginName,
  RegisterName,
  FilterName,
  ResultSearchName,
  ReportLostPointName,
  // MapName,
  FacultiesName,
  DetailNodeName
} from "./constants";
import ReportLostPoint from "./screens/ReportLostPoint";
import Comment from "./screens/Comment";
import EditProfile from "./screens/EditProfile";
import ProfileChangePassword from "./screens/ProfileChangePassword";
import Faculties from "./screens/Faculties";

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name={HomeName} component={Home} />
          <Drawer.Screen name={FacultiesName} component={Faculties} />
          <Drawer.Screen name={LoginName} component={LoginForm} />
          <Drawer.Screen name={RegisterName} component={Register} />
          <Drawer.Screen name={AboutName} component={About} />
          <Drawer.Screen name={EventsName} component={Events} />
          {/* <Drawer.Screen name={FavoritesName} component={Favorites} /> */}
          <Drawer.Screen
            name={FilterName}
            component={Filter}
          // options={{
          //   drawerLabel: () => null, // Oculta el texto del enlace en el Drawer
          //   drawerItemStyle: { display: "none" }, // Oculta completamente la opción del Drawer
          // }}
          />
          <Drawer.Screen name={EditProfileName} component={EditProfile} />
          <Drawer.Screen
            name={ChangePasswordName}
            component={ProfileChangePassword}
          />
          <Drawer.Screen
            name={ForgotPasswordName}
            component={ForgotPasswordForm}
          />
          <Drawer.Screen
            name={ResultSearchName}
            component={ResultSearch}
            options={{
              drawerLabel: () => null, // Oculta el texto del enlace en el Drawer
              drawerItemStyle: { display: "none" }, // Oculta completamente la opción del Drawer
            }}
          />
          <Drawer.Screen
            name={DetailNodeName}
            component={DetailNodeScreen}
            options={{
              drawerLabel: () => null, // Oculta el texto del enlace en el Drawer
              drawerItemStyle: { display: "none" }, // Oculta completamente la opción del Drawer
            }}
          />
          {/* <Drawer.Screen
            name={MapName}
            component={MapApi}
          // options={{
          //   drawerLabel: () => null, // Oculta el texto del enlace en el Drawer
          //   drawerItemStyle: { display: "none" }, // Oculta completamente la opción del Drawer
          // }}
          /> */}
          <Drawer.Screen
            name={ReportLostPointName}
            component={ReportLostPoint}
          />
          <Drawer.Screen name={CommentName} component={Comment} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Main;
