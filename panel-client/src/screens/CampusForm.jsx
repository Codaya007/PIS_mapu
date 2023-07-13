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
  createCampus,
  fetchCampusById,
  updateCampusById,
} from "../services/campusServices";
import { fetchCampuses } from "../store/actions/campusActions";

const initialState = {
  name: "",
  description: "",
  address: "",
  accessPoints: [[]],
};

const CapusesForm = () => {
  const [campus, setCampus] = useState(initialState);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //REVISAR
  const handleChange = (e) => {
    console.log(`TARGET ${e.target.value}`);
    const { name, value } = e.target;
    console.log('value ' + value)

    if (name == "accessPoints") {
      let arrayPrincipal = [];
      let partes = value.split(";");
      if (partes.length === 1) {
        if(value.includes(',')){
          let valueArray = [value]
          arrayPrincipal.push([valueArray]);
        }
      } else {
        for (let i = 0; i < partes.length; i++) {
          var subParte = partes[i];
          arrayPrincipal.push([subParte]);
          console.log(arrayPrincipal.length);
        }
      }

      if (arrayPrincipal.length > 0) {
        console.log(`Array ${arrayPrincipal}`);
        setCampus({ ...campus, [name]: arrayPrincipal });
      }
    }else{
      setCampus({ ...campus, [name]: value });
    }
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      const getCampus = async () => {
        const campusDB = await fetchCampusById(id);
        setCampus({
          name: campusDB.name,
          description: campusDB.description,
          address: campusDB.address,
          accessPoints: campusDB.accessPoints,
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
        navigate("/campus");
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
    <Center height="90vh">
      <Box
        width="500px"
        p="8"
        bg="white"
        boxShadow="md"
        borderRadius="md"
        borderColor="gray.300"
      >
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
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Input
                type="text"
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
            <FormControl>
              <FormLabel htmlFor="accessPoints">Puntos de acceso</FormLabel>
              <Input
                type="text"
                id="accessPoints"
                name="accessPoints"
                value={campus.accessPoints || ""}
                onChange={handleChange}
                borderColor="gray.500"
              />
            </FormControl>

            {/* Aquí debes implementar la funcionalidad para obtener los polígonos desde el mapa */}
            {/* Puedes utilizar alguna biblioteca como react-leaflet para mostrar el mapa y seleccionar los polígonos */}

            <Button type="submit" colorScheme="blue">
              {id ? "Guardar cambios" : "Crear facultad"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default CapusesForm;
