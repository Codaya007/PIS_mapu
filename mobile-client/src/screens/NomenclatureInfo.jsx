import React from "react";
import { Box, Heading, Text, ScrollView } from "native-base";
import { SafeAreaView } from "react-native";

const NomenclatureInfo = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Heading paddingBottom={"4"}>Nomenclatura Institucional</Heading>
        <Box>
          <Text textAlign={"justify"}>
            En nuestra universidad, la organización y ubicación de su amplia
            infraestructura se rige por un sistema de Nomenclatura
            Universitaria. Esta nomenclatura oficial se compone de varios
            parámetros esenciales: Campus, Bloque, Piso, Ambiente, SubAmbiente 1
            y Sub Ambiente 2. A través de esta nomenclatura, podemos ubicarnos
            de manera precisa en cada espacio de nuestras instalaciones.
          </Text>
          <Heading size="sm" p={4}>
            Veámoslo con un ejemplo...
          </Heading>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NomenclatureInfo;
