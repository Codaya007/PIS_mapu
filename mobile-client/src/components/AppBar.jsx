// import React from "react";
// import { StyleSheet } from "react-native";
// import { Box, HStack, StatusBar, Text } from "native-base";
// import Constants from "expo-constants";
// import theme from "../theme";
// import { Link, useLocation } from "react-router-native";

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: theme.appBar.primary,
//     paddingTop: Constants.statusBarHeight + 10,
//     flexDirection: "row",
//   },
//   scroll: {
//     paddingBottom: 15,
//   },
//   text: {
//     color: theme.appBar.textSecondary,
//     paddingHorizontal: 10,
//   },
//   active: {
//     color: theme.appBar.textPrimary,
//   },
// });

// const AppBarTab = ({ to, children }) => {
//   const { pathname } = useLocation();

//   const active = pathname === to;
//   const textStyles = [styles.text, active && styles.active];
//   return (
//     <Link to={to}>
//       <Text fontWeight="bold" style={textStyles}>
//         {children}
//       </Text>
//     </Link>
//   );
// };

// const AppBar = (props) => {
//   return (
//     <>
//       <StatusBar bg="indigo.500" barStyle="light-content" />
//       <Box safeAreaTop bg="indigo.500" />
//       <HStack
//         bg="indigo.600"
//         px="1"
//         py="3"
//         justifyContent="space-between"
//         alignItems="center"
//         w="100%"
//         // maxW="350"
//       >
//         <AppBarTab to={"/"}>Mapa</AppBarTab>
//         <AppBarTab to={"/login"}>Iniciar sesión</AppBarTab>
//         <AppBarTab to={"/sign-up"}>Registrarse</AppBarTab>
//         <AppBarTab to={"/events"}>Eventos</AppBarTab>
//         <AppBarTab to={"/favorites"}>Favoritos</AppBarTab>
//         <AppBarTab to={"/forgot-password"}>Olvidé contraseña</AppBarTab>
//         <AppBarTab to={"/reset-password"}>Recuperar contraseña</AppBarTab>
//         <AppBarTab to={"/about"}>Acerca</AppBarTab>
//       </HStack>
//     </>
//   );
// };

// export default AppBar;
