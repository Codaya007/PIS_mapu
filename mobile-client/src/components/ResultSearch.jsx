import {
  Box,
  Button,
  Text,
  VStack,
  useColorModeValue,
  ScrollView,
} from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeName } from "../constants";
import { setCurrentNode, setDestination, setOrigin, setSearchResults } from "../store/slices/searchSlice";


const ResultSearch = ({ navigation, route }) => {
  const pressedColor = useColorModeValue("#EAEAEA");
  const { searchText = "", searchTextResults = [] } = useSelector(state => state.searchReducer);
  const navigate = (to) => navigation.navigate(to);
  const dispatch = useDispatch()
  const { type } = route?.params || {}

  console.log("RESULTADOS DE BUSQUEDA: ", { type });

  const handleNodePress = (nodeSelected) => {
    if (type) {
      if (type === "origin") {
        dispatch(setOrigin(nodeSelected))
      } else {
        dispatch(setDestination(nodeSelected))
      }
    } else {
      dispatch(setCurrentNode(nodeSelected));
    }

    navigate(HomeName);
    dispatch(setSearchResults(null))
  };

  return (
    <VStack w="100%" h="100%">
      <ScrollView w="100%">
        <Box safeArea p="1" py="0" w="100%">
          <VStack space={1} mt="5">
            {searchTextResults && searchTextResults.length > 0 ? searchTextResults?.map((node) => (
              <Button
                key={node._id}
                onPress={() => handleNodePress(node)}
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
            )) : <Text>No se encontraron resultados para '{searchText}'</Text>}
          </VStack>
        </Box>
      </ScrollView>
    </VStack>
  );
};

export default ResultSearch;
