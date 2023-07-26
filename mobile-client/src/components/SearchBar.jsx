import {
    Box,
    Button,
    Center,
    FormControl,
    HStack,
    Input,
    Link as LinkStyle,
    Text,
    Icon,
    VStack,
    useColorModeValue,
} from "native-base";
import { View, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FilterName } from "../constants";
import { ResultSearchName } from "../constants";
import { ResultSearch } from "../components/ResultSearch";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { getInterestingNodesByStringSearch } from "../services/Search";

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigate = (to) => navigation.navigate(to);

    const [nodes, setNodes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showResults, setShowResults] = useState(false);

    const colorIcon = useColorModeValue("#DADADA");

    const handleSearch = async () => {
        try {
            const { nodes } = await getInterestingNodesByStringSearch(searchText);
            setNodes(nodes);
            setShowResults(true);
            handleClearSearch()
        } catch (error) {
            // Mostrar error
            console.log({ error });
        }
    };

    useEffect(() => {
        if (showResults) {
            navigation.navigate(ResultSearchName, { nodes }); // Redirigir y pasar los nodos como parámetro
        }
    }, [showResults]);

    const handleClearSearch = () => {
        setSearchText('');
        setShowResults(false);
    };

    return (
        <Center w="100%" justifyContent="flex-end">
            <VStack p="1" py="0" w="100%" mt="5">
                <HStack w="100%">
                    <FormControl
                        // maxW="275"
                        mr="2" isRequired>
                        <Input
                            type="text"
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                            placeholder="Laboratorio de electromecánica..."
                            backgroundColor="white"
                            InputRightElement={
                                <Button
                                    bg="transparent"
                                    onPress={handleClearSearch}
                                    _pressed={{ bg: 'transparent' }}
                                    _text={{ color: 'gray' }}
                                    py={1}
                                    px={2}
                                    right={1}
                                >
                                    <Icon as={<MaterialIcons name="cancel" />} size={5} color={colorIcon} />
                                </Button>
                            }
                            InputLeftElement={
                                <Button
                                    bg="transparent"
                                    onPress={handleClearSearch}
                                    _pressed={{ bg: 'transparent' }}
                                    _text={{ color: 'gray' }}
                                    py={1}
                                    px={2}
                                    left={1}
                                >
                                    <Icon as={<MaterialIcons name="search" />} size={6} color={colorIcon} />
                                </Button>
                            }
                            onSubmitEditing={handleSearch}
                        />
                    </FormControl>
                </HStack>
            </VStack>
        </Center>
    );
};

export default SearchBar;
