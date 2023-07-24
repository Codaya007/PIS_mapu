import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  HStack,
  Heading,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
} from "native-base";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { HomeName } from "../constants";
import { API_BASEURL } from "../constants";
import { useSelector } from "react-redux";
import { ObjectId } from "bson-objectid";

//Talvez toque cambiarle el tipo de dato de user y node
const commentState = {
  content: "",
  hide: false,
  user: null,
  node: null,
};

const nodoState = {
  latitude: 0,
  longitude: 0,
};

const Comment = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [comment, setComment] = useState(commentState);
  const [nodo, setNodo] = useState(nodoState);

  const handleTestNode = (text, input) => {
    setNodo({
      ...nodo,
      [input]: text,
    });
  };

  const handleEditComment = (text, input) => {
    setComment({
      ...comment,
      [input]: text,
    });
  };

  const handleSave = async () => {

    
    if (user == null) {
      Toast.show({
        type: "error",
        text1: "Para comentar debe registrarse",
        position: "bottom",
      });
      return;
    }
    setComment({
      ...comment,
      user: user._id,
    });

    try {
      // const a = new ObjectId("64bac6ef1b3b6f9d5ec5757f");
      // console.log(a.toString());

      //Modificar para que tenga ek id del nodo que selecciono el usuario
      //Se lo puede hace mediante el useSelector cuando el user e de click sobre el el
      const result = await axios.get(
        `http://${API_BASEURL}/interesting-node/${comment.node}`
      );
      console.log(result);
      setComment({
        ...comment,
        nodo: result._id,
      });
      
      if (comment.content == "" || comment.node == null) {
        Toast.show({
          type: "error",
          text1: "Datos incompletos",
          position: "bottom",
        });
        return;
      }

      await axios.post(
        `http://${API_BASEURL}/comment/`,
        { content: comment.content, hide: comment.hide, user: comment.user, node: comment.node}
      );

      Toast.show({
        type: "success",
        text1: "Se ha creado el reporte",
        position: "bottom",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No se puedo crear el mensaje ",
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
              Agregar comentario
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
              Agregue un nuevo comentario para el nodo selecionado
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Latitud del nodo</FormControl.Label>
                <Input
                  id="latitude"
                  onChangeText={(text) => handleTestNode(text, "latitude")}
                  value={nodo.latitude}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Longitud de nodo </FormControl.Label>
                <Input
                  onChangeText={(text) => handleTestNode(text, "longitude")}
                  value={nodo.longitude}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  Comentario 
                </FormControl.Label>
                <Input
                  onChangeText={(text) => handleEditComment(text, "content")}
                  value={comment.content}
                />
              </FormControl>

              <Button mt="2" colorScheme="yellow" onPress={handleSave}>
                Comentar
              </Button>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Comment;
