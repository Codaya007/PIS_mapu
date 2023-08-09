import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  VStack,
  KeyboardAvoidingView,
  // Link as LinkStyle,
  Switch,
  ScrollView,
  Avatar,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { ChangePasswordName } from "../constants";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, uploadImage } from "../store/actions/authActions";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const initialState = {
  _id: "",
  name: "",
  lastname: "",
  email: "",
  avatar: "",
  role: "",
  settings: {
    notification: false,
    spam: false,
  },
};

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user = {} } = useSelector((state) => state.authReducer);
  const [userForm, setUserForm] = useState(initialState);

  const navigate = (to) => navigation.navigate(to);

  const handleEdit = (text, input) => {
    if (input == "spam" || input == "notification") {
      setUserForm({
        ...userForm,
        settings: {
          ...userForm.settings,
          [input]: text,
        },
      });
    } else {
      setUserForm({ ...userForm, [input]: text });
    }
  };

  const handleImage = async () => {
    const resultPermitions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );

    if (resultPermitions) {
      console.log("Has aceptado");
      const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (resultImagePicker.canceled === false) {
        const response = await fetch(resultImagePicker.uri);
        const blob = await response.blob();

        // Si estás utilizando Expo, la URI debe comenzar con 'file://'
        // Si estás en Android, puedes eliminar el 'file://' del inicio de la URI
        const uriWithoutPrefix =
          Platform.OS === "android"
            ? resultImagePicker.uri.replace("file://", "")
            : resultImagePicker.assets[0].uri;
        console.log(uriWithoutPrefix);

        const file = new File([blob], uriWithoutPrefix, { type: "image/jpeg" });
        console.log(`FILEE ${file.type}`);
        // const imageUri = resultImagePicker.assets[0].uri;
        dispatch(uploadImage(file));

      } else {
        console.log("Selección de imagen cancelada");
      }
    }

    return true;
  };

  const saveChange = async (e) => {
    // e.preventDefault();
    if (
      !userForm.name ||
      !userForm.lastname ||
      !userForm.email ||
      !userForm.avatar
    ) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        position: "bottom",
      });
      return;
    }
    try {
      dispatch(updateUser(userForm));
      Toast.show({
        type: "success",
        text1: "Guardado  exitoso",
        position: "bottom",
      });
    } catch (error) {
      console.log(`Error ${error}`);
      Toast.show({
        type: "error",
        text1: "No se pudo guardar",
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setUserForm({
        ...userForm,
        _id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        settings: {
          ...userForm.settings,
          notification: user.settings.notification,
          spam: user.settings.spam,
        },
      });
    }
  }, [user]);

  return (
    <Box width={["370", "700"]} height="10" flex={1}>
      <ScrollView>
        <KeyboardAvoidingView
          h={{
            base: "850px",
            lg: "auto",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
              <VStack space={3} mt="5">
                <FormControl>
                  <Avatar
                    bg="green.500"
                    alignSelf="center"
                    size="2xl"
                    source={{
                      uri: userForm?.avatar,
                    }}
                  >
                    AJ
                  </Avatar>
                  <Button size="sm" variant="link" onPress={handleImage}>
                    Cambiar
                  </Button>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Nombre</FormControl.Label>
                  <Input
                    onChangeText={(text) => handleEdit(text, "name")}
                    value={userForm.name}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Apellido</FormControl.Label>
                  <Input
                    onChangeText={(text) => handleEdit(text, "lastname")}
                    value={userForm.lastname}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    onChangeText={(text) => handleEdit(text, "email")}
                    value={userForm.email}
                  />
                </FormControl>
                <FormControl.Label>Notificaciones</FormControl.Label>
                <Switch
                  size="md"
                  isChecked={userForm.settings.notification}
                  onValueChange={(boolean) =>
                    handleEdit(boolean, "notification")
                  }
                  value={userForm.settings.notification}
                />
                <FormControl.Label>Spam</FormControl.Label>
                <Switch
                  size="md"
                  isChecked={userForm.settings.spam}
                  onValueChange={(boolean) => handleEdit(boolean, "spam")}
                  value={userForm.settings.spam}
                />
                <Button mt="2" colorScheme="indigo" onPress={saveChange}>
                  Guardar
                </Button>
                <Button
                  mt="2"
                  colorScheme="orange"
                  onPress={() => navigate(ChangePasswordName)}
                >
                  Cambiar Contraseña
                </Button>
              </VStack>
              <HStack mt="6" justifyContent="center"></HStack>
            </Box>
          </Center>
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

export default EditProfile;
