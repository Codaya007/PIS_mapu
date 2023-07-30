import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    VStack,
    HStack,
    Select,
    Heading
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    createRouteNode,
    updateRouteNodeById,
    fetchRouteNodeById
} from "../services/routeNodeServices";

import { getCampuses } from "../services/campusServices";

import { MapContainer, TileLayer } from "react-leaflet";
import MapWithDrawNodes from "../components/MapWithDrawNodes";

import { fetchRouteNodes } from "../store/actions/routeNodeActions";

const initialState = {
    latitude: 0,
    longitude: 0,
    available: false,
    campus: "",
};

/*
campus -> symbol
campus -> name
avaible
longitude
latitude
*/

const RouteNodesForm = () => {
    const [routeNode, setRouteNode] = useState(initialState);
    const [campuses, setCampuses] = useState([]);
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const center = [-4.032747, -79.202405];
    const zoom = 18;
    const markerRef = useRef();

    const handleMarkerDrawn = (markerCoordinates) => {
        const coordinates = markerCoordinates.geometry.coordinates;
        setRouteNode((prevState) => ({
            ...prevState,
            latitude: coordinates[1],
            longitude: coordinates[0],
        }));
    };



    const handleChange = (e) => {
        const { name, value } = e.target;

        setRouteNode({ ...routeNode, [name]: value });
    };

    const fetchCampuses = async () => {
        try {
            const result = await getCampuses();
            setCampuses(result.results);
        } catch (error) {
            console.log("Ocurrió un error al recuperar los campus:", error);
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
        // }, []);
    }, [id]); //SE EJECUTA CADA VEZ QUE EL ID CAMBIA 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Aquí puedes hacer la llamada a tu API para guardar el nuevo interesting node
            if (id) {
                await updateRouteNodeById(id, routeNode);
                navigate("/route-node");
                toast.success("Actualización exitosa");
            } else {
                await createRouteNode(routeNode);
                toast.success("Nodo ruta creado");
            }

            dispacth(fetchRouteNodes());
            navigate("/route-node");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <Box bg="gray.100" minH="100vh">
            <Container maxW="container.lg">
                <Box p="8" bg="white" boxShadow="md" borderRadius="md" borderColor="gray.300">
                    <form onSubmit={handleSubmit}>
                        <VStack spacing="4">

                            {/* TODO: AGREGAR EL CAMPO PARA LA IMAGEN*/}

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

                                <MapContainer
                                    style={{ width: "100%", height: "60vh" }}
                                    center={center}
                                    zoom={zoom}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <MapWithDrawNodes
                                        onMarkerDrawn={handleMarkerDrawn}
                                        markerRef={markerRef}
                                        latitude={routeNode.latitude}
                                        longitude={routeNode.longitude} />

                                </MapContainer>
                            </Box>

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

                            {/* Aquí debes implementar la funcionalidad para obtener los polígonos desde el mapa */}
                            {/* Puedes utilizar alguna biblioteca como react-leaflet para mostrar el mapa y seleccionar los polígonos */}

                            <Button type="submit" colorScheme="blue">
                                {id ? "Guardar cambios" : "Crear Nodo Ruta"}
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default RouteNodesForm;
