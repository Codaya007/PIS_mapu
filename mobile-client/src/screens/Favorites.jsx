import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { Pressable } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { getTimeAgo } from "../helpers";
import { MdDelete } from "react-icons/md";

const favorites = [
  {
    _id: "28694a0f-3da1-471f-bd96-142456e29d72",
    name: "Laboratorio Botánico",
    createdAt: "2023-06-22T17:00:00.000Z",
  },
  {
    _id: "28694a0f-3da1-471f-bd96-142456e29e72",
    name: "Auditorio Manuel Agustín Aguirre",
    createdAt: "2023-06-22T17:00:00.000Z",
  },
];

export default function Favorites() {
  return (
    <Center h="290px">
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
        flex="1"
        safeAreaTop
        maxW="400px"
        w="100%"
      >
        <Heading p="4" pb="3" size="lg">
          Favoritos
        </Heading>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <FavoriteList /> */}
        </ScrollView>
      </Box>
    </Center>
  );
}

function FavoriteList() {
  const [listData, setListData] = useState(favorites);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = () => {};

  const renderItem = ({ item: node, index }) => {
    const timeAgo = getTimeAgo(node.createdAt, "Guardado");

    return (
      <Box>
        <Pressable
          onPress={() => console.log("Redirigir a ubicacion en el mapa")}
          _dark={{
            bg: "coolGray.800",
          }}
          _light={{
            bg: "white",
          }}
        >
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <VStack>
                <Text
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  bold
                >
                  {node.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {node.recentText}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                alignSelf="flex-start"
              >
                {timeAgo}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2} backgroundColor={"red"}>
          <MdDelete color="red" />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <MdDelete color="red" />
          {/* <Icon as={<MdDelete />} color="white" size="xs" /> */}
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}
