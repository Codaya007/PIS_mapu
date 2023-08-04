import {
  Box,
  Button,
  Link as LinkStyle,
  Text,
  VStack,
  useColorModeValue,
  ScrollView,
} from "native-base";
import React from "react";
import { useDispatch } from "react-redux";
import { FilterName, HomeName, MapName } from "../constants";

const initialState = {
  hola: "holaskdfljsdfalk"
};

const ResultSearch = ({ route, navigation }) => {
  const dispatch = useDispatch();
  // const [chooseResult, setChooseResult] = useState(false);
  // const [node, setNode] = useState();
  // const navigation = useNavigation();

  const navigate = (to) => navigation.navigate(to);

  const { nodes } = route.params;

  // const handleSearch = (node) => {
  //   try {
  //     console.log("nodooo: ", node)
  //     setNode(node)
  //     setChooseResult(true);
  //   } catch (error) {
  //     // Mostrar error
  //     console.log({ error });
  //   }
  // };


  const handleNodePress = (nodeSelected) => {
    navigate(HomeName, nodeSelected);
  };

  // useEffect(() => {
  //   if (chooseResult) {
  //     navigate(MapName, { node }); // Redirigir y pasar los nodos como parámetro
  //   }
  // }, [chooseResult]);

  const pressedColor = useColorModeValue("#EAEAEA");
  const colorLink = useColorModeValue("#FAFAFA");

  return (
    <VStack w="100%" h="100%">
      <ScrollView w="100%">
        <Box safeArea p="1" py="0" w="100%">
          <VStack space={1} mt="5">
            {nodes.map((node) => (
              <Button
                key={node._id}
                onPress={() => handleNodePress(node)}
                // onPress={() => handleSearch(node)}
                justifyContent="flex-start"
                w="100%"
                maxW="500"
                bg="#EEE"
                _pressed={{ bg: pressedColor }}
              >
                <Text fontSize="16" fontWeight="bold">
                  {node.detail.title}{" "}
                </Text>
                <Text
                  fontSize="13"
                  fontWeight="light"
                  textAlign="left"
                  marginLeft={3}
                >
                  {node.detail.description}
                </Text>
                <Text fontSize="12" marginLeft={3}>
                  {node.campus.name}
                </Text>
              </Button>
            ))}
          </VStack>
        </Box>
      </ScrollView>
    </VStack>
  );
};

export default ResultSearch;
