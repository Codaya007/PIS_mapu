import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Image,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { HomeName } from "../constants";
import { useSelector } from "react-redux";
import { createReport } from "../services/report";
import { StyleSheet } from "react-native";

const reportState = {
  node: '',
  comment: '',
};

const ReportOutdatedInformation = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const { node } = route.params
  const { user } = useSelector((state) => state.authReducer);
  const [report, setReport] = useState(reportState);

  useEffect(() => {
    setReport({
      ...report,
      node: node._id,
    });

  }, []);

  const handleEditReport = async (text, input) => {
    setReport({
      ...report,
      [input]: text,
    })
  };

  const handleSave = async () => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Debe iniciar sesión",
        position: "bottom",
      });
      return;
    }

    if (!report.node) {
      Toast.show({
        type: "error",
        text1: "La longitud y latitud son obligatorios",
        position: "bottom",
      });
      return;
    }

    try {
      await createReport(report);

      Toast.show({
        type: "success",
        text1: "Reporte enviado. Gracias por su información",
        position: "bottom",
      });
      navigate.navigate(HomeName);

    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "No se pudo enviar el reporte",
        text2: "Inténtelo nuevamente",
        position: "bottom",
      });
    }
  };

  return (
    <ScrollView>
      <Center w="100%" padding={3}>
        <Box safeArea w="95%">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Reporte de información faltante
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Descripción</FormControl.Label>
              <Text>{node.detail?.title || "No hay descripción "}</Text>
            </FormControl>
            {node?.detail?.img &&
              <Box overflow={"hidden"} borderTopRadius={"27"} style={styles.image}>
                <Image
                  height={"100%"}
                  width={"100%"}
                  resizeMode="cover"
                  source={{ uri: node?.detail?.img }}
                  alt={node.name || node?.detail?.title}
                />
              </Box>}
            <FormControl>
              <FormControl.Label>Coordenadas</FormControl.Label>
              <Text>[{node.latitude}, {node.longitude}] </Text>
            </FormControl>
            {/* <FormControl>
                <FormControl.Label>Longitud:  {node.longitude}</FormControl.Label>
              </FormControl> */}
            <FormControl>
              <FormControl.Label>Indique qué información está desactualizada o incompleta</FormControl.Label>
              <TextArea
                onChangeText={(text) => handleEditReport(text, "comment")}
                value={report.comment}
              />
            </FormControl>

            <Button mt="2" bgColor={"indigo.500"} onPress={handleSave}>
              Enviar
            </Button>
            <Button
              mt="2"
              colorScheme="orange"
              onPress={() => navigate.goBack()}
            >
              Cancelar
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "27%",
    margin: 0,
    padding: 0,
    alignSelf: "center",
  },
})


export default ReportOutdatedInformation;
