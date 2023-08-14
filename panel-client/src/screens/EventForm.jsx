import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
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
import { handleFileChange } from "./BlockForm";
import NodeSelector from "../components/NodeSelector";
import { getAllCoordinates } from "../services/nodeServices";
import { ROUTE_NODO_TYPE } from "../constants";

const initialState = {
  name: "",
  sinceDate: undefined,
  untilDate: undefined,
  description: "",
  price: null,
  img: "",
  node: "",
};

const EventsForm = () => {
  const [event, setEvent] = useState(initialState);
  const [allNodes, setAllNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    let { name, value } = e.target;

    // console.log({ value });
    // if (name == "sinceDate" || name == "untilDate") {
    //   value = new Date(value);
    // } else
    if (name === "price") {
      value = parseFloat(value);
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
        console.log(eventDB.node);
        setEvent({
          name: eventDB.name,
          sinceDate: sinceDateString,
          untilDate: untilDateString,
          description: eventDB.description,
          price: eventDB.price,
          img: eventDB.img,
          node: eventDB?.node?._id,
        });
        if (eventDB.node) {
          eventDB.node.name = eventDB.node?.detail?.title || "Sin nombre";
          setSelectedNode(eventDB?.node)
        }
      };

      getEvent();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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


  useEffect(() => {
    const getMarkers = async () => {
      try {
        const { results } = await getAllCoordinates({ adjacencies: false });

        setAllNodes(results.filter(node => node.type !== ROUTE_NODO_TYPE));
      } catch (error) {
        toast.error("No se han podido obtener las coordenadas");
      }
    };
    getMarkers();
  }, []);

  return (
    <Box
      margin={"auto"}
      maxWidth="750px"
      p="5"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      borderColor="gray.300"
    >
      <Box p="4">
        <Heading textAlign={"center"} color={"blue.500"}>
          {id ? "Edición" : "Creación"} de eventos
        </Heading>
      </Box>
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
            <FormLabel htmlFor="sinceDate">Fecha de inicio</FormLabel>
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
            <Textarea
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
              type="number"
              id="price"
              name="price"
              value={event.price || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="dean">Lugar</FormLabel>
            <Text>{selectedNode?.name || "-"}</Text>
            <NodeSelector
              nodes={allNodes}
              onSelectNode={(node) => {
                setSelectedNode(node);
                setEvent({ ...event, node: node?._id })
              }}
              clearSelection={() => {
                setEvent({ ...event, node: "" });
                setSelectedNode(null)
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="dean">Imagen</FormLabel>
            {event.img && (
              <Image
                display={"block"}
                margin="auto"
                width={"250px"}
                src={event.img}
              />
            )}
            <Input
              type="file"
              required={!id}
              accept={[".png", ".jpeg", ".svg", ".jpg"]}
              id="img"
              name="img"
              // value={event.img || ""}
              onChange={async (e) => {
                setEvent({ ...event, img: null });
                const img = await handleFileChange(e);

                setEvent({ ...event, img });
              }}
              borderColor="white"
            />
          </FormControl>

          <Button type="submit" bgColor="blue.600" color="white">
            {id ? "Guardar cambios" : "Crear Evento"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EventsForm;
