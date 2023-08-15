import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "native-base";
import React from "react";
import { getTimeAgo, mapISOStringToDate } from "../helpers";
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setCurrentNode, setDestination, setSearchText } from "../store/slices/searchSlice";
import { HomeName } from "../constants";

const Event = ({ event = {} }) => {
  const { name, sinceDate, untilDate, description, price, img, createdAt, node } =
    event;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const timeAgo = createdAt ? getTimeAgo(createdAt) : null;
  const activeDate =
    sinceDate && untilDate
      ? `Del ${mapISOStringToDate(sinceDate)} al ${mapISOStringToDate(
        untilDate
      )}`
      : null;

  const handlePress = () => {
    if (node?._id) {
      node.title = node.detail?.title || "Sin nombre";
      dispatch(setDestination(node));
      dispatch(setCurrentNode(node));
      dispatch(setSearchText(node.title))

      navigation.navigate(HomeName);
    }
  }

  return (
    <Box alignItems="center">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: img,
              }}
              alt={`Imágen ${name}`}
            />
          </AspectRatio>
          {price ? (
            <Center
              bg="indigo.500"
              _dark={{
                bg: "indigo.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              {`$${price}`}
            </Center>
          ) : (
            <Center
              bg="red.500"
              _dark={{
                bg: "red.500",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              Evento Gratuito!
            </Center>
          )}
        </Box>
        <Stack p={5} space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {name}
            </Heading>
            {activeDate && (
              <Text
                fontSize="xs"
                color={"gray"}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                {activeDate}
              </Text>
            )}
          </Stack>
          <Text fontWeight="400" textAlign={"justify"}>{description}</Text>
          {node && <Text onPress={handlePress} textAlign={"right"} p={1} color={"violet.400"}>
            <Entypo name="location-pin" size={24} color="black" />
            {node?.detail?.title || "-"}
          </Text>}
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                {timeAgo}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Event;
