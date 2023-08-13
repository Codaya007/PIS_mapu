import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Image,
  Input,
  KeyboardAvoidingView,
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

  useEffect( ()=> {
    setReport( {
      ...report,
      node: node._id,
    });

  },[]);
  
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
        text1: "Debe iniciar sesion para brindar",
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
      console.log(report)
      await createReport(report);

      Toast.show({
        type: "success",
        text1: "Reporte enviado",
        position: "bottom",
      });
      navigate.navigate(HomeName);

    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al crear el punto perdido",
        text2: "Intentelo nuevamente",
        position: "bottom",
      });
    }
  };

  return (
    <ScrollView w={["360", "300"]} h="30">
      <KeyboardAvoidingView
        h={{
          base: "900px",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
              Detalle informacion faltante
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Descripción:  {node.detail?.title || "No hay descripción "}</FormControl.Label>
              </FormControl>
              <Box overflow={"hidden"} borderTopRadius={"27"} style={styles.image}>
          <Image
            height={"100%"}
            width={"100%"}
            resizeMode="cover"
            source={{ uri: node?.detail?.img }}
            alt={node?.detail?.img }
          />
        </Box>
              <FormControl>
                <FormControl.Label>Latitud:  {node.latitude} </FormControl.Label>
              </FormControl>
              <FormControl>
                <FormControl.Label>Longitud:  {node.longitude}</FormControl.Label>
              </FormControl>
              <FormControl>
                <FormControl.Label>Comentario</FormControl.Label>
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
                  onPress={ () => navigate.goBack() }
                >
                  Cancelar
                </Button>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
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
