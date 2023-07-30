import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    VStack,
    HStack,
    Select,
    Heading,
    Container
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    createInterestingNode,
    fetchInterestNodeById,
    updateInterestingNodeById,
} from "../services/interestingNodeServices";

import { getCampuses } from "../services/campusServices";
import { getCategories } from "../services/categoryServices";

import { MapContainer, TileLayer } from "react-leaflet";
import MapWithDrawNodes from "../components/MapWithDrawNodes";

import { fetchInterestingNodes } from "../store/actions/interestingNodeActions";

const initialState = {
    latitude: 0,
    longitude: 0,
    available: false,
    campus: "",
    category: "",
    detail: {
        title: "",
        description: null,
        img: null,
    },
};

/*
detail -> img
detail -> name
coordinate
detail -> title
detail -> description
campus -> symbol
campus -> name
category -> name
avaible
*/

const InterestingNodesForm = () => {
    const [interestingNode, setInterestingNode] = useState(initialState);
    const [campuses, setCampuses] = useState([]);
    const [categories, setCategories] = useState([]);
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const center = [-4.032747, -79.202405];
    const zoom = 18;
    const markerRef = useRef();

    const handleMarkerDrawn = (markerCoordinates) => {
        const coordinates = markerCoordinates.geometry.coordinates;
        setInterestingNode((prevState) => ({
            ...prevState,
            latitude: coordinates[1],
            longitude: coordinates[0],
        }));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "title" || name === "description") {
            setInterestingNode({
                ...interestingNode,
                detail: {
                    ...interestingNode.detail,
                    [name]: value,
                },
            });
        } else {
            setInterestingNode({ ...interestingNode, [name]: value });
        }
    };

    const fetchCampuses = async () => {
        try {
            const result = await getCampuses();
            console.log(result.results)
            setCampuses(result.results);
        } catch (error) {
            console.log("Ocurrió un error al recuperar los campus:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const result = await getCategories();
            setCategories(result.results);
        } catch (error) {
            console.log("Ocurrió un error al recuperar las categorias:", error);
        }
    };

    useEffect(() => {
        if (id) {
            const getInterestingNodeDb = async () => {
                const interestingNodeDB = await fetchInterestNodeById(id);

                setInterestingNode({
                    latitude: interestingNodeDB.latitude,
                    longitude: interestingNodeDB.longitude,
                    available: interestingNodeDB.available,
                    campus: interestingNodeDB.campus._id,
                    category: interestingNodeDB.category._id,
                    detail: {
                        _id: interestingNodeDB.detail._id,
                        title: interestingNodeDB.detail.title || "",
                        description: interestingNodeDB.detail.description || null,
                        img: interestingNodeDB.detail.img || null,
                    },
                });

            };

            getInterestingNodeDb();
        }


        fetchCampuses();
        fetchCategories();

        // }, []);
    }, [id]); //SE EJECUTA CADA VEZ QUE EL ID CAMBIA 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Aquí puedes hacer la llamada a tu API para guardar el nuevo interesting node
            if (id) {
                await updateInterestingNodeById(id, interestingNode);
                navigate("/interesting-node");
                toast.success("Actualización exitosa");
            } else {
                await createInterestingNode(interestingNode);
                toast.success("Nodo de interés creado");
            }

            dispacth(fetchInterestingNodes());
            navigate("/interesting-node");
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
                                <FormLabel htmlFor="name">Nombre</FormLabel>
                                <Input
                                    type="text"
                                    id="name"
                                    name="title"
                                    value={interestingNode.detail.title || ""}
                                    onChange={handleChange}
                                    required
                                    borderColor="gray.500"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="description">Descripción</FormLabel>
                                <Input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={interestingNode.detail.description || ""}
                                    onChange={handleChange}
                                    borderColor="gray.500"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="latitude">Latitud</FormLabel>
                                <Input
                                    type="number"
                                    id="latitude"
                                    name="latitude"
                                    value={interestingNode.latitude || ""}
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
                                    value={interestingNode.longitude || ""}
                                    onChange={handleChange}
                                    borderColor="gray.500"
                                />
                            </FormControl>

                            <Box p={4} width={"100%"}>
                                <Heading as="h1" size="lg" mb={4}>
                                    Nodo de interés
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
                                        latitude={interestingNode.latitude}
                                        longitude={interestingNode.longitude} />
                                </MapContainer>

                            </Box>

                            <FormControl>
                                <FormLabel htmlFor="campus">Campus</FormLabel>
                                <Select
                                    name="campus"
                                    value={interestingNode.campus}
                                    onChange={handleChange}
                                    required
                                    borderColor="gray.500"
                                >
                                    <option value="">Seleccionar campus</option>
                                    {campuses.length > 0 &&
                                        campuses.map((campus) => (
                                            <option
                                                key={campus._id}
                                                value={campus._id}
                                                selected={campus._id === interestingNode.campus}>
                                                {campus.symbol} - {campus.name}
                                            </option>
                                        ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="category">Categoria</FormLabel>
                                <Select
                                    name="category"
                                    value={interestingNode.category}
                                    onChange={handleChange}
                                    required
                                    borderColor="gray.500"
                                >
                                    <option value="">Seleccionar categoria</option>
                                    {categories.length > 0 &&
                                        categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <HStack alignItems="center">
                                    <FormLabel htmlFor="avaible">¿Está disponible?</FormLabel>
                                    <Checkbox
                                        id="avaible"
                                        name="available"
                                        isChecked={interestingNode.available}
                                        value={interestingNode.available || ""}
                                        onChange={(e) => {
                                            setInterestingNode({
                                                ...interestingNode,
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
                                {id ? "Guardar cambios" : "Crear Nodo Interés"}
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default InterestingNodesForm;
