import { View } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import { Route, Routes } from "react-router-native";
import Home from "./Home";
import LoginForm from "./Login";
import Register from "./Register";
import About from "./About";
import Events from "./Events";
import Favorites from "./Favorites";
import EditProfile from "./EditProfile";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ProfileChangePassword from "./ProfileChangePassword";

const Main = () => {
  return (
    // Aquí el flex: 1 me ayuda a que pueda hacer el scroll hasta abajo
    <View style={{ flex: 1 }}>
      <AppBar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/login" Component={LoginForm} />
        <Route path="/sign-up" Component={Register} />
        <Route path="/about" Component={About} />
        <Route path="/events" Component={Events} />
        <Route path="/favorites" Component={Favorites} />
        <Route path="/forgot-password" Component={ForgotPasswordForm} />
        <Route path="/reset-password/:token" Component={ForgotPasswordForm} />
        <Route path="/editProfile" Component={EditProfile} />
        <Route path="/changePassword" Component={ProfileChangePassword} />
        <Route path="/*" Component={Home} />
      </Routes>
    </View>
  );
};

export default Main;
