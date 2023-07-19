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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  EMAIL_REGEX,
  ForgotPasswordName,
  HomeName,
  RegisterName,
} from "../constants";
import { loginUser } from "../store/actions/authActions";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigation = useNavigation();

  const navigate = (to) => navigation.navigate(to);

  const validateForm = () => {
    const errors = {};

    if (!email) errors.email = "El campo email es requerido";
    else if (!EMAIL_REGEX.test(email)) errors.email = "Ingrese un email válido";
    if (!password) errors.password = "El campo password es requerido";

    setErrors(errors);

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación
    // utilizando los valores de email y password
    const errors = validateForm();

    if (!errors.email && !errors.password) {
      dispatch(loginUser(email, password));
    }
  };

  useEffect(() => {
    if (user) {
      navigation.navigate(HomeName);
    }
  }, [user]);

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
            <Input
              type="email"
              placeholder="john.doe@email.com"
              onChangeText={(newEmail) => setEmail(newEmail)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              type="password"
              placeholder="****"
              onChangeText={(newPassword) => setPassword(newPassword)}
            />
            <LinkStyle
              // onPress={() => navigation.navigate("/forgot-password")}
              onPress={() => navigate(ForgotPasswordName)}
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
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
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
              onPress={() => navigate(RegisterName)}
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
