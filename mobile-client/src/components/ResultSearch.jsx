import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  ScrollView,
  Pressable,
} from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeName } from "../constants";
import { clearError, setCurrentNode, setDestination, setOrigin, setSearchResults, setSearchText } from "../store/slices/searchSlice";
import Loader from "./Loader";
import Toast from "react-native-toast-message"

const ResultSearch = ({ navigation, route }) => {
  // const pressedColor = useColorModeValue("#EAEAEA");
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
          <VStack space={1} >
            {searchTextResults && searchTextResults.length > 0 ?
              searchTextResults?.map((node, i) => (
                <Pressable
                  p={2}
                  m={1}
                  borderRadius={7}
                  key={i}
                  backgroundColor={"#EEE"}
                  onPress={() => handleNodePress(node)}
                >
                  <Text fontSize="16" fontWeight="bold">
                    {node.title || "Sin nombre"}
                  </Text>
                  <Text
                    fontSize="13"
                    fontWeight="light"
                    textAlign="left"
                    paddingY={1}
                  >
                    {node.description || "Sin descripción"}
                  </Text>
                  <Box width={"90%"} display={"flex"} justifyContent={"space-between"} flexDirection={"row"}>
                    <Text fontSize="12">
                      Campus {node.campusName}
                    </Text>
                    {node.nomenclature &&
                      <Text color={"orange.400"}>
                        #{node.nomenclature?.campus || ""} {node.nomenclature?.block || ""} {node.nomenclature?.floor || ""} {node.nomenclature?.environment || ""}
                      </Text>
                    }
                  </Box>
                </Pressable>
              )) : <Text>No se encontraron resultados para '{searchText}'</Text>}
          </VStack>
        </ScrollView>}
    </VStack >
  );
};

export default ResultSearch;
