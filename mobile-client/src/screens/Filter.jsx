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
  Select,
  useColorModeValue,
  ScrollView,
} from "native-base";

//----------
import { Alert } from "native-base";
import { IconButton } from "native-base";
import React from "react";
import { CloseIcon } from "native-base";
//----------

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { ForgotPasswordName, HomeName, NomenclatureInfoName } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Filter = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [Block, setBlock] = React.useState("");
  const [Campus, setCampus] = React.useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigate = (to) => navigation.navigate(to);

  useEffect(() => {
    if (user) {
      navigation.navigate(HomeName);
    }
  }, [user]);

  const handleClickInformationNomenclature = () => {
    navigate(NomenclatureInfoName);
  };

  // const [showAlert, setShowAlert] = useState(false);

  // const handleShowAlert = () => {
  //     setShowAlert(true);
  // };

  // const handleCloseAlert = () => {
  //     setShowAlert(false);
  // };

  const start = 1;
  const end = 100;
  const bloques = [...Array(end - start + 1).keys()].map(
    (_, index) => start + index
  );

  const pressedColor = useColorModeValue("#EAEAEA");

  return (
    <ScrollView w="100%">
      <Center w="100%" justifyContent="flex-end" paddingBottom={15}>
        <Alert shadow={2} maxW="400" w="100%" colorScheme="info">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon onPress={handleClickInformationNomenclature}/>
                <Heading fontSize="md" fontWeight="medium" color="coolGray.800">
                  Nomenclatura
                </Heading>
              </HStack>
            </HStack>
            <Box
              pl="6"
              _text={{
                color: "coolGray.600",
              }}
            >
              Ejemplo: A421
            </Box>
            <Box
              pl="6"
              _text={{
                color: "coolGray.600",
              }}
            >
              Campus = A, Bloque = 4, Piso = 2, Aula 1
            </Box>
          </VStack>
        </Alert>
        <Box safeArea w="85%">
          <Heading size="lg">Búsqueda por nomenclatura</Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>
                Campus <Text style={{ color: "red" }}>*</Text>
              </FormControl.Label>
              <Select
                selectedValue={Campus}
                minWidth="200"
                accessibilityLabel="Elige el campus"
                placeholder="Elige el campus"
                _selectedItem={{
                  bg: pressedColor,
                }}
                mt={1}
                onValueChange={(itemValue) => setCampus(itemValue)}
              >
                <Select.Item label="A - Argelia" value="Argelia" />
                <Select.Item label="M - Motupe" value="Motupe" />
              </Select>
            </FormControl>

            <FormControl>
              <FormControl.Label>
                Bloque <Text style={{ color: "red" }}>*</Text>
              </FormControl.Label>
              <Select
                selectedValue={Block}
                minWidth="200"
                accessibilityLabel="Elige el bloque"
                placeholder="Elige el bloque"
                _selectedItem={{
                  bg: pressedColor,
                }}
                mt={1}
                onValueChange={(itemValue) => setBlock(itemValue)}
              >
                {/* <Select.Item label={bloques} value="Argelia" /> */}
                {bloques.map((bloque) => (
                  <Select.Item
                    key={bloque}
                    label={bloque.toString()}
                    value={bloque}
                  />
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label>Piso</FormControl.Label>
              <Input type="text" placeholder="2" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Aula</FormControl.Label>
              <Input type="number" placeholder="1" />
            </FormControl>
            <Text alignSelf="flex-end" mt="1" fontSize={"xs"}>
              <Text style={{ color: "red" }}>* </Text>
              Campos obligatorios
            </Text>
            <Button mt="2" colorScheme="indigo">
              Buscar
            </Button>
            <Button
              mt="0"
              colorScheme="coolGray"
              onPress={() => navigate(HomeName)}
            >
              Regresar
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default Filter;
