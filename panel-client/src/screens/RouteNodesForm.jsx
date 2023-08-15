import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MapSelector from "../components/MapToSelect";
import { getCampuses } from "../services/campusServices";
import {
  createRouteNode,
  fetchRouteNodeById,
  updateRouteNodeById,
} from "../services/routeNodeServices";

import { getAllCoordinates } from "../services/nodeServices";
import { fetchRouteNodes } from "../store/actions/routeNodeActions";

const initialState = {
  latitude: 0,
  longitude: 0,
  available: true,
  campus: "",
};

const RouteNodesForm = () => {
  const [routeNode, setRouteNode] = useState(initialState);
  const [campuses, setCampuses] = useState([]);
  const [nodes, setNodes] = useState([]);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRouteNode({ ...routeNode, [name]: value });
  };

  const handleChangePointer = (coordinates) => {
    setRouteNode((prevNode) => ({
      ...prevNode,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    }));
  };

  const fetchCampuses = async () => {
    try {
      const result = await getCampuses();
      setCampuses(result.results);
    } catch (error) {
      console.log("Ocurrió un error al recuperar los campus:", error);
    }
  };

  const getMarkers = async () => {
    try {
      const { results } = await getAllCoordinates({ adjacencies: false });

      setNodes(results);
    } catch (error) {
      toast.error("No se han podido obtener las coordenadas");
    }
  };

  useEffect(() => {
    if (id) {
      const getRouteNodeDb = async () => {
        const routeNodeDB = await fetchRouteNodeById(id);

        setRouteNode({
          latitude: routeNodeDB.latitude,
          longitude: routeNodeDB.longitude,
          available: routeNodeDB.available,
          campus: routeNodeDB.campus._id,
        });
      };

      getRouteNodeDb();
    }

    fetchCampuses();
  }, [id]);

  useEffect(() => {
    getMarkers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí puedes hacer la llamada a tu API para guardar el nuevo interesting node
      if (id) {
        await updateRouteNodeById(id, routeNode);
        setRouteNode(initialState);
        toast.success("Actualización exitosa");
      } else {
        await createRouteNode(routeNode);
        setRouteNode(initialState);
        toast.success("Nodo ruta creado");
      }

      dispacth(fetchRouteNodes());
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  console.log(nodes[0]);

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
          {id ? "Edición" : "Creación"} de nodos ruta
        </Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="campus">Campus</FormLabel>
            <Select
              name="campus"
              value={routeNode.campus}
              onChange={handleChange}
              required
              borderColor="gray.500"
            >
              <option value="">Seleccionar campus</option>
              {campuses.length > 0 &&
                campuses.map((campus) => (
                  <option key={campus._id} value={campus._id}>
                    {campus.symbol} - {campus.name}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="latitude">Latitud</FormLabel>
            <Input
              type="number"
              id="latitude"
              name="latitude"
              value={routeNode.latitude || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="longitude">Longitud</FormLabel>
            <Input
              type="number"
              id="longitude"
              name="longitude"
              value={routeNode.longitude || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <Box p={4} width={"100%"}>
            <Heading as="h1" size="lg" mb={4}>
              Nodo Ruta
            </Heading>

            <MapSelector
              nodes={nodes}
              handleChangePointer={handleChangePointer}
            />
          </Box>

          <FormControl>
            <HStack alignItems="center">
              <FormLabel htmlFor="avaible">¿Está disponible?</FormLabel>
              <Checkbox
                id="avaible"
                name="avaible"
                isChecked={routeNode.available}
                value={routeNode.available || ""}
                onChange={(e) => {
                  setRouteNode({
                    ...routeNode,
                    available: e.target.checked,
                  });
                }}
                borderColor="gray.500"
              />
            </HStack>
          </FormControl>

          <Button type="submit" bgColor="blue.600" color="white">
            {id ? "Guardar cambios" : "Crear Nodo Ruta"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RouteNodesForm;
