import React from "react";
import { VStack, Box, Divider, Heading } from "native-base";
import Event from "../components/Event";

const events = [
  {
    deletedAt: null,
    _id: "648f4243e171b43053eb167a",
    name: "Fiesta del inti raimi",
    sinceDate: "2023-06-22T17:00:00.000Z",
    untilDate: "2023-05-21T18:00:00.000Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ea inventore a in neque provident ratione, dolores nulla molestias cum esse rerum, aliquid numquam nesciunt quos quod. Veritatis, consectetur necessitatibus!",
    price: 150.6,
    __v: 0,
    createdAt: "2023-06-30T05:36:27.910Z",
    image:
      "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
  },
  {
    deletedAt: null,
    _id: "648f4243e171b43053eb167b",
    name: "Fiesta de inauguración",
    sinceDate: "2023-06-22T17:00:00.000Z",
    untilDate: "2023-05-21T18:00:00.000Z",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ea inventore a in neque provident ratione, dolores nulla molestias cum esse rerum, aliquid numquam nesciunt quos quod. Veritatis, consectetur necessitatibus!",
    price: 0,
    __v: 0,
    createdAt: "2023-06-10T05:36:27.910Z",
    image:
      "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
  },
];

const Events = () => {
  return (
    <Box border="1" borderRadius="md" margin="1rem">
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Eventos programados en el campus UNL
      </Heading>
      <VStack space={3} mt="5">
        {events.map((event) => (
          <Event key={event._id} event={event} />
        ))}
      </VStack>
    </Box>
  );
};

export default Events;
