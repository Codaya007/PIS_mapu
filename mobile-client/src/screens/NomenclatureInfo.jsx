import React from "react";
import { Box, Heading, Text, ScrollView, Image } from "native-base";
import { SafeAreaView } from "react-native";

const NomenclatureInfo = () => {
  return (
    <SafeAreaView>
      <ScrollView borderRadius="md" padding="4">
        <Heading paddingBottom={"4"}>Nomenclatura Institucional</Heading>
        <Box>
          <Text textAlign={"justify"}>
            En nuestra universidad, la organización y ubicación de su amplia
            infraestructura se rige por un sistema de Nomenclatura
            Universitaria. Esta nomenclatura oficial se compone de varios
            parámetros esenciales: Campus, Bloque, Piso, Ambiente, Sub Ambiente 1
            y Sub Ambiente 2. A través de esta nomenclatura, podemos ubicarnos
            de manera precisa en cada espacio de nuestras instalaciones.
          </Text>
          <Text textAlign={"justify"}>
            <Heading size="sm" ml="-1">
              Campus:{" "}
            </Heading>
            Representa el campus al cual pertenece la infraestructura, por ejemplo:

          </Text>
          <Text bold="true">
            • Argelia: A
          </Text>
          <Text bold="true">
            • Motupe: M
          </Text>
          <Text bold="true">
            • Punzara: P
          </Text>
          <Text textAlign={"justify"}>
            <Heading size="sm" ml="-1">
              Bloque:{" "}
            </Heading>
            Número de color Rojo ubicado en cada infraestructura. Identifica cada una
            de manera única e irrepetible.
          </Text>
          <Text textAlign={"justify"}>
            <Heading size="sm" ml="-1">
              Piso:{" "}
            </Heading>
            Piso físico en el que se encuentran varios Ambientes. Un Bloque puede
            contener varios pisos y estos se ennumeran desde 0.
          </Text>
          <Text textAlign={"justify"}>
            <Heading size="sm" ml="-1">
              Ambiente:{" "}
            </Heading>
            Número de Ambiente en un piso. En cada piso el número de Ambiente empieza
            desde 1 y ennumera a Aulas, Baños, Oficinas, Laboratorios, etc.
          </Text>
          <Text textAlign={"justify"}>
            <Heading size="sm" ml="-1">
              Sub Ambiente:{" "}
            </Heading>
            Espacio independiente identificado dentro de un Ambiente. Su uso se centra
            en oficinas administrativas.
          </Text>
          <Heading size="sm" p={4}>
            Veámoslo con un ejemplo...
          </Heading>
          <Image
            source={{ uri: 'https://cdn.vox-cdn.com/thumbor/9HfS_-ugBoHDaLskP6ssJ8_nIkY=/0x22:1584x851/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24415978/rick_and_morty_s4_image.png' }}
            alt="Nomenclatura"
            size="20px"
            width="100%"
            // height="100%"
            resizeMode="contain"
            borderRadius="md"
            // marginTop="-10"
            marginBottom="4"
          />
          <Text>adf</Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NomenclatureInfo;
