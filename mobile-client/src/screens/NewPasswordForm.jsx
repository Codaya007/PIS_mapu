import {
  Button,
  Center,
  Heading,
  Input,
  KeyboardAvoidingView,
  FormControl,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Platform } from "react-native";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { useParams } from "react-router-native";
import { useNavigate } from "react-router-native";

export default function NewPasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const modifyPassword = async () => {
    if(!password | !passwordAgain){
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

    setIsSending(true);

    try{
      const rute = "http://192.168.0.102:3000/auth/recovery-password?token=" + token;
      const response = await axios.post(rute, {
        password
      });

      if(response.status == 200){
        Toast.show({
          type: 'success',
          text1: "Contraseña modificada",
          position: 'bottom',
        });
        setPassword("");
        setPasswordAgain("");
        navigate("/login");
      }
    }catch (error){
      console.log("error", error);
      Toast.show({
        type: 'error',
        text1: "Error",
        text2: "Intentalo nuevamente más tarde",
        position: 'bottom',
      });
    }
    setIsSending(false);
  }

  return (
    <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center>
        <VStack justifyContent="center" w="100%" maxW="300">
          <Heading mt="3" mb="3">Nueva contraseña</Heading>
          <Text color="muted.400" mb="4">
            Ingrese una nueva contraseña para su acceso.
          </Text>
          <FormControl>
            <FormControl.Label>Nueva contraseña</FormControl.Label>
            <Input type="password" onChangeText={setPassword} value={password}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirmar contraseña</FormControl.Label>
            <Input type="password" onChangeText={setPasswordAgain} value={passwordAgain}/>
          </FormControl>
          <Button backgroundColor={isSending ? "indigo.400" : "indigo.500"} mb="4" mt="4" onPress={modifyPassword} disabled={isSending}>
            Guardar
          </Button>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
}