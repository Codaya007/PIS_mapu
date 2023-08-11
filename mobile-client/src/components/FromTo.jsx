import {
    Button,
    Center,
    FormControl,
    HStack,
    Input,
    Box,
    Icon,
    VStack,
    useColorModeValue,
    Toast,
} from "native-base";
import { useEffect, useState } from "react";
import { ResultSearchName } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNode, setDestination, setOrigin, setSearchText } from "../store/slices/searchSlice";
import { getSearchResults, searchShortestPathByNode } from "../store/actions/searchActions";

const FromTo = () => {
    const navigate = useNavigation().navigate;
    const { destination, origin, searchPathBy = "byNode", errorOnPathSearch } = useSelector(state => state.searchReducer);
    const [destinyText, setDestinyText] = useState(destination?.detail?.title || "");
    const [originText, setOriginText] = useState("");
    const dispatch = useDispatch()

    const colorIcon = useColorModeValue("#DADADA");

    const handleSearch = (textToSearch = "", type = "origin") => {
        try {
            if (!textToSearch)
                return Toast.show({
                    type: "error",
                    text1: "Ingrese el nombre del lugar que desea buscar",
                    position: "bottom",
                });

            dispatch(setSearchText(textToSearch))
            dispatch(getSearchResults(textToSearch))
            navigate(ResultSearchName, { type });
            // handleClearSearch();
        } catch (error) {
            console.log({ error });

            Toast.show({
                type: "error",
                text1: `No se ha podido realizar la busqueda`,
                position: "bottom",
            });
        }
    };

    const handleClearSearch = (band) => {
        if (band == "origin") {
            dispatch(setOrigin(null))
        } else {
            dispatch(setDestination(null))
        }

        dispatch(setCurrentNode(null))
    };

    useEffect(() => {
        setDestinyText(destination?.detail?.title || destination?.name || "")
    }, [destination]);

    useEffect(() => {
        setOriginText(origin?.detail?.title || origin?.name || "")
    }, [origin]);

    return (
        <Center w="100%" justifyContent="flex-end">
            <VStack p="1" py="0" w="100%" mt="5" backgroundColor="white" pb="3">
                <HStack w="100%">
                    <FormControl
                        mr="2"
                        mt="1"
                        isRequired
                    >
                        <Input
                            type="text"
                            value={originText}
                            onChangeText={(text) => setOriginText(text)}
                            placeholder="Origen..."
                            backgroundColor="white"
                            borderRadius="100px"
                            mb="2"
                            InputRightElement={
                                <Button
                                    bg="transparent"
                                    onPress={() => handleClearSearch("origin")}
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
                                        as={<MaterialIcons name="gps-fixed" />}
                                        size={6}
                                        color={colorIcon}
                                    />
                                </Box>
                            }
                            onSubmitEditing={() => handleSearch(originText, "origin")}
                        />

                        <Input
                            type="text"
                            value={destinyText}
                            onChangeText={(text) => setDestinyText(text)}
                            placeholder="Destino..."
                            backgroundColor="white"
                            borderRadius="100px"
                            InputRightElement={
                                <Button
                                    bg="transparent"
                                    onPress={() => handleClearSearch("destiny")}
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
                                    <FontAwesome name="map-marker" size={24} color={colorIcon} />
                                </Box>
                            }
                            onSubmitEditing={() => handleSearch(destinyText, "destination")}
                        />
                        <Button margin={1} onPress={() => {
                            if (searchPathBy === "byNode") {
                                dispatch(searchShortestPathByNode(origin?._id, destination?._id))
                            } else {
                                // TODO: Implementar búsqueda por nomenclatura
                            }
                        }}>Buscar ruta</Button>
                    </FormControl>
                </HStack>
            </VStack>
        </Center>
    );

};

export default FromTo;
