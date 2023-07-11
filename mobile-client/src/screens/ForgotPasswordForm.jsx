import {
  Button,
  Center,
  Heading,
  Input,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "native-base";
import { Platform } from "react-native";

export default function ForgotPasswordForm() {
  return (
    <KeyboardAvoidingView
      h={{
        base: "400px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center>
        <VStack flex="1" justifyContent="flex-end" w="100%" maxW="300">
          <Heading mb="3">Olvidé mi contraseña</Heading>
          <Text color="muted.400">
            No te preocupes! Ingresa tu email asociado a tu cuenta y te
            enviaremos un link para resetear tu contraseña.
          </Text>
          <Input placeholder="Email Address" mt="10" mb="4" />
          <Button backgroundColor={"indigo.500"} mb="4">
            Continuar
          </Button>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
}
