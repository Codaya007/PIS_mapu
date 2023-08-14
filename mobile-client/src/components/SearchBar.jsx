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
} from "native-base";
import { ResultSearchName } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FilterName } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../store/actions/searchActions";
import { setCurrentNode, setSearchText } from "../store/slices/searchSlice";
import Toast from "react-native-toast-message"

const SearchBar = () => {
  const navigate = useNavigation().navigate;
  const { searchText } = useSelector(state => state.searchReducer);
  const dispatch = useDispatch()

  const colorIcon = useColorModeValue("#DADADA");

  const handleSearch = () => {
    dispatch(setCurrentNode(null))
    if (!searchText) {
      return Toast.show({
        type: "error",
        text1: "Ingrese el nombre del lugar que desea buscar",
        position: "bottom",
      });
    }

    dispatch(getSearchResults(searchText))
    navigate(ResultSearchName)
  };

  const handleClearSearch = () => {
    dispatch(setSearchText(""))
  };

  return (
    <Center w="100%" justifyContent="flex-end">
      <VStack py="0" w="100%">
        <HStack w="100%">
          <FormControl p={1} isRequired>
            <Input
              type="text"
              value={searchText}
              onChangeText={(text) => dispatch(setSearchText(text))}
              placeholder="Laboratorio de electromecánica..."
              backgroundColor="white"
              borderRadius="50"
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
            fontWeight: "600",
            color: "red.600",
          }}
          p="1"
        >
          Búsqueda por nomenclatura
        </LinkStyle>
      </VStack>
    </Center>
  );

};

export default SearchBar;
