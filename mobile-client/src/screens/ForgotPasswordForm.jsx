import {
  Button,
  Center,
  Heading,
  Input,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Platform } from "react-native";
import axios from "axios";
import Toast from 'react-native-toast-message';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const recoveryPassword = async () => {
    if(!email){
      Toast.show({
        type: 'error',
        text1: "Ingresa tu correo",
        position: 'bottom',
      });
      return;
    }

    setIsSending(true);
      
    try{
      const response = await axios.post("http://192.168.0.102:3000/auth/forgot-password", {
        email
      });

      if(response.status == 200){
        Toast.show({
          type: 'success',
          text1: "Correo enviado!",
          text2: "Recuerda revisar Spam",
          position: 'bottom',
        });
        setEmail("");
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
          <Heading mt="3" mb="3">Olvidé mi contraseña</Heading>
          <Text color="muted.400">
            No te preocupes! Ingresa el email asociado a tu cuenta y te
            enviaremos un link para resetear tu contraseña.
          </Text>
          <Input placeholder="Email Address" mt="5" mb="4"  onChangeText={setEmail} value={email}/>
          <Button backgroundColor={isSending ? "indigo.400" : "indigo.500"} mb="4" mt="4" onPress={recoveryPassword} disabled={isSending}>
            Enviar
          </Button>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
}
