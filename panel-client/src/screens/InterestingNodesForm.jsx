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
  createInterestingNode,
  fetchInterestNodeById,
  updateInterestingNodeById,
} from "../services/interestingNodeServices";

import { getCampuses } from "../services/campusServices";
import { getCategories } from "../services/categoryServices";

// import { MapContainer, TileLayer } from "react-leaflet";
// import MapWithDrawNodes from "../components/MapWithDrawNodes";
import MapSelector from "../components/MapToSelect";

import { fetchInterestingNodes } from "../store/actions/interestingNodeActions";

import { updateImageToS3 } from "../services/imageServices";

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

const detailInitialState = {
  img: "",
};

// export const handleFileChange = async (e) => {
//   const file = e.target.files[0];
//   const MAX_IMG_SIZE_MB = 2;
//   const maxSizeInBytes = MAX_IMG_SIZE_MB * 1024 * 1024;

//   console.log({ fileSize: file.size });

//   if (file && file.size > maxSizeInBytes) {
//     toast.error(
//       `El archivo es demasiado grande. El tamaño máximo permitido es de ${MAX_IMG_SIZE_MB} MB.`
//     );

//     e.target.value = null; // Limpia el campo de selección de archivo
//     return null;
//   }

// Procesa el archivo si está dentro del límite permitido
// (puedes implementar el envío al servidor aquí)
// const imageURL = await uploadImageToS3(file);

//   console.log({ imageURL });

//   return imageURL;
// };

const InterestingNodesForm = () => {
  const [interestingNode, setInterestingNode] = useState(initialState);
  const [detail, setDetail] = useState(detailInitialState);
  const [campuses, setCampuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // const center = [-4.032747, -79.202405];
  // const zoom = 18;
  // const markerRef = useRef();

  // const handleMarkerDrawn = (markerCoordinates) => {
  //   const coordinates = markerCoordinates.geometry.coordinates;
  //   setInterestingNode((prevState) => ({
  //     ...prevState,
  //     latitude: coordinates[1],
  //     longitude: coordinates[0],
  //   }));
  // };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = await updateImageToS3(file);
    setDetail({ ...detail, img: url });
    setInterestingNode({
      ...interestingNode,
      detail: {
        ...interestingNode.detail,
        img: url,
      },
    });
  };


  const handleChangePointer = (coordinates) => {
    setInterestingNode((prevNode) => ({
      ...prevNode,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" || name === "description" || name == "img") {
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
      console.log(result.results);
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
          {id ? "Edición" : "Creación"} de nodos de interés
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
              value={interestingNode.detail.title || ""}
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
              value={interestingNode.detail.description || ""}
              onChange={handleChange}
              borderColor="gray.500"
            />
          </FormControl>

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
                    selected={campus._id === interestingNode.campus}
                  >
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

          {/* imagen */}
          {/* <FormControl>
              <FormLabel>Imágen del nodo</FormLabel>
              {detail.img && <Image width={"250px"} src={detail.img} />}
              <Input
                // required={!id}
                accept={[".png", ".jpeg", ".svg", ".jpg"]}
                type="file"
                // value={detail.img}
                onChange={async (e) => {
                  setDetail({ ...detail, img: null });
                  const img = await handleFileChange(e);

                  setDetail({ ...detail, img: null });
                }}
              />
            </FormControl> */}

          <Box p={4} width={"100%"}>
            <Heading as="h1" size="lg" mb={4}>
              Nodo de interés
            </Heading>
            <MapSelector handleChangePointer={handleChangePointer} />


            {/* <MapContainer
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
                longitude={interestingNode.longitude}
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
              <FormLabel htmlFor="avaible">¿Está activo?</FormLabel>
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

          {/* <Box p={4} width={"100%"}>
            <Heading as="h1" size="lg" color="blue.600" mb={4}>
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
                longitude={interestingNode.longitude}
              />
            </MapContainer>
          </Box> */}

          {/* Aquí debes implementar la funcionalidad para obtener los polígonos desde el mapa */}
          {/* Puedes utilizar alguna biblioteca como react-leaflet para mostrar el mapa y seleccionar los polígonos */}

          <Button type="submit" bgColor="blue.600" color="white">
            {id ? "Guardar cambios" : "Crear Nodo Interés"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default InterestingNodesForm;
