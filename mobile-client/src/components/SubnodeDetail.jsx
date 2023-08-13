import { View, Text, Box, Heading, Image } from 'native-base'
import React from 'react'

const formatBlockName = (str = "Bloque 0") => str.split(" ")[1]

export default function SubnodeDetail({ subnode, campus, block }) {
  const { category = "", description = "-", img, name = "", nomenclature = {} } = subnode;

  return <Box borderRadius={6} bgColor={"gray.100"} display={"flex"} flexDirection={"row"}>
    {img &&
      <Image
        borderLeftRadius={6}
        overflow={"hidden"}
        height={"100%"}
        width={"24%"}
        resizeMode="cover"
        alt={name}
        source={{ uri: img }}
      />
    }
    <Box padding={"4"} width={"76%"}>
      <Heading size={"sm"}>{name}</Heading>
      <View paddingY={2} width={"full"}>
        <Text textAlign={"justify"}>{description || "Sin descripción"}</Text>
      </View>
      <View flex={1} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
        {category &&
          <View bgColor={"yellow.200"} paddingY={"1"} paddingX={3} borderRadius={"15px"}>
            <Text>{category}</Text>
          </View>
        }
        {campus &&
          <Text fontWeight={"bold"} color={"gray.400"}>
            #{campus?.symbol} {formatBlockName(block)} {nomenclature.environment} {nomenclature.subEnvironment}
          </Text>
        }
      </View>
    </Box>
  </Box >
}