import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createEvent,
  fetchEventById,
  updateEventById,
} from "../services/eventServices";
import { fetchEvents } from "../store/actions/eventActions";

const initialState = {
  name: "",
  sinceDate: undefined,
  untilDate: undefined,
  description: "",
  price: null,
  img: "",
};

const EventsForm = () => {
  const [event, setEvent] = useState(initialState);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(typeof(value));
    if(name == "sinceDate" || name == "untilDate" ){
        let valueA = new Date(value);
        console.log(typeof(valueA))
    }

    setEvent({ ...event, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const getEvent = async () => {
        let eventDB = await fetchEventById(id);
        let sinceDateString = new Date(eventDB.sinceDate);
        let untilDateString = new Date(eventDB.untilDate);
        sinceDateString = sinceDateString.toISOString().slice(0, 16);
        untilDateString = untilDateString.toISOString().slice(0, 16);
        setEvent({
          name: eventDB.name,
          sinceDate: sinceDateString,
          untilDate: untilDateString,
          description: eventDB.description,
          price: eventDB.price,
          img: eventDB.img,
        });
      };

      getEvent();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(event.sinceDate);
    try {
      // Aquí puedes hacer la llamada a tu API para guardar la nueva faculty
      if (id) {
        await updateEventById(id, event);
        navigate("/event");
        toast.success("Actualización exitosa");
      } else {
        await createEvent(event);
        toast.success("Evento creado");
      }

      dispacth(fetchEvents());
      navigate("/event");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <Center height="90vh">
      <Box
        width="500px"
        p="8"
        bg="white"
        boxShadow="md"
        borderRadius="md"
        borderColor="gray.300"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl>
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Input
                type="text"
                id="name"
                name="name"
                value={event.name}
                onChange={handleChange}
                required
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Fecha de inicio</FormLabel>
              <Input
                type="datetime-local"
                id="sinceDate"
                name="sinceDate"
                value={event.sinceDate || ""}
                onChange={handleChange}
                borderColor="gray.500"
                size="md"
              />

            </FormControl>

            <FormControl>
              <FormLabel htmlFor="dean">Fecha de terminación</FormLabel>
              <Input
                type="datetime-local"
                id="untilDate"
                name="untilDate"
                value={event.untilDate || ""}
                onChange={handleChange}
                borderColor="gray.500"
                size="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="dean">Descripción</FormLabel>
              <Input
                type="text"
                id="description"
                name="description"
                value={event.description || ""}
                onChange={handleChange}
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="dean">Precio</FormLabel>
              <Input
                type="text"
                id="price"
                name="price"
                value={event.price || ""}
                onChange={handleChange}
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="dean">Imagen</FormLabel>
              <Input
                type="text"
                id="img"
                name="img"
                value={event.img || ""}
                onChange={handleChange}
                borderColor="gray.500"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue">
              {id ? "Guardar cambios" : "Crear Evento"}
            </Button>

          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default EventsForm;
