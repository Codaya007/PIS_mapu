import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  KeyboardAvoidingView,
} from "native-base";
import React, { useState } from "react";
import Toast from "react-native-toast-message";

const initialState = {
  newPassword: "",
  newPasswordInput: "",
};

const ProfileChangePassword = () => {
  const [userPassword, setUserPassword] = useState(initialState);
  const handleEdit = async (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };

  const saveChange = async () => {
    console.log("SaveChanges");
    try {
      await putProfile(userPassword);
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
              <FormControl.Label>Nueva contraseña</FormControl.Label>
              <Input name="newPassword" onChangeText={handleEdit} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Reescribe la contraseña</FormControl.Label>
              <Input name="newPasswordInput" onChangeText={handleEdit} />
            </FormControl>

            <Button mt="2" bgColor="indigo.500" onPress={saveChange}>
              Guardar
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default ProfileChangePassword;
