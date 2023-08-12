import React, { useState } from "react";
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
import { Alert } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ForgotPasswordName, HomeName, NomenclatureInfoName } from "../constants";
import { useEffect } from "react";
import { HomeName } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { getCampus } from "../services/campus";
import { getAllCampuses } from "../store/slices/campusSlice";
import Toast from "react-native-toast-message";
import { getBlocks } from "../services/block";
import { getAllBlocks } from "../store/slices/blockSlice";

const initialForm = {
  campus: "",
  block: "",
  floor: "",
  environment: ""
}

const Filter = () => {
  const [form, setForm] = useState(initialForm);
  const { campuses } = useSelector(state => state.campusReducer);
  const { blocks } = useSelector(state => state.blockReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigate = (to) => navigation.navigate(to);

  const fetchCampus = async () => {
    try {
      const data = await getCampus();

      dispatch(getAllCampuses(data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No se pudieron obtener los campus",
        position: "bottom"
      })
    }
  }

  const handleClickInformationNomenclature = () => {
    navigate(NomenclatureInfoName);
  };

  // const [showAlert, setShowAlert] = useState(false);
  const fetchBlocks = async () => {
    try {
      const data = await getBlocks(false);
      dispatch(getAllBlocks(data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No se pudieron obtener los bloques",
        position: "bottom"
      })
    }
  }

  useEffect(() => {
    if (!campuses) {
      fetchCampus();
    }
    if (!blocks) {
      fetchBlocks();
    }
  }, []);

  const pressedColor = useColorModeValue("#EAEAEA");

  const onInputChange = (value, field) => {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO implementar búsqueda por nomenclatura
    console.log({ form });
  }

  return (
    <ScrollView w="100%">
      <Center w="100%" justifyContent="flex-end" paddingBottom={15}>
        <Alert marginBottom={4} shadow={2} maxW="400" w="100%" colorScheme="info">
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
                selectedValue={form.campus}
                minWidth="200"
                accessibilityLabel="Elige el campus"
                placeholder="Elige el campus"
                _selectedItem={{
                  bg: pressedColor,
                }}
                mt={1}
                onValueChange={(itemValue) => onInputChange(itemValue, "campus")}
              >
                <Select.Item key={1} label="Seleccione un campus" value="" />
                {campuses &&
                  campuses.map(campus =>
                    <Select.Item key={campus._id} label={`${campus.symbol} - ${campus.name}`} value={campus._id} />
                  )
                }
              </Select>
            </FormControl>

            <FormControl>
              <FormControl.Label>
                Bloque <Text style={{ color: "red" }}>*</Text>
              </FormControl.Label>
              <Select
                selectedValue={form.block}
                minWidth="200"
                accessibilityLabel="Elige el bloque"
                placeholder="Elige el bloque"
                _selectedItem={{
                  bg: pressedColor,
                }}
                mt={1}
                onValueChange={(itemValue) => onInputChange(itemValue, "block")}
              >
                <Select.Item key={1} label="Seleccione un bloque" value="" />
                {blocks && blocks.map((bloque) => (
                  <Select.Item
                    key={bloque._id}
                    label={`Bloque ${bloque.number}`}
                    value={bloque._id}
                  />
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label>Piso</FormControl.Label>
              <Input onChangeText={floor => onInputChange(floor, "floor")} type="text" placeholder="2" keyboardType="numeric" value={form.floor} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Aula</FormControl.Label>
              <Input onChangeText={env => onInputChange(env, "environment")} type="text" placeholder="1" value={form.environment} keyboardType="numeric" />
            </FormControl>
            <Text alignSelf="flex-end" mt="1" fontSize={"xs"}>
              <Text style={{ color: "red" }}>* </Text>
              Campos obligatorios
            </Text>
            <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
              Buscar
            </Button>
            {/* <Button
              mt="0"
              colorScheme="coolGray"
              onPress={() => navigate(HomeName)}
            >
              Regresar
            </Button> */}
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default Filter;
