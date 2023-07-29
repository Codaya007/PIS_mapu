import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    VStack,
    HStack,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    createRouteNode,
    updateRouteNodeById,
    fetchRouteNodeById
} from "../services/routeNodeServices";

import { getCampuses } from "../services/campusServices";

import MapContainerComponent from "../components/Map"

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

const FacultyForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [routeNode, setRouteNode] = useState(initialState);
    const [campuses, setCampuses] = useState([]);
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    const handleChange = (e) => {
        const { name, value } = e.target;

        //! OJO con esto
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
                console.log({ routeNodeDB });

                setRouteNode({
                    latitude: routeNodeDB.latitude,
                    longitude: routeNodeDB.longitude,
                    available: routeNodeDB.available,
                    campus: routeNodeDB.campus,
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

                        <Button onClick={onOpen}>Open Modal</Button>

                        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
                            <ModalOverlay />
                            <ModalContent >
                                <ModalHeader>Mapa</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    Elige un punto para crear el nuevo nodo
                                    <MapContainerComponent w="100%" h="75vh"/>
                                </ModalBody>

                                <ModalFooter>
                                    <Button variant='ghost' mr={3} onClick={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button colorScheme='blue'>Aceptar</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                        <FormControl>
                            <FormLabel htmlFor="campus">Campus</FormLabel>
                            <Select
                                name="campus"
                                value={routeNode.campus}
                                onChange={handleChange}
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

                                    //! OJO CON ESTO NOSE SI ESTARÁ BIEN
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
        </Center>
    );
};

export default FacultyForm;
