import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
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

const initialState = {
  name: "",
  description: "",
  dean: "",
  polygons: [],
};

const FacultyForm = () => {
  const [faculty, setFaculty] = useState(initialState);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const center = [-4.032747, -79.202405];
  const zoom = 18;

  const handlePolygonDrawn = (polygonCoordinates) => {
    const coordinates = polygonCoordinates.geometry.coordinates;
    setFaculty({ ...faculty, polygons: coordinates });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFaculty({ ...faculty, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const getFaculty = async () => {
        const facultyDB = await fetchFacultyById(id);
        console.log({ facultyDB });

        setFaculty({
          name: facultyDB.name,
          description: facultyDB.description,
          dean: facultyDB.dean,
          polygons: facultyDB.polygons,
        });
      };

      getFaculty();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí puedes hacer la llamada a tu API para guardar la nueva faculty
      if (id) {
        await updateFacultyById(id, faculty);
        navigate("/faculty");
        toast.success("Actualización exitosa");
      } else {
        await createFaculty(faculty);
        toast.success("Facultad creada");
      }

      dispacth(fetchFaculties());
      navigate("/faculty");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const deletePolygon = async () => {
    setFaculty({ ...faculty, polygons: [] });
  };

  return (
    <Center height="135vh">
      <Box
        width="900px"
        p="8"
        bg="white"
        boxShadow="md"
        borderRadius="md"
        borderColor="gray.300"
      >
        <form onSubmit={handleSubmit}>
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
              <Input
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

            <Box p={4} width={"100%"}>
              <Heading as="h1" size="lg" mb={4}>
                Póligono De La Facultad
              </Heading>

              <MapContainer
                style={{ width: "90%", height: "60vh" }}
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapWithDraw faculty={faculty} onPolygonDrawn={handlePolygonDrawn} />
              </MapContainer>
            </Box>

            {id ? (
              <Button colorScheme="blue" onClick={deletePolygon}>
                Eliminar Poligono
              </Button>
            ) : (
              null
            )}

            <Button type="submit" colorScheme="blue">
              {id ? "Guardar cambios" : "Crear facultad"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default FacultyForm;