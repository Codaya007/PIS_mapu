import React, { useEffect, useState } from "react";
import { Heading, FlatList, Text } from "native-base";
import Event from "../components/Event";
import { getAllEvents } from "../services";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { events } = await getAllEvents();
        setEvents(events);
      } catch (error) {
        // Mostrar error
        console.log({ error });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Heading
        size="lg"
        fontWeight="600"
        padding={5}
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Eventos programados en el campus UNL
      </Heading>
      <FlatList
        data={events}
        renderItem={({ item: event }) => (
          <>
            <Event key={event._id} event={event} />
            <Text height={4}></Text>
          </>
        )}
        keyExtractor={(event) => event._id}
      />
    </>
    // </FlatList>
  );
};

export default Events;
