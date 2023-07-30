import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCampus,
  fetchCampusById,
  updateCampusById,
} from "../services/campusServices";
import { fetchCampuses } from "../store/actions/campusActions";

const initialState = {
  name: "",
  description: "",
  address: "",
  symbol: "",
};

const CapusesForm = () => {
  const [campus, setCampus] = useState(initialState);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //REVISAR
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCampus({ ...campus, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const getCampus = async () => {
        const campusDB = await fetchCampusById(id);
        setCampus({
          name: campusDB.name,
          description: campusDB.description,
          address: campusDB.address,
          symbol: campusDB.symbol,
        });
      };

      getCampus();
    }
  }, []);

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCampusById(id, campus);
        toast.success("Actualizacion exitosa");
      } else {
        await createCampus(campus);
        toast.success("Campus creado");
      }

      dispacth(fetchCampuses());
      navigate("/campus");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

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
        <Heading textAlign={"center"} color={"blue.400"}>
          {id ? "Edición" : "Creación"} de campus
        </Heading>
      </Box>
      <form onSubmit={handleSumit}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={campus.name}
              onChange={handleChange}
              required
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="name">Símbolo</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={campus.symbol}
              onChange={handleChange}
              required
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Descripción</FormLabel>
            <Textarea
              id="description"
              name="description"
              value={campus.description || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="address">Dirección</FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              value={campus.address || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            {id ? "Guardar cambios" : "Crear campus"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CapusesForm;
