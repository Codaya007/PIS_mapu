import { useNavigation } from "@react-navigation/native";
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
import { useState } from "react";
import Toast from "react-native-toast-message";
import { API_BASEURL, HomeName } from "../constants";
import { useSelector } from "react-redux";

const reportState = {
  comment: "",
  revised: false,
  lostPoint: {
    latitude: "0",
    length: "0",
  },
};

const ReportLostPoint = () => {
  const navigate = useNavigation();
  const { user } = useSelector((state) => state.authReducer);
  const [report, setReport] = useState(reportState);

  const handleEditReport = async (text, input) => {
    if (input == "latitude" || input == "length") {
      setReport({
        ...report,
        lostPoint: {
          ...report.lostPoint,
          [input]: parseInt(text),
        },
      });
    } else {
      setReport({
        ...report,
        [input]: text,
      });
    }
  };

  const handleSave = async () => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Debe estar registrado para reportar un punto perdido",
        position: "bottom",
      });
      return;
    }

    if (report.lostPoint.latitude == 0 || report.lostPoint.length == 0) {
      Toast.show({
        type: "error",
        text1: "La longitud y latitud son obligatorios",
        position: "bottom",
      });
      return;
    }

    try {
      await axios.post(`${API_BASEURL}/report/`, {
        comment: report.comment,
        revised: report.revised,
        lostPoint: report.lostPoint,
      });

      Toast.show({
        type: "success",
        text1: "Reporte enviado",
        position: "bottom",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al crear el punto perdido",
        text2: "Intentelo nuevamente",
        position: "bottom",
      });
      navigate(HomeName);
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
              Detalle su punto perdido
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
                <FormControl.Label>Latitud</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  id="latitude"
                  onChangeText={(text) => handleEditReport(text, "latitude")}
                  value={report.lostPoint.latitude}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Longitud</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={(text) => handleEditReport(text, "length")}
                  value={report.lostPoint.length}
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

export default ReportLostPoint;
