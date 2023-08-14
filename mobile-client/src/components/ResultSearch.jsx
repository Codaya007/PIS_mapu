import {
  Box,
  Button,
  Text,
  VStack,
  useColorModeValue,
  ScrollView,
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeName } from "../constants";
import { clearError, setCurrentNode, setDestination, setOrigin, setSearchResults, setSearchText } from "../store/slices/searchSlice";
import Loader from "./Loader";
import Toast from "react-native-toast-message"

const ResultSearch = ({ navigation, route }) => {
  const pressedColor = useColorModeValue("#EAEAEA");
  const { searchText = "", searchTextResults = [], loadingSearch, errorOnPathSearch } = useSelector(state => state.searchReducer);
  const navigate = (to) => navigation.navigate(to);
  const dispatch = useDispatch()
  const { type } = route?.params || {}

  const handleNodePress = (nodeSelected) => {
    if (type) {
      if (type === "origin") {
        dispatch(setOrigin(nodeSelected))
      } else {
        dispatch(setDestination(nodeSelected))
      }
    }

    dispatch(setCurrentNode(nodeSelected));
    dispatch(setSearchText(""))

    navigate(HomeName);
    dispatch(setSearchResults(null))
  };

  useEffect(() => {
    if (errorOnPathSearch && !loadingSearch) {
      Toast.show({
        type: "error",
        text1: "Error al buscar",
        text2: errorOnPathSearch,
        position: "bottom"
      });
      dispatch(clearError())
    }
  }, [errorOnPathSearch]);

  return (
    <VStack w="100%" h="100%">
      {loadingSearch ?
        <Loader /> :
        <ScrollView w="100%">
          <Box safeArea p="1" py="0" w="100%">
            <VStack space={1}>
              {searchTextResults && searchTextResults.length > 0 ?
                searchTextResults?.map((node) => (
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
                      {node.title}
                    </Text>
                    <Text
                      fontSize="13"
                      fontWeight="light"
                      textAlign="left"
                      marginLeft={3}
                    >
                      {node.description || "Sin descripción"}
                    </Text>
                    <Box display={"flex"} justifyContent={"space-between"} flexDirection={"row"}>
                      <Text fontSize="12">
                        {node.campusName}
                      </Text>
                      {node.nomenclature?.campus &&
                        <Text color={"red.500"}>
                          {node.nomenclature?.campus} {node.nomenclature?.block} {node.nomenclature?.floor} {node.nomenclature?.environment}
                        </Text>
                      }
                    </Box>
                  </Button>
                )) : <Text>No se encontraron resultados para '{searchText}'</Text>}
            </VStack>
          </Box>
        </ScrollView>}
    </VStack >
  );
};

export default ResultSearch;
