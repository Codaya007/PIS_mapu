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
  ScrollView,
  Avatar,
  View,
  Image,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { ChangePasswordName } from "../constants";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, uploadImage } from "../store/actions/authActions";
import { Platform, TouchableOpacity } from "react-native";
// import { ImagePicker } from "expo-permissions";
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
  const { user } = useSelector((state) => state.authReducer);
  const [userForm, setUserForm] = useState(initialState);

  const navigate = (to) => navigation.navigate(to);

  const handleEdit = (text, input) => {
    if (input == "spam" || input == "notification") {
      console.log(text);
      console.log(typeof text);
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

  const handeImage = async () => {
    console.log("sds");
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

        // axios.post('https://example-api.com/upload', file);

        // console.log('Archivo convertido:', file);
      } else {
        console.log("Selección de imagen cancelada");
      }
      // if (resultImagePicker.canceled === false) {
      //   console.log(resultImagePicker.assets[0].uri);
      //   const imageUri = resultImagePicker.assets[0].uri;
      //   dispatch(uploadImage(imageUri));

      // }
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
    console.log(userForm.settings.spam);
  }, []);
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
              <Heading
                size="lg"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                fontWeight="semibold"
              >
                Cambiar Datos
              </Heading>
              <Heading
                mt="1"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="medium"
                size="xs"
              >
                Registrate para continuar!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <Avatar
                    bg="green.500"
                    alignSelf="center"
                    size="2xl"
                    source={{
                      uri: `${userForm.avatar}`,
                    }}
                  >
                    AJ
                  </Avatar>
                  <Button size="sm" variant="link" onPress={handeImage}>
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
                <FormControl>
                  <FormControl.Label>Avatar</FormControl.Label>
                  <View>
                    {user.avatar ? (
                      <Image source={{ uri: user.avatar }} />
                    ) : (
                      <TouchableOpacity onPress={selectImage}>
                        <View style={styles.placeholder}>
                          {/* Icono o texto opcional para el botón de carga */}
                          {/* <Image
                          source= 'Hola'
                        /> */}
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                  {/* <Input
                    onChangeText={ (text) => handleEdit(text, "avatar")}
                    value={userForm.avatar}
                  /> */}
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
