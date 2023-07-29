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
    createInterestingNode,
    fetchInterestNodeById,
    updateInterestingNodeById,
} from "../services/interestingNodeServices";

import { getCampuses } from "../services/campusServices";
import { getCategories } from "../services/categoryServices";

import MapContainerComponent from "../components/Map"

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

const FacultyForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [interestingNode, setInterestingNode] = useState(initialState);
    const [campuses, setCampuses] = useState([]);
    const [categories, setCategories] = useState([]);
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    const handleChange = (e) => {
        const { name, value } = e.target;

        //! OJO con esto
        setInterestingNode({ ...interestingNode, [name]: value });
    };

    const fetchCampuses = async () => {
        try {
            const result = await getCampuses();
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
                console.log({ interestingNodeDB });

                setInterestingNode({
                    latitude: interestingNodeDB.latitude,
                    longitude: interestingNodeDB.longitude,
                    available: interestingNodeDB.available,
                    campus: interestingNodeDB.campus,
                    category: interestingNodeDB.category,
                    detail: {
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
                            <FormLabel htmlFor="name">Nombre</FormLabel>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={interestingNode.detail.title}
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
                                value={interestingNode.campus}
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
                            <FormLabel htmlFor="category">Categoria</FormLabel>
                            <Select
                                name="category"
                                value={interestingNode.category}
                                onChange={handleChange}
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
                                    name="avaible"
                                    isChecked={interestingNode.available}
                                    value={interestingNode.available || ""}

                                    //! OJO CON ESTO NOSE SI ESTARÁ BIEN
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
                            {id ? "Guardar cambios" : "Crear Nodo de Acceso"}
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Center>
    );
};

export default FacultyForm;
