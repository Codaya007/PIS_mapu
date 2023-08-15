import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createBlock,
  fetchBlockById,
  updateBlockById,
} from "../services/blockServices";
import { fetchBlocks } from "../store/actions/blockActions";
import { fetchCampuses } from "../store/actions/campusActions";
import { fetchCategories } from "../store/actions/categoryActions";
import { fetchFaculties } from "../store/actions/facultyActions";
import { deleteDbFields } from "../utils";
// import MapSelector from "../components/MapToSelect";
import { MapContainer, TileLayer } from "react-leaflet";
import MapWithDrawNodes from "../components/MapWithDrawNodes";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "../constants";
import { uploadImageToS3 } from "../services/imageServices";
import { deleteSubnodeById } from "../services/subnodesServices";

const subnodeBody = {
  latitude: "",
  longitude: "",
  name: "",
  description: "",
  img: "",
  category: null,
  nomenclature: {
    floor: "",
    environment: "",
    subEnvironment: "",
  },
};

const detailInitialState = {
  title: "",
  description: "",
  img: "",
  // subnodes: [subnodeBody],
};

const subnodesInitialState = [];

const nodeInitialState = {
  latitude: DEFAULT_MAP_CENTER[0],
  longitude: DEFAULT_MAP_CENTER[1],
  // available: true,
  category: null,
  // campus: "",
  adjacency: [],
  // detail: detailInitialState,
};

const blockInitialState = {
  number: "",
  available: true,
  faculty: "",
  campus: "",
  // node: nodeInitialState,
};

export const handleFileChange = async (e) => {
  const file = e.target.files[0];
  const MAX_IMG_SIZE_MB = 2;
  const maxSizeInBytes = MAX_IMG_SIZE_MB * 1024 * 1024;

  if (file && file.size > maxSizeInBytes) {
    toast.error(
      `El archivo es demasiado grande. El tamaño máximo permitido es de ${MAX_IMG_SIZE_MB} MB.`
    );

    e.target.value = null; // Limpia el campo de selección de archivo
    return null;
  }

  // Procesa el archivo si está dentro del límite permitido
  // (puedes implementar el envío al servidor aquí)
  const imageURL = await uploadImageToS3(file);

  return imageURL;
};

const BlockForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [block, setBlock] = useState(blockInitialState);
  const [node, setNode] = useState(nodeInitialState);
  const [detail, setDetail] = useState(detailInitialState);
  const [subnodes, setSubnodes] = useState(subnodesInitialState);
  const { faculties, fetched: fetchedFaculties } = useSelector(
    (state) => state.facultyReducer
  );
  const { categories, fetched: fetchedCategories } = useSelector(
    (state) => state.categoryReducer
  );
  const { campuses, fetched: fetchedCampus } = useSelector(
    (state) => state.campusReducer
  );
  const markerRef = useRef();

  const handleMarkerDrawn = (markerCoordinates) => {
    const coordinates = markerCoordinates.geometry.coordinates;
    setNode((prevState) => ({
      ...prevState,
      latitude: coordinates[1],
      longitude: coordinates[0],
    }));
  };

  const handleChangeBlock = (e) => {
    const { name, value } = e.target;
    if (name === "number") setDetail({ ...detail, title: `Bloque ${value}` });

    setBlock({ ...block, [name]: value });
  };

  const handleChangeNode = (e) => {
    const { name, value } = e.target;

    setNode({ ...node, [name]: value });
  };

  const handleChangeDetail = (e) => {
    const { name, value } = e.target;

    setDetail({ ...detail, [name]: value });
  };

  // const handleChangePointer = (coordinates) => {
  //   setNode({ ...node, latitude: coordinates.lat, longitude: coordinates.lng });
  // };

  const handleChangeSubnode = (e, index) => {
    const { name, value } = e.target;

    const newSubnodesInfo = subnodes.map((sn, i) => {
      const subnode = { ...sn };

      if (index === i) subnode[name] = value;

      return subnode;
    });

    setSubnodes(newSubnodesInfo);
  };

  const handleChangeSubnodeNomenclature = (e, index) => {
    const { name, value } = e.target;

    const newSubnodesInfo = subnodes.map((sn, i) => {
      const subnode = { ...sn };

      if (index === i) subnode.nomenclature[name] = value;

      return subnode;
    });

    setSubnodes(newSubnodesInfo);
  };

  useEffect(() => {
    if (id) {
      const getBlock = async () => {
        const { node: nodeDetail, ...block } = await fetchBlockById(id);
        const { detail, ...node } = nodeDetail;
        const subnodes = detail.subnodes || [];

        setBlock({
          available: block.available ?? false,
          campus: block.campus?._id ?? "",
          faculty: block.faculty?._id ?? "",
          number: block.number ?? "",
        });

        setNode({
          _id: node._id,
          category: node.category?._id,
          latitude: node.latitude,
          longitude: node.longitude,
        });

        setDetail({
          _id: detail._id,
          title: detail.title,
          description: detail.description,
          img: detail.img,
        });

        const mapedSubnodes = subnodes.map((sub) => {
          deleteDbFields(sub.nomenclature);
          return {
            _id: sub._id,
            latitude: sub.latitude,
            longitude: sub.longitude,
            name: sub.name,
            description: sub.description,
            img: sub.img,
            category: sub.category,
            nomenclature: { ...sub.nomenclature, _id: undefined },
          };
        });

        setSubnodes(mapedSubnodes);
      };

      getBlock();
    }

    if (!fetchedFaculties) dispatch(fetchFaculties());
    if (!fetchedCampus) dispatch(fetchCampuses());
    if (!fetchedCategories) dispatch(fetchCategories());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      subnodes.map((s) => {
        s.latitude = parseFloat(s.latitude) || null;
        s.longitude = parseFloat(s.longitude) || null;

        s.nomenclature.floor = parseInt(s.nomenclature.floor) || null;
        s.nomenclature.environment =
          parseInt(s.nomenclature.environment) || null;
        s.nomenclature.subEnvironment =
          parseInt(s.nomenclature.subEnvironment) || null;
      });

      console.log(subnodes[0]);

      const data = {
        ...block,
        number: parseInt(block.number),
        node: {
          ...node,
          available: block.available,
          campus: block.campus,
          detail: { ...detail, subnodes },
        },
      };

      // Aquí puedes hacer la llamada a tu API para guardar el nuevo bloque
      if (id) {
        await updateBlockById(id, data);
        toast.success("Actualización exitosa");
      } else {
        await createBlock(data);
        toast.success("Bloque creado exitosamente");
      }

      dispatch(fetchBlocks());
      navigate("/block");
    } catch (error) {
      console.log({ error });
      toast.error(error.response?.data?.message || "Algo salió mal");
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
          {id ? "Edición" : "Creación"} de bloques
        </Heading>
      </Box>

      <form onSubmit={handleSubmit}>
        <Heading fontSize={"lg"} color={"blue.400"}>
          Información general
        </Heading>

        <VStack spacing="4" margin={4}>
          <FormControl>
            <FormLabel htmlFor="number">Número</FormLabel>
            <Input
              type="number"
              id="number"
              name="number"
              min={1}
              value={block.number}
              onChange={handleChangeBlock}
              required
              borderColor="gray.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="faculty">Facultad</FormLabel>
            <Select
              name="faculty"
              value={block.faculty}
              onChange={handleChangeBlock}
              borderColor="gray.500"
              required
            >
              <option value="">Seleccionar facultad</option>
              {faculties.length > 0 &&
                faculties.map((faculty) => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.name}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="campus">Campus</FormLabel>
            <Select
              name="campus"
              value={block.campus}
              onChange={handleChangeBlock}
              borderColor="gray.500"
              required
            >
              <option value="">Seleccionar campus</option>
              {campuses?.length > 0 &&
                campuses.map((campus) => (
                  <option key={campus._id} value={campus._id}>
                    {campus.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </VStack>

        <Heading fontSize={"lg"} color={"blue.400"}>
          Información adicional
        </Heading>

        <VStack spacing={4} margin={4}>
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input
              type="text"
              id="title"
              name="title"
              value={detail.title}
              readOnly
              borderColor="gray.500"
            />
          </FormControl>

          {/* Imágen */}
          <FormControl>
            <FormLabel>Imágen del bloque</FormLabel>
            {detail.img && <Image width={"250px"} src={detail.img} />}
            <Input
              required={!id}
              accept={[".png", ".jpeg", ".svg", ".jpg"]}
              type="file"
              // value={detail.img}
              onChange={async (e) => {
                setDetail({ ...detail, img: null });
                const img = await handleFileChange(e);

                setDetail({ ...detail, img });
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Descripción del bloque</FormLabel>
            <Textarea
              type="text"
              id="description"
              name="description"
              value={detail.description}
              onChange={handleChangeDetail}
              borderColor="gray.500"
            />
          </FormControl>

          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <FormControl>
              <FormLabel>Latitud</FormLabel>
              <Input
                type="number"
                id="latitude"
                name="latitude"
                value={node.latitude}
                onChange={handleChangeNode}
                borderColor="gray.500"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Longitud</FormLabel>
              <Input
                type="number"
                id="longitude"
                name="longitude"
                value={node.longitude}
                onChange={handleChangeNode}
                borderColor="gray.500"
                required
              />
            </FormControl>
          </Box>

          {/* <MapSelector handleChangePointer={handleChangePointer} /> */}
          <MapContainer
            style={{ width: "100%", height: "60vh" }}
            center={DEFAULT_MAP_CENTER}
            zoom={DEFAULT_MAP_ZOOM}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapWithDrawNodes
              onMarkerDrawn={handleMarkerDrawn}
              markerRef={markerRef}
              latitude={node.latitude}
              longitude={node.longitude}
            />
          </MapContainer>

          {/* Checkbox activo */}
          <FormControl>
            <HStack alignItems="center">
              <FormLabel htmlFor="avaible">¿El bloque está activo?</FormLabel>
              <Checkbox
                display={"block"}
                id="avaible"
                name="available"
                isChecked={block.available}
                value={block.available}
                onChange={(e) => {
                  setBlock({
                    ...block,
                    available: e.target.checked,
                  });
                }}
                borderColor="gray.500"
              />
            </HStack>
          </FormControl>
        </VStack>

        <Heading fontSize={"larger"} color={"blue.400"}>
          Subnodos del bloque
        </Heading>
        <Box margin={4}>
          Los subnodos son lugares específicos que están dentro del bloque, como
          laboratorios, museos, auditorios, etc
        </Box>

        {subnodes?.map((subnode, index) => {
          // console.log(subnode);

          return (
            <VStack key={index} spacing={4} margin={4}>
              <Heading fontSize={"lg"} color={"blue.400"}>
                Información subnodo {index + 1}
              </Heading>
              <Button
                fontSize={"sm"}
                display={"block"}
                alignSelf={"self-end"}
                border={"2px"}
                color={"red.600"}
                colorScheme="white"
                onClick={async () => {
                  try {
                    if (subnode._id) {
                      await deleteSubnodeById(subnode._id);
                    }

                    setSubnodes(subnodes.filter((s, i) => i !== index));
                  } catch (error) {
                    toast.error(
                      error.response?.data?.message ||
                        "No se pudo eliminar el subnodo"
                    );
                  }
                }}
              >
                Quitar subnodo -
              </Button>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Laboratorio de parasitología..."
                  value={subnode.name}
                  onChange={(e) => handleChangeSubnode(e, index)}
                  borderColor="gray.500"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  type="text"
                  id="description"
                  name="description"
                  value={subnode.description}
                  onChange={(e) => handleChangeSubnode(e, index)}
                  borderColor="gray.500"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Imágen subnodo</FormLabel>
                {subnode.img && <Image width={"250px"} src={subnode.img} />}
                <Input
                  required={!subnode?._id}
                  accept={[".png", ".jpeg", ".svg", ".jpg"]}
                  type="file"
                  name="img"
                  // value={detail.img}
                  onChange={async (e) => {
                    handleChangeSubnode(
                      { target: { name: "img", value: null } },
                      index
                    );

                    const img = await handleFileChange(e);

                    handleChangeSubnode(
                      { target: { name: "img", value: img } },
                      index
                    );
                  }}
                />
              </FormControl>

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <FormControl>
                  <FormLabel>Latitud</FormLabel>
                  <Input
                    type="number"
                    id="latitude"
                    name="latitude"
                    value={subnode.latitude}
                    onChange={(e) => handleChangeSubnode(e, index)}
                    borderColor="gray.500"
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Longitud</FormLabel>
                  <Input
                    type="number"
                    id="longitude"
                    name="longitude"
                    value={subnode.longitude}
                    onChange={(e) => handleChangeSubnode(e, index)}
                    borderColor="gray.500"
                    required
                  />
                </FormControl>
              </Box>

              <MapContainer
                style={{ width: "100%", height: "40vh" }}
                center={DEFAULT_MAP_CENTER}
                zoom={DEFAULT_MAP_ZOOM}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapWithDrawNodes
                  onMarkerDrawn={(markerCoordinates) => {
                    const coordinates = markerCoordinates.geometry.coordinates;

                    const newSubnodes = [...subnodes];
                    const subnode = newSubnodes.find((e, i) => i === index);

                    console.log(markerCoordinates, index);

                    subnode.latitude = coordinates[1];
                    subnode.longitude = coordinates[0];

                    setSubnodes(newSubnodes);
                  }}
                  markerRef={null}
                  latitude={subnode.latitude}
                  longitude={subnode.longitude}
                />
              </MapContainer>

              <FormControl>
                <FormLabel htmlFor="category">Categoría</FormLabel>
                <Select
                  name="category"
                  value={subnode.category}
                  onChange={(e) => handleChangeSubnode(e, index)}
                  borderColor="gray.500"
                >
                  <option value={null}>Seleccionar categoría</option>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <FormControl>
                  <FormLabel>Campus</FormLabel>
                  <Input
                    type="text"
                    readOnly
                    value={
                      campuses.find((c) => c._id === block.campus)?.symbol || ""
                    }
                    borderColor="gray.500"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Bloque</FormLabel>
                  <Input
                    type="number"
                    readOnly
                    value={block.number}
                    borderColor="gray.500"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Piso</FormLabel>
                  <Input
                    type="number"
                    id="floor"
                    name="floor"
                    value={subnode.nomenclature.floor}
                    onChange={(e) => handleChangeSubnodeNomenclature(e, index)}
                    borderColor="gray.500"
                    // required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Ambiente</FormLabel>
                  <Input
                    type="text"
                    id="environment"
                    name="environment"
                    value={subnode.nomenclature.environment}
                    onChange={(e) => handleChangeSubnodeNomenclature(e, index)}
                    borderColor="gray.500"
                    // required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Subambiente</FormLabel>
                  <Input
                    type="text"
                    id="subEnvironment"
                    name="subEnvironment"
                    value={subnode.nomenclature.subEnvironment}
                    onChange={(e) => handleChangeSubnodeNomenclature(e, index)}
                    borderColor="gray.500"
                  />
                </FormControl>
              </Box>
            </VStack>
          );
        })}

        <Box margin={4}>
          <Button
            fontSize={"sm"}
            border={"2px"}
            color={"blue.500"}
            colorScheme="white"
            onClick={() => {
              setSubnodes([
                ...subnodes,
                {
                  ...subnodeBody,
                  latitude: node.latitude,
                  longitude: node.longitude,
                },
              ]);
            }}
          >
            Añadir subnodo +
          </Button>
        </Box>

        <Button
          display={"block"}
          margin={"auto"}
          type="submit"
          bgColor="blue.600"
          color="white"
        >
          {id ? "Guardar cambios" : "Crear bloque"}
        </Button>
      </form>
    </Box>
  );
};

export default BlockForm;
