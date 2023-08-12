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
  Text,
  TextArea,
  VStack,
} from "native-base";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { API_BASEURL } from "../constants";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import {
  DetailNodeName
} from "../constants/index"

//Talvez toque cambiarle el tipo de dato de user y node
const commentState = {
  content: "",
};

const Comment = ({ route }) => {
  const { node } = route.params;
  const { user } = useSelector((state) => state.authReducer);
  const [comment, setComment] = useState(commentState);
  const navigation = useNavigation();

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
    });

    try {
      if (comment.content == "") {
        return Toast.show({
          type: "error",
          text1: "Agrege un comentario",
          position: "bottom",
        });
      }

      console.log("contenido", comment.content, "user", user._id, "node", node);
      await axios.post(`${API_BASEURL}/comment/`, {
        content: comment.content,
        user: user._id,
        node: node?._id,
      });

      Toast.show({
        type: "success",
        text1: "Comentario añadido exitosamente",
        position: "bottom",
      });
      
      handleCleanInput()
      handleBack()
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ya comento en este lugar o hubo un error desconocido",
        position: "bottom",
      });
      handleCleanInput()
      handleBack()
      // console.log(error);
    }
  };

  const handleBack = () => {
    navigation.navigate(DetailNodeName, { nodeId: node?._id, type: node?.type });
  }

  const handleCleanInput = () => {
    setComment({
      ...comment,
      content: '',
    });
  }


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
            <Text
              color="coolGray.500"
              fontWeight="medium"
            >
              Agregue un nuevo comentario para el lugar seleccionado
            </Text>
            <VStack space={3} mt="5">
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
              <Button mt="0" bgColor="coolGray.500" onPress={handleBack}>
                Regresar
              </Button>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Comment;
