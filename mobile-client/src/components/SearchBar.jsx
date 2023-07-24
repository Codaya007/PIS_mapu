import {
    Box,
    Button,
    Center,
    FormControl,
    HStack,
    Input,
    Link as LinkStyle,
    Text,
    VStack,
} from "native-base";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {FilterName} from "../constants";
import { useNavigation } from "@react-navigation/native";

const SearchBar = () => {
    const { user } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const navigate = (to) => navigation.navigate(to);


    useEffect(() => {
        if (user) {
            navigation.navigate(HomeName);
        }
    }, [user]);

    return (
        <Center w="100%" justifyContent="flex-end">
            <VStack p="1" py="0" w="100%" mt="5">
                <HStack w="100%" >
                    <FormControl maxW="275" mr="2">
                        <Input
                            type="text"
                            placeholder="Laboratorio de electromecánica..."
                        />
                    </FormControl>
                    <Button  colorScheme="indigo">
                        Buscar
                    </Button>
                </HStack>

                <Button mt="2" w="15%" colorScheme="coolGray" onPress={() => navigate(FilterName)}>
                    {/* (cambiar nombre) */}
                    Otro
                </Button>
            </VStack>
        </Center>
    );
};

export default SearchBar;
