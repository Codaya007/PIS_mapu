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
  Checkbox,
} from "native-base";
import { useNavigate } from "react-router-native";
import React, { useState } from "react";
import axios from "axios";
import Toast from 'react-native-toast-message';

const Register = () => {
  const navigate = useNavigate();
  const [name , setName] = useState("");
  const [lastname , setLastName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    if(!name | !lastname | !email | !password | !passwordAgain){
      Toast.show({
        type: 'error',
        text1: "Campos incompletos",
        position: 'bottom',
      });
      return;
    }

    if(password.length <= 8){
      Toast.show({
        type: 'error',
        text1: "Contraseña muy corta",
        position: 'bottom',
      });
      return;
    }

    if(password != passwordAgain){
      Toast.show({
        type: 'error',
        text1: "Las contraseñas no coinciden",
        position: 'bottom',
      });
      return;
    }
  
    if(!termsAccepted){
      Toast.show({
        type: 'error',
        text1: "Acepte los términos y condiciones",
        text2: "para continuar",
        position: 'bottom',
      });
      return;
    }

    try{
      const response = await axios.post("http://localhost:3000/auth/register", {
        name,
        lastname,
        email,
        password,
      });

      if(response.status == 200){
        Toast.show({
          type: 'success',
          text1: "Registro exitoso",
          position: 'bottom',
        });
        navigate("/login");
      }
    }catch (error){
      console.log("error", error);
      Toast.show({
        type: 'error',
        text1: "Error al registrar",
        text2: "intentelo nuevamente más tarde",
        position: 'bottom',
      });
    }
  };

  const handleTermsAcceptance = (value) => {
    setTermsAccepted(value);
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
            Bienvenido
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
              <Input onChangeText={setName} value={name}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>Apellido</FormControl.Label>
              <Input onChangeText={setLastName} value={lastname}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input onChangeText={setEmail} value={email}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input type="password" onChangeText={setPassword} value={password}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirmar contraseña</FormControl.Label>
              <Input type="password" onChangeText={setPasswordAgain} value={passwordAgain}/>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={handleRegister}>
              Registrarse
            </Button>
            <Box display={"flex"} justifyContent={"center"}>
              <Checkbox
                //isInvalid
                value="acept"
                colorScheme="indigo"
                onChange={handleTermsAcceptance}
              >
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Acepto los Términos y condiciones
                </Text>
              </Checkbox>
            </Box>
          </VStack>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Ya tengo una cuenta{" "}
            </Text>
            <LinkStyle
              onPress={() => navigate("/login")}
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              // href="/login"
            >
              Iniciar sesión
            </LinkStyle>
          </HStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default Register;
