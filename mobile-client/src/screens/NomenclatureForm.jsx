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
  ScrollView,
  Spinner,
  Image,
} from "native-base";
import { Alert } from "native-base";
import { useDispatch, } from "react-redux";
import { DEFAULT_IMAGE, HomeName, NomenclatureInfoName } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { getNodeByNomenclature } from "../services/Nodes";
import { setCurrentNode, setSearchText } from "../store/slices/searchSlice";

const initialForm = {
  campus: "",
  block: "",
  floor: "",
  environment: ""
}

const NodeDetails = ({ message, node }) => {
  const { _id, name = "Bloque sin nombre", img = "" } = node || {};
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log({ node })

  const handlePress = () => {
    dispatch(setCurrentNode(node || null));
    dispatch(setSearchText(name || ""));

    navigation.navigate(HomeName);
  }

  return <Box bgColor={"gray.200"} m={5} p={4} width={"75%"} borderRadius={10}>
    <Image marginY={2} marginX={"auto"} width={"90%"} height={"40"} borderRadius={6} resizeMode="cover" source={{ uri: img || DEFAULT_IMAGE }} alt={name} />
    <Text>{message}</Text>
    <Button onPress={handlePress} variant={"outline"} m={2}>Ver bloque en el mapa</Button>
  </Box>
}

const NomenclatureForm = ({ }) => {
  const [form, setForm] = useState(initialForm);
  const [nomenclatureResult, setNomenclatureResult] = useState(null);
  const [loadingNomenclature, setLoadingNomenclature] = useState(false);
  const navigation = useNavigation();

  const navigate = (to) => navigation.navigate(to);

  const handleClickInformationNomenclature = () => {
    navigate(NomenclatureInfoName);
  };

  const onInputChange = (value, field) => {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Valido campos requeridos
      if (!form.campus || !form.block) {
        return Toast.show({
          type: "error",
          text1: "Datos faltantes",
          text2: "El campus y bloque son requeridos",
          position: "bottom"
        })
      }

      setNomenclatureResult(null);
      setLoadingNomenclature(true);

      const result = await getNodeByNomenclature(form);
      console.log({ result });
      setNomenclatureResult(result);

    } catch (error) {
      console.log({ error });
      setNomenclatureResult(null);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "No se pudo encontrar el lugar",
        position: "bottom"
      })
    } finally {
      setLoadingNomenclature(false);
    }
  }

  return (
    <ScrollView w="100%" flex={1}>
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
                <Alert.Icon onPress={handleClickInformationNomenclature} />
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
              Campus = A, Bloque = 4, Piso = 2, Aula = 1
            </Box>
          </VStack>
        </Alert>
        <Box safeArea w="85%">
          <Heading size="lg">Búsqueda por nomenclatura</Heading>
          <VStack space={3} mt="5">
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
              {/* Campus */}
              <FormControl width={"25%"}>
                <FormControl.Label>
                  Campus <Text style={{ color: "red" }}>*</Text>
                </FormControl.Label>
                <Input
                  autoCapitalize="characters"
                  onChangeText={campus => onInputChange(campus?.toUpperCase(), "campus")}
                  type="text"
                  placeholder="A"
                  value={form.campus}
                  maxLength={1}
                />
              </FormControl>

              {/* Bloque */}
              <FormControl width={"25%"}>
                <FormControl.Label>
                  Bloque <Text style={{ color: "red" }}>*</Text>
                </FormControl.Label>
                <Input onChangeText={block => onInputChange(block, "block")} type="text" placeholder="4" keyboardType="numeric" value={form.block} />
              </FormControl>

              {/* Piso */}
              <FormControl width={"25%"}>
                <FormControl.Label>Piso</FormControl.Label>
                <Input onChangeText={floor => onInputChange(floor, "floor")} type="text" placeholder="2" keyboardType="numeric" value={form.floor} />
              </FormControl>

              {/* Ambiente */}
              <FormControl width={"25%"}>
                <FormControl.Label>Aula</FormControl.Label>
                <Input onChangeText={env => onInputChange(env, "environment")} type="text" placeholder="1" value={form.environment} keyboardType="numeric" />
              </FormControl>
            </Box>

            <Text alignSelf="flex-end" mt="1" fontSize={"xs"}>
              <Text style={{ color: "red" }}>* </Text>
              Campos obligatorios
            </Text>
            <Button mt="2" onPress={handleSubmit}>
              {loadingNomenclature ? <Spinner color={"white"} /> : "Buscar"}
            </Button>
          </VStack>
        </Box>
        {!loadingNomenclature && nomenclatureResult &&
          <NodeDetails message={nomenclatureResult?.message} node={nomenclatureResult?.node} />}
      </Center>
    </ScrollView>
  );
};

export default NomenclatureForm;
