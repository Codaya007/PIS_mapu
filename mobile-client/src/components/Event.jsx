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

function mapISOStringToDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  return formattedDate;
}

function getTimeAgo(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now - date;

  // Millisegundos en cada unidad de tiempo
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (diff < minute) {
    return "Publicado hace unos segundos";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `Publicado hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `Publicado hace ${hours} hora${hours !== 1 ? "s" : ""}`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `Publicado hace ${days} día${days !== 1 ? "s" : ""}`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `Publicado hace ${weeks} semana${weeks !== 1 ? "s" : ""}`;
  } else {
    const months = Math.floor(diff / month);
    return `Publicado hace ${months} mes${months !== 1 ? "es" : ""}`;
  }
}

const Event = ({ event = {} }) => {
  const { name, sinceDate, untilDate, description, price, image, createdAt } =
    event;

  const timeAgo = createdAt ? getTimeAgo(createdAt) : null;
  const activeDate =
    sinceDate && untilDate
      ? `Del ${mapISOStringToDate(sinceDate)} al ${mapISOStringToDate(
          untilDate
        )}`
      : null;

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
                uri: image,
              }}
              alt="image"
            />
          </AspectRatio>
          {price ? (
            <Center
              bg="violet.500"
              _dark={{
                bg: "violet.400",
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
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {name}
            </Heading>
            {activeDate && (
              <Text
                fontSize="xs"
                _light={{
                  color: "violet.500",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                {activeDate}
              </Text>
            )}
          </Stack>
          <Text fontWeight="400">{description}</Text>
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
