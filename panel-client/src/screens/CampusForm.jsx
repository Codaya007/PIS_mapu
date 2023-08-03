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
import { MapContainer, TileLayer } from "react-leaflet";
import MapWithDraw from "../components/MapWithDraw";

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
  const [polygons, setPolygons] = useState([]);
  const { id } = useParams();


  const handlePolygonDrawn = (coordinates) => {
    setPolygons([coordinates])
  };

  const handleDeletePolygon = (index) => {
    setPolygons([])
  }

  const handleResetPolygons = () => {
    setPolygons(campus.polygon?.length ? [campus.polygon] : [])
  }

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
          polygon: campusDB.polygon
        });
        // console.log({ campusDB });
        setPolygons(campusDB.polygon?.length ? [campusDB.polygon] : [])
      };

      getCampus();
    }
  }, []);

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCampusById(id, { ...campus, polygon: polygons.length ? polygons[0] : [] });
        toast.success("Actualizacion exitosa");
      } else {
        await createCampus({ ...campus, polygon: polygons.length ? polygons[0] : [] });
        toast.success("Campus creado");
      }

      dispacth(fetchCampuses());
      navigate("/campus");
    } catch (error) {
      console.log({ error });
      toast.error(error.response?.data?.message || `No se ha podido ${id ? "actualizar" : "crear"} el campus`);
    }
  };

  return (
    <Box
      margin={"auto"}
      p="4"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      borderColor="gray.300"
    >
      <Heading textAlign={"center"} color={"blue.400"}>
        {id ? "Edición" : "Creación"} de campus
      </Heading>

      <Box p="4" display={"flex"} width={"100%"}>
        {/* Formulario inputs normales */}
        <form style={{ minWidth: "40%" }} onSubmit={handleSumit}>
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
                id="symbol"
                name="symbol"
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

        {/* Parte del mapa */}
        <Box width={"60%"}>

          {/* <Heading textAlign={"center"} color={"blue.300"} size="md" mb={4} p={4}>
            Polígono geográfico del campus {campus.name && `'${campus.name}'`}
          </Heading> */}

          <Box p={4} width={"100%"} >
            <Box display={"flex"} justifyContent={"space-evenly"} paddingBottom={4}>
              <Button colorScheme="green" onClick={handleResetPolygons}>Resetear polígono</Button>
              <Button colorScheme="red" onClick={handleDeletePolygon}>Limpiar mapa</Button>
            </Box>
            {/* Mapa de polígonos */}
            <MapContainer
              style={{ width: "100%", height: "60vh" }}
              center={[-4.032747, -79.202405]}
              zoom={15}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapWithDraw
                onPolygonDrawn={handlePolygonDrawn}
                drawnPolygons={polygons}
              />
            </MapContainer>
          </Box>

        </Box>

      </Box>

    </Box>
  );
};

export default CapusesForm;
