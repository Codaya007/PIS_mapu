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
  Link as LinkStyle,
  Checkbox,
} from "native-base";
import { useNavigate } from "react-router-native";

const Register = () => {
  const navigate = useNavigate();

  return (
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
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Apellido</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirmar contraseña</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo">
            Registrarse
          </Button>
          <Box display={"flex"} justifyContent={"center"}>
            <Checkbox
              //isInvalid
              value="acept"
              colorScheme="indigo"
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
  );
};

export default Register;
