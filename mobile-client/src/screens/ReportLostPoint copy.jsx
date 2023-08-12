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
import { API_BASEURL, HomeName } from "../constants";
import { useSelector } from "react-redux";
import { createReport } from "../services/report";
import MapApi from "../components/MapApi";

const reportState = {
  comment: "",
  lostPoint: {
    latitude: 0,
    longitude: 0,
  },
};

const ReportLostPoint = () => {
  const navigate = useNavigation();
  // const route = useRoute();
  // const { selectedCoordinate } = route.params;
  const { user } = useSelector((state) => state.authReducer);
  const [report, setReport] = useState(reportState);

  
  const handleEditReport = async (text, input) => {
      setReport({
        ...report,
        [input]: text,
      });
  };
  
  const handleUpdateReportCoordinate = (coordinate) => {
    setReport({
      ...report,
      lostPoint: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
    });
  };


  const handleSave = async () => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Debe iniciar sesión para reportar un punto perdido",
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
      navigate(HomeName);
    }

  };

  return (
    <ScrollView w={["360", "300"]} h="1000">
      <KeyboardAvoidingView
        h={{
          base: "800px",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center w="100%" height="100%">
          <Box safeArea p="2" w="90%" maxW="600" py="1">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Reportar punto perdido
            </Heading>
            
              <Center w="100%">
                <FormControl>
                <FormControl.Label>Descripción</FormControl.Label>
                <TextArea
                  onChangeText={(text) => handleEditReport(text, "comment")}
                  value={report.comment}
                />
              </FormControl>
              <FormControl marginTop={2}>
                <FormControl.Label>Seleccione punto</FormControl.Label>
              </FormControl>
              <Box safeArea p="2" w="90%" maxW="500" py="1" maxHeight='450'>
                <MapApi reportNode={true} report={report} updateCoordinate={handleUpdateReportCoordinate}  />
              </Box>
              </Center>
            <VStack space={3} mt="5">
                
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
