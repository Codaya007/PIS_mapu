import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createFaculty,
  fetchFacultyById,
  updateFacultyById,
} from "../services/facultyServices";
import { fetchFaculties } from "../store/actions/facultyActions";
import MapWithDraw from "../components/MapWithDraw";
import { MapContainer, TileLayer } from "react-leaflet";
import PolygonsTable from "../components/PolygonsTable";

const initialState = {
  name: "",
  description: "",
  dean: "",
  polygons: [],
};

const FacultyForm = () => {
  const [faculty, setFaculty] = useState(initialState);
  const [polygons, setPolygons] = useState([]);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const center = [-4.032747, -79.202405];
  const zoom = 15;

  const handlePolygonDrawn = (coordinates) => {
    setPolygons([...polygons, coordinates])
  };

  const handleDeletePolygon = (index) => {
    const newPolygons = polygons.filter((e, i) => i !== index)

    setPolygons(newPolygons)
  }

  const handleDeleteAllPolygon = () => {
    setPolygons([])
  }

  const handleResetPolygons = () => {
    setPolygons(faculty.polygons || [])
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFaculty({ ...faculty, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const getFaculty = async () => {
        const facultyDB = await fetchFacultyById(id);

        setFaculty({
          name: facultyDB.name,
          description: facultyDB.description,
          dean: facultyDB.dean,
          polygons: facultyDB.polygons,
        });

        setPolygons(facultyDB.polygons || []);
      };

      getFaculty();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí puedes hacer la llamada a tu API para guardar la nueva faculty
      if (id) {
        await updateFacultyById(id, { ...faculty, polygons });
        navigate("/faculty");
        toast.success("Actualización exitosa");
      } else {
        await createFaculty({ ...faculty, polygons });
        toast.success("Facultad creada");
      }

      dispacth(fetchFaculties());
      navigate("/faculty");
    } catch (error) {
      console.log({ error });
      toast.error(error.response?.data?.message || `No se pudo ${id ? "actualizar" : "crear"} la facultad`);
    }
  };

  const deletePolygon = async () => {
    setFaculty({ ...faculty, polygons: [] });
  };

  return (
    <Box
      margin={"auto"}
      p="5"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      borderColor="gray.300"
    >
      <Box p="4">
        <Heading textAlign={"center"} color={"blue.400"}>
          {id ? "Edición" : "Creación"} de facultades
        </Heading>
      </Box>
      <form style={{ maxWidth: "700px", margin: "auto" }} onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={faculty.name}
              onChange={handleChange}
              required
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="description">Descripción</FormLabel>
            <Textarea
              type="text"
              id="description"
              name="description"
              value={faculty.description || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="dean">Decano</FormLabel>
            <Input
              type="text"
              id="dean"
              name="dean"
              value={faculty.dean || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            {id ? "Guardar cambios" : "Crear facultad"}
          </Button>

        </VStack>
      </form>

      <Box>
        <Heading color={"blue.300"} size="md" mb={4}>
          Polígonos De La Facultad
        </Heading>
        <Box display={"flex"} p={4} width={"100%"} >
          {/* Mapa de polígonos */}
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
            <MapWithDraw
              faculty={faculty}
              onPolygonDrawn={handlePolygonDrawn}
              drawnPolygons={polygons}
            />
          </MapContainer>
          {/* Tabla de polígonos y acciones */}
          <Box>
            <Box margin={"auto"} display={"flex"} justifyContent={"space-around"} p={4}>
              <Button colorScheme="green" onClick={handleResetPolygons}>Resetear polígonos</Button>
              <Button colorScheme="red" onClick={handleDeleteAllPolygon}>Limpiar polígonos</Button>
            </Box>
            <PolygonsTable polygons={polygons} onDeletePolygon={handleDeletePolygon} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default FacultyForm;
