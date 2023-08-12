import React, { useEffect } from "react";
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
  DetailNodeName,
  ProfileName
} from "./constants";
import ReportLostPoint from "./screens/ReportLostPoint";
import Comment from "./screens/Comment";
import EditProfile from "./screens/EditProfile";
import ProfileChangePassword from "./screens/ProfileChangePassword";
import Faculties from "./screens/Faculties";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const Main = () => {
  const { user } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const authSavedUser = async () => {
      const userLS = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      dispatch(login({ user: JSON.parse(userLS), token: JSON.parse(token) }));
    }

    authSavedUser()

  }, [dispatch]);

  return (
    user ?
      <AuthUserMenu /> :
      <MainUserMenu />
  );
};

const AuthUserMenu = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" >
          <Drawer.Screen name={HomeName} component={Home} />
          <Drawer.Screen
            name={ProfileName}
            component={EditProfile}
          />
          <Drawer.Screen name={FacultiesName} component={Faculties} />
          <Drawer.Screen name={EventsName} component={Events} />
          <Drawer.Screen
            name={FilterName}
            component={Filter}
            options={{
              drawerItemStyle: { display: "none" }
            }}
          />
          <Drawer.Screen
            name={EditProfileName}
            component={EditProfile}
            options={{
              drawerItemStyle: { display: "none" }
            }}
          />
          <Drawer.Screen
            name={ChangePasswordName}
            component={ProfileChangePassword}
            options={{
              drawerItemStyle: { display: "none" }
            }}
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
          <Drawer.Screen
            name={ReportLostPointName}
            component={ReportLostPoint}
          />
          <Drawer.Screen
            name={CommentName}
            component={Comment}
            options={{
              drawerLabel: () => null, // Oculta el texto del enlace en el Drawer
              drawerItemStyle: { display: "none" }, // Oculta completamente la opción del Drawer
            }}
          />
          <Drawer.Screen name={AboutName} component={About} />
          {/*  LOGOUT ACTION */}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const MainUserMenu = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
        // screenOptions={{ drawerType: dimensions.width >= 768 ? 'permanent' : 'front', }}
        >
          <Drawer.Screen
            name={HomeName}
            component={Home}
            screenOptions={{
              drawerItemStyle: { borderBottomWidth: 1, borderBottomColor: 'gray' }
            }}
          />
          {/* ================ Autenticación ======================== */}
          <Drawer.Group>
            <Drawer.Screen name={LoginName} component={LoginForm} />
            <Drawer.Screen
              name={ForgotPasswordName}
              component={ForgotPasswordForm}
              options={{
                drawerItemStyle: { display: "none" }
              }}
            />
            <Drawer.Screen name={RegisterName} component={Register} />
          </Drawer.Group>
          {/* ========================================================= */}
          <Drawer.Screen name={FacultiesName} component={Faculties} />
          <Drawer.Screen name={EventsName} component={Events} />
          <Drawer.Screen
            name={FilterName}
            component={Filter}
            options={{
              drawerLabel: () => null,
              drawerItemStyle: { display: "none" },
            }}
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
          <Drawer.Screen name={AboutName} component={About} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Main;
