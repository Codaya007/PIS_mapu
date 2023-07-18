import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link as LinkStyle,
  Text,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Register from "./Register";

const Login = () => {
  // const navigate = useNavigate();
  const navigation  = useNavigation();

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Bienvenido
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Inicia sesión para continuar!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input type="password" />
            <LinkStyle
              // onPress={() => navigation.navigate("/forgot-password")}
              onPress={() => navigation.navigate(ForgotPasswordForm)}
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Olvidaste tu cotraseña?
            </LinkStyle>
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Continuar
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Soy un usuario nuevo{" "}
            </Text>
            <LinkStyle
              onPress={() => navigation.navigate(Register)}
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              // href="/login"
            >
              Registrarse
            </LinkStyle>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
