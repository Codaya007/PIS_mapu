import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  KeyboardAvoidingView,
  Link as LinkStyle,
  Switch,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { EditProfileName } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateUserPassword } from "../store/actions/authActions";

const initialState = {
  password: "",
  passwordReWritten: ""
};

const ProfileChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userPassword, setUserPassword] = useState(initialState);
  const navigate = (to) => navigation.navigate(to);
  const handleEdit = (text, input) => {
    setUserPassword({ ...userPassword, [input]: text });
  };

  const saveChange = async (e) => {
    e.preventDefault();
    if (userPassword.password == "" | userPassword.passwordReWritten == "") {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        position: "bottom",
      });
      return;
    }
    if (userPassword.password != userPassword.passwordReWritten) {
      Toast.show({
        type: "error",
        text1: "Las contraseñas no coinciden",
        position: "bottom",
      });
      return;
    }
    if (userPassword.password.length <= 8) {
      Toast.show({
        type: "error",
        text1: "Contraseña muy corta",
        position: "bottom",
      });
      return;
    }
    try {
      dispatch(updateUserPassword(userPassword.password));
      Toast.show({
        type: "success",
        text1: "Cambio exitoso",
        position: "bottom",
      });

    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No se pudo guardar",
        position: "bottom",
      });
    }
  };


  return (
    <KeyboardAvoidingView
      h={{
        base: "800px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Cambiar Contraseña
          </Heading>
          <VStack space={3} mt="5">

            <FormControl>
              <FormControl.Label>Nueva contraseña </FormControl.Label>
              <Input type="password"
                placeholder="*******"
                onChangeText={(text) => handleEdit(text, "password")} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Reescribe la contraseña</FormControl.Label>
              <Input type="password"
                placeholder="********"
                onChangeText={(text) => handleEdit(text, "passwordReWritten")} />
            </FormControl>

            <Button mt="2" colorScheme="indigo" onPress={saveChange}>
              Guardar
            </Button>
            {/* <Button mt="2" colorScheme="orange" onPress={() => navigate(EditProfileName)}>
              Regresar
            </Button> */}
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default ProfileChangePassword;