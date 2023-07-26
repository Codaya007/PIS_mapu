import {
    Box,
    Button,
    Center,
    FormControl,
    HStack,
    Heading,
    Input,
    Link as LinkStyle,
    Text,
    VStack,
    useColorModeValue,
    ScrollView,
} from "native-base";

//----------
import { Alert } from "native-base";
import { IconButton } from "native-base";
import React from "react";
import { CloseIcon } from "native-base";
//----------

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
    HomeName,
    MapName
} from "../constants";
import { useNavigation } from "@react-navigation/native";

const ResultSearch = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigate = (to) => navigation.navigate(to);

    const { nodes } = route.params;

    const handleNodePress = (node) => {
        navigation.navigate(MapName, { selectedNode: node });
    };

    const pressedColor = useColorModeValue("#EAEAEA");
    const colorLink = useColorModeValue("#FAFAFA");

    return (
        <VStack w="100%" h="100%">
            <ScrollView w="100%">
                <Box safeArea p="1" py="0" w="100%">
                    <VStack space={1} mt="5">
                        {nodes.map((node) => (
                            <Button
                                key={node.id} // Asegúrate de tener una clave única para cada componente
                                onPress={() => handleNodePress(node)} // Agrega un evento onPress para el botón
                                justifyContent="flex-start"
                                w="100%"
                                maxW="500"
                                bg="#EEE"
                                _pressed={{ bg: pressedColor }}
                            >
                                <Text fontSize="16" fontWeight="bold">{node.detail.title} </Text>
                                <Text fontSize="13" fontWeight="light" textAlign="left" marginLeft={3}>{node.detail.description}</Text>
                                <Text fontSize="12" marginLeft={3}>{node.campus.name}</Text>
                            </Button>
                        ))}
                    </VStack>
                </Box>
            </ScrollView>
            <VStack alignItems="flex-start" mb="4" ml="2">
                <LinkStyle
                    onPress={() => navigate(FilterName)}
                    _text={{
                        fontSize: "sm",
                        fontWeight: "400",
                        color: { colorLink }
                    }}
                    alignSelf="flex-start"
                    mt="1"
                >
                    {/* TODO poner la Búsqueda avanzada dentro del cuadro de resultados */}
                    Búsqueda avanzada
                </LinkStyle>
            </VStack>
        </VStack>
    );
};

export default ResultSearch;
