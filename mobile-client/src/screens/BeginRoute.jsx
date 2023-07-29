import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Text,
  Icon,
  VStack,
  Alert,
  KeyboardAvoidingView,
  Select,
  useColorModeValue,
  ScrollView,
  Link as LinkStyle,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import Login from "./Login";
import { API_BASEURL, LoginName } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";

const Register = () => {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState("");
  const [destiny, setDestiny] = useState("");
  const [isGpsFixed, setIsGpsFixed] = useState(false);

  const handleGpsToggle = () => {
    setIsGpsFixed((prevIsGpsFixed) => !prevIsGpsFixed); // Cambiar el estado al presionar el botón
  };

  const handleRegister = async () => {
    if (!origin || !destiny) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos",
        position: "bottom",
      });
      return;
    }



    try {
      const response = await axios.post(`${API_BASEURL}/auth/register`, {
        name: origin,
        lastname: destiny,
        email,
        password,
      });

      if (response.status == 200) {
        Toast.show({
          type: "success",
          text1: "Registro exitoso",
          position: "bottom",
        });
        navigate(LoginName);
      }
    } catch (error) {
      console.log("error", error);
      Toast.show({
        type: "error",
        text1: "Error al registrar",
        text2: "intentelo nuevamente más tarde",
        position: "bottom",
      });
    }
  };

  const pressedColor = useColorModeValue("#EAEAEA");
  const navigate = (to) => navigation.navigate(to);

  return (
    <ScrollView w="100%" h="100%">
      <KeyboardAvoidingView
        h={{
          base: "800px",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center w="100%">
          <Alert shadow={2} maxW="400" w="100%" mt="2" colorScheme="info">
            <VStack space={1} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon />
                  <Heading fontSize="md" fontWeight="medium" color="coolGray.800">
                    Origen
                  </Heading>
                </HStack>
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: "coolGray.600",
                }}
              >
                Puedes elegir tu origen o habilitar el GPS para que nosotros lo hagamos por tí.
              </Box>
            </VStack>
          </Alert>
          <Box safeArea p="2" w="90%" maxW="290" py="1">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Comenzar ruta
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
              Elige tu origen y destino
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Origen</FormControl.Label>
                <HStack w="100%" >
                  <Select
                    selectedValue={origin}
                    minWidth="85%"
                    accessibilityLabel="Elige tu origen"
                    placeholder="Origen..."
                    _selectedItem={{
                      bg: pressedColor,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setOrigin(itemValue)}
                  >
                    <Select.Item label="A - Argelia" value="Argelia" />
                    <Select.Item label="M - Motupe" value="Motupe" />
                  </Select>
                  <Button
                    bg="indigo.500"
                    // onPress={handleSearch}
                    onPress={handleGpsToggle}
                    _pressed={{ bg: "indigo.600" }}
                    _text={{ color: "white" }}
                    py={1}
                    px={2}
                    left={1}
                  >
                    <Icon
                      as={<MaterialIcons name={isGpsFixed ? "gps-fixed" : "gps-not-fixed"} />} // Cambiar el icono en función del estado
                      // as={<MaterialIcons name="gps-fixed" />}
                      size={6}
                      color="white"
                    />
                  </Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormControl.Label>Destino</FormControl.Label>
                <Input onChangeText={setDestiny} value={destiny} />
              </FormControl>

              <Button mt="2" colorScheme="indigo" onPress={handleRegister}>
                Comenzar
              </Button>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </ScrollView >
  );
};

export default Register;
