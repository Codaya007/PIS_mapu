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
    Link as LinkStyle,
} from "native-base";
import { useEffect, useState } from "react";
import { ResultSearchName } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { getInterestingNodesByStringSearch } from "../services/Search";
import { getAllNodes } from "../services/Nodes";
import { FontAwesome } from '@expo/vector-icons';
import { FilterName } from "../constants";

const FromTo = () => {
    const navigate = useNavigation().navigate;
    const [nodes, setNodes] = useState([]);
    const [destiny, setDestiny] = useState("");
    const [origin, setOrigin] = useState("");
    const [showResults, setShowResults] = useState(false);

    const colorIcon = useColorModeValue("#DADADA");

    const handleSearch = async () => {
        try {
            const { nodes } = await getInterestingNodesByStringSearch(searchText);
            setNodes(nodes);
            setShowResults(true); //! CAMBIAR ESTO
            handleClearSearch();
        } catch (error) {
            // Mostrar error
            console.log({ error });
        }
    };

    useEffect(() => {
        if (showResults) {
            navigate(ResultSearchName, { nodes }); // Redirigir y pasar los nodos como parámetro
        }
    }, [showResults]);

    const handleClearSearch = (band) => {
        if (band == "origin") {
            setOrigin("")
        } else {
            setDestiny("")
        }
        setShowResults(false);
    };

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
                            value={origin}
                            onChangeText={(text) => setOrigin(text)}
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
                            onSubmitEditing={handleSearch}
                        />

                        <Input
                            type="text"
                            value={destiny}
                            onChangeText={(text) => setDestiny(text)}
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
                            onSubmitEditing={handleSearch}
                        />
                    </FormControl>
                </HStack>
            </VStack>
        </Center>
    );

};

export default FromTo;
