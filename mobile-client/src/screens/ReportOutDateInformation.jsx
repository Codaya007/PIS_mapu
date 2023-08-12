import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  TextArea,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { HomeName } from "../constants";
import { useSelector } from "react-redux";
import { createReport } from "../services/report";

const reportState = {
  node: '',
  // user: null,  
  comment: "",
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
      // user: user._id, //Cambiar por el user registrado
    });

  },[]);
  
  const handleEditReport = async (text, input) => {
    setReport({
      ...report,
      [input]: text,
    })
    
  };

  const handleSave = async () => {
    // if (!report.user) {
    //   Toast.show({
    //     type: "error",
    //     text1: "Debe estar registrado para reportar un punto perdido",
    //     position: "bottom",
    //   });
    //   return;
    // }

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
          base: "700px",
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
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Registre su punto perdido para continuar
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Titulo</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  id="tittle"
                  value={node.detail.description}
                  isDisabled= {true}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Latitud</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  id="latitude"
                  // onChangeText={(text) => handleEditReport(text, "latitude")}
                  value={node.latitude.toString()}
                  isDisabled={true}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Longitud</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  // onChangeText={(text) => handleEditReport(text, "longitude")}
                  value={node.longitude.toString()}
                  isDisabled={true}
                />
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
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ReportOutdatedInformation;
