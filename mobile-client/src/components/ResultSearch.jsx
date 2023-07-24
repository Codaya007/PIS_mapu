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
} from "native-base";

//----------
import { Alert } from "native-base";
import { IconButton } from "native-base";
import React from "react";
import { CloseIcon } from "native-base";
//----------

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Register } from "../screens/Register";

import {
    EMAIL_REGEX,
    ForgotPasswordName,
    HomeName,
    RegisterName,
} from "../constants";
import { useNavigation } from "@react-navigation/native";

const Filter = () => {
    const { user } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigate = (to) => navigation.navigate(to);


    useEffect(() => {
        if (user) {
            navigation.navigate(HomeName);
        }
    }, [user]);

    const pressedColor = useColorModeValue("#EAEAEA");

    return (
        <Center w="100%">
            <Box safeArea p="1" py="0" w="100%">
                <VStack space={1} mt="5">
                    <Button onPress={() => navigate(HomeName)} justifyContent="flex-start" w="100%" maxW="500" bg="#EEE" _pressed={{ bg: pressedColor }}>
                        <Text fontSize="16" fontWeight="bold"> Laboratorio de parasitología </Text>
                        <Text fontSize="13" fontWeight="light" textAlign="left" marginLeft={3}>Aula de laboratorio para estudiantes de la facultad de recursos naturales </Text>
                        {/* <Text fontSize="12">Argelia </Text> */}
                        {/* <Text fontSize="12">Bloque 2 </Text> */}
                        <Text fontSize="12" fontWeight="light" fontStyle="italic" marginLeft={3} marginTop={1}>Facultad de energía, industrias y recursos naturales renovables </Text>
                        {/* Debe darme coordenadas */}
                    </Button>
                    <Button onPress={() => navigate(HomeName)} justifyContent="flex-start" w="100%" maxW="500" bg="#EEE" _pressed={{ bg: pressedColor }}>
                        <Text fontSize="16" fontWeight="bold"> Laboratorio de parasitología </Text>
                        <Text fontSize="13" fontWeight="light" textAlign="left" marginLeft={3}>Aula de laboratorio para estudiantes de la facultad de recursos naturales </Text>
                        {/* <Text fontSize="12">Argelia </Text> */}
                        {/* <Text fontSize="12">Bloque 2 </Text> */}
                        <Text fontSize="12" fontWeight="light" fontStyle="italic" marginLeft={3} marginTop={1}>Facultad de energía, industrias y recursos naturales renovables </Text>
                        {/* Debe darme coordenadas */}
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default Filter;
