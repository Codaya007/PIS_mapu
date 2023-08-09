import {
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Icon,
  Box,
  VStack,
  useColorModeValue,
  Link as LinkStyle,
  Toast,
} from "native-base";
import { useEffect, useState } from "react";
import { ResultSearchName } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FilterName } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../store/actions/searchActions";
import { setSearchText } from "../store/slices/searchSlice";

const SearchBar = () => {
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigation().navigate;
  const { searchText } = useSelector(state => state.searchReducer);
  const dispatch = useDispatch()

  const colorIcon = useColorModeValue("#DADADA");

  const handleSearch = () => {
    try {
      if (!searchText) return Toast.show({
        type: "error",
        text1: "Ingrese el nombre del lugar que desea buscar",
        position: "bottom",
      });

      dispatch(getSearchResults(searchText))
      setShowResults(true);
    } catch (error) {
      console.log("Error en handleSearch", { error });
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || error.message,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    if (showResults) {
      navigate(ResultSearchName); // Redirigir a detalle de resultados
    }
  }, [showResults]);

  const handleClearSearch = () => {
    dispatch(setSearchText(""))
    setShowResults(false);
  };

  return (
    <Center w="100%" justifyContent="flex-end">
      <VStack p="1" py="0" w="100%" mt="5">
        <HStack w="100%">
          <FormControl
            // maxW="275"
            mr="2"
            mt="1"
            isRequired
          >
            <Input
              type="text"
              value={searchText}
              onChangeText={(text) => dispatch(setSearchText(text))}
              placeholder="Laboratorio de electromecánica..."
              backgroundColor="white"
              borderRadius="100px"
              InputRightElement={
                <Button
                  bg="transparent"
                  onPress={handleClearSearch}
                  _pressed={{ bg: "transparent" }}
                  _text={{ color: "gray" }}
                  py={1}
                  px={2}
                  right={1}
                >
                  <Icon
                    as={<MaterialIcons name="cancel" />}
                    size={5}
                    color={colorIcon}
                  />
                </Button>
              }
              InputLeftElement={
                <Box
                  bg="transparent"
                  py={1}
                  px={2}
                  left={1}
                >
                  <Icon
                    as={<MaterialIcons name="search" />}
                    size={6}
                    color={colorIcon}
                  />
                </Box>
              }
              onSubmitEditing={handleSearch}
            />
          </FormControl>
        </HStack>
        <LinkStyle
          onPress={() => navigate(FilterName)}
          _text={{
            fontSize: "sm",
            fontWeight: "400",
            color: "coolGray.500",
          }}
          alignSelf="flex-start"
          mt="1"
          ml="5"
        >
          Búsqueda avanzada
        </LinkStyle>
      </VStack>
    </Center>
  );

};

export default SearchBar;
