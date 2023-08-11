import { View, Text, Box, Heading, Image } from 'native-base'
import React from 'react'


const formatBlockName = (str = "Bloque 0") => str.split(" ")[1]

const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos suscipit deleniti ut et laudantium facilis adipisci porro totam eaque tempora molestias labore ea, ipsam consequuntur qui, aliquid distinctio rem saepe!";

export default function SubnodeDetail({ subnode, campus, block }) {
  const { category = "", description = "-", img, name = "", nomenclature = {} } = subnode;

  return <View borderRadius={6} bgColor={"gray.100"} display={"flex"} flexDirection={"row"}>
    {img && <Box width={"24%"} height={"100%"} overflow={"hidden"} borderLeftRadius={6}>
      <Image
        height={"100%"}
        width={"100%"}
        resizeMode="cover"
        alt={name}
        source={{ uri: img }}
      />
    </Box>
    }
    <View padding={"4"} width={"76%"}>
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
    </View>
  </View >
}