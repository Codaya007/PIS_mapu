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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createAccessNode,
  fetchAccesNodeById,
  updateAccessNodeById,
} from "../services/accessNodeServices";

import { getCampuses } from "../services/campusServices";

// import { MapContainer, TileLayer } from "react-leaflet";
// import MapWithDrawNodes from "../components/MapWithDrawNodes";

import MapSelector from "../components/MapToSelect";

import { updateImageToS3 } from "../services/imageServices";

import { fetchAccessNodes } from "../store/actions/accessNodeActions";

const initialState = {
  latitude: 0,
  longitude: 0,
  available: false,
  campus: "",
  detail: {
    title: "",
    description: null,
    img: null,
  },
};

const detailInitialState = {
  img: "",
};

const AccessNodesForm = () => {
  const [accessNode, setAccessNode] = useState(initialState);
  const [detail, setDetail] = useState(detailInitialState);
  const [campuses, setCampuses] = useState([]);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // const center = [-4.032747, -79.202405];
  // const zoom = 18;
  // const markerRef = useRef();

  // const handleMarkerDrawn = (markerCoordinates) => {
  //   const coordinates = markerCoordinates.geometry.coordinates;
  //   setAccessNode((prevState) => ({
  //     ...prevState,
  //     latitude: coordinates[1],
  //     longitude: coordinates[0],
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" || name === "description") {
      setAccessNode({
        ...accessNode,
        detail: {
          ...accessNode.detail,
          [name]: value,
        },
      });
    } else {
      setAccessNode({ ...accessNode, [name]: value });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = await updateImageToS3(file);
    setDetail({ ...detail, img: url });
    setAccessNode({
      ...accessNode,
      detail: {
        ...accessNode.detail,
        img: url,
      },
    });
  };


  const handleChangePointer = (coordinates) => {
    setAccessNode((prevNode) => ({
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

  useEffect(() => {
    if (id) {
      const getAccessNodeDb = async () => {
        const accessNodeDb = await fetchAccesNodeById(id);
        console.log({ accessNodeDb });

        setAccessNode({
          latitude: accessNodeDb.latitude,
          longitude: accessNodeDb.longitude,
          available: accessNodeDb.available,
          campus: accessNodeDb.campus._id,
          detail: {
            _id: accessNodeDb.detail._id,
            title: accessNodeDb.detail.title || "",
            description: accessNodeDb.detail.description || null,
            img: accessNodeDb.detail.img || null,
          },
        });
      };

      getAccessNodeDb();
    }

    fetchCampuses();

    // }, []);
  }, [id]); //SE EJECUTA CADA VEZ QUE EL ID CAMBIA

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí puedes hacer la llamada a tu API para guardar el nuevo interesting node
      if (id) {
        await updateAccessNodeById(id, accessNode);
        navigate("/access-node");
        toast.success("Actualización exitosa");
      } else {
        await createAccessNode(accessNode);
        toast.success("Nodo de acceso creado");
      }

      dispacth(fetchAccessNodes());
      navigate("/access-node");
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
        <Heading textAlign={"center"} color={"blue.500"}>
          {id ? "Edición" : "Creación"} de nodos de acceso
        </Heading>
      </Box>

      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          {/* TODO: AGREGAR EL CAMPO PARA LA IMAGEN*/}

          <FormControl>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              type="text"
              id="name"
              name="title"
              value={accessNode.detail.title}
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
              value={accessNode.detail.description || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="campus">Campus</FormLabel>
            <Select
              name="campus"
              value={accessNode.campus}
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
              value={accessNode.latitude || ""}
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
              value={accessNode.longitude || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

          <Box p={4} width={"100%"}>
            <Heading as="h1" size="lg" color="blue.600" mb={4}>
              Nodo de acceso
            </Heading>

            <MapSelector handleChangePointer={handleChangePointer} />


            {/* 
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
                latitude={accessNode.latitude}
                longitude={accessNode.longitude}
              />
            </MapContainer> */}
          </Box>


          {detail.img.length > 0 ? (
            <FormControl>
              <FormLabel htmlFor="image">Imagen</FormLabel>
              <Input
                type="file"
                id="image"
                name="image"
                accept=".png, .jpg, .jpeg, .svg"
                onChange={handleImageChange}
                borderColor="gray.500"
              />
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel htmlFor="icon">Imagen</FormLabel>
              <Input
                type="file"
                id="image"
                name="image"
                accept=".png, .jpg, .jpeg, .svg"
                onChange={handleImageChange}
                required
                borderColor="gray.500"
              />
            </FormControl>
          )}

          <FormControl>
            <HStack alignItems="center">
              <FormLabel htmlFor="avaible">¿Está disponible?</FormLabel>
              <Checkbox
                id="avaible"
                name="avaible"
                isChecked={accessNode.available}
                value={accessNode.available || ""}
                onChange={(e) => {
                  setAccessNode({
                    ...accessNode,
                    available: e.target.checked,
                  });
                }}
                borderColor="gray.500"
              />
            </HStack>
          </FormControl>

          {/* Aquí debes implementar la funcionalidad para obtener los polígonos desde el mapa */}
          {/* Puedes utilizar alguna biblioteca como react-leaflet para mostrar el mapa y seleccionar los polígonos */}

          <Button type="submit" bgColor="blue.600" color="white">
            {id ? "Guardar cambios" : "Crear Nodo de Acceso"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AccessNodesForm;
