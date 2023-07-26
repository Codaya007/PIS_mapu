import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
  KeyboardAvoidingView,
  Switch,
  ScrollView,
} from "native-base";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { ChangePasswordName } from "../constants";

const initialState = {
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
  const navigate = useNavigation().navigate;
  const [userForm, setUserForm] = useState(initialState);

  const handleEdit = async (e) => {
    const { name, value } = e.target;

    if (name == "spam" || name == "notification") {
      setUserForm({
        ...userForm,
        settings: {
          ...userForm.settings,
          [name]: checked,
        },
      });
    } else {
      setUserForm({ ...userForm, [name]: value });
    }
  };

  const saveChange = async () => {
    console.log("SaveChanges");
    try {
      await putProfile(userForm);
      dispatch(fetchProfile());
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No se pudo guardar",
        position: "bottom",
      });
    }
  };

  return (
    <ScrollView w={["370", "100"]} h="10">
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
                <FormControl.Label>Nombre</FormControl.Label>
                <Input
                  name="name"
                  onChangeText={handleEdit}
                  value={userForm.name}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Apellido</FormControl.Label>
                <Input
                  name="lastname"
                  onChangeText={handleEdit}
                  value={userForm.lastname}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  name="email"
                  onChangeText={handleEdit}
                  value={userForm.email}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Avatar</FormControl.Label>
                <Input
                  name="avatar"
                  type="password"
                  onChangeText={handleEdit}
                  value={userForm.avatar}
                />
              </FormControl>
              <FormControl.Label>Notificaciones</FormControl.Label>
              <Switch size="md" />
              <FormControl.Label>Spam</FormControl.Label>
              <Switch size="md" />
              <Button mt="2" colorScheme="indigo" onPress={saveChange}>
                Guardar
              </Button>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => {
                  navigate(ChangePasswordName);
                }}
              >
                Cambiar Contraseña
              </Button>
            </VStack>
            <HStack mt="6" justifyContent="center"></HStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EditProfile;
