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
import { API_BASEURL } from "../constants";
import { useSelector } from "react-redux";

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
      return Toast.show({
        type: "error",
        text1: "Para comentar debe registrarse",
        position: "bottom",
      });
    }

    setComment({
      ...comment,
      user: user._id,
    });

    try {
      //Modificar para que tenga ek id del nodo que selecciono el usuario
      //Se lo puede hace mediante el useSelector cuando el user e de click sobre el el
      const result = await axios.get(
        `${API_BASEURL}/interesting-node/${comment.node}`
      );

      setComment({
        ...comment,
        nodo: result._id,
      });

      if (comment.content == "" || comment.node == null) {
        return Toast.show({
          type: "error",
          text1: "Datos incompletos",
          position: "bottom",
        });
      }

      await axios.post(`${API_BASEURL}/comment/`, {
        content: comment.content,
        hide: comment.hide,
        user: comment.user,
        node: comment.node,
      });

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
              Agregue un nuevo comentario para el lugar seleccionado
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
                <FormControl.Label>Comentario</FormControl.Label>
                <TextArea
                  onChangeText={(text) => handleEditComment(text, "content")}
                  value={comment.content}
                />
              </FormControl>
              <Button mt="2" bgColor="indigo.500" onPress={handleSave}>
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
