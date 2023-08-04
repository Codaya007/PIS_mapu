import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MapContainerComponent from "../components/Map";
import { getAllCoordinates } from "../services/nodeServices";
import { getInfoDashboard } from "../store/actions/dashboardActions";

function Dashboard() {
  const {
    totalUser,
    totalUserLastMonth,
    totalCampus,
    totalFaculty,
    totalBlock,
    totalCareer,
    totalCategory,
    totalEvents,
    totalInterestingNodes,
    totalAccessNodes,
    totalRouteNodes,
    // totalSector,
  } = useSelector((state) => state.dashboardReducer);
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const getMarkers = async () => {
      try {
        const { results } = await getAllCoordinates();
        setMarkers(results);
      } catch (error) {
        toast.error("No se han podido obtener las coordenadas");
      }
    };
    getMarkers();

    dispatch(getInfoDashboard());
  }, []);

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/user")}
        >
          <StatLabel fontSize={"xs"}>Total usuarios</StatLabel>
          <StatNumber color={"red.400"}>{totalUser}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/user")}
        >
          <StatLabel fontSize={"xs"}>
            Usuarios registrados en el último mes
          </StatLabel>
          <StatNumber color={"red.400"}>{totalUserLastMonth}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/faculty")}
        >
          <StatLabel fontSize={"xs"}>Total de facultades</StatLabel>
          <StatNumber color={"red.400"}>{totalFaculty}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/block")}
        >
          <StatLabel fontSize={"xs"}>Total de bloques</StatLabel>
          <StatNumber color={"red.400"}>{totalBlock}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/career")}
        >
          <StatLabel fontSize={"xs"}>Total de carreras</StatLabel>
          <StatNumber color={"red.400"}>{totalCareer}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/category")}
        >
          <StatLabel fontSize={"xs"}>Total de categorías</StatLabel>
          <StatNumber color={"red.400"}>{totalCategory}</StatNumber>
        </Stat>
        {/* <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
        >
          <StatLabel>Total de sectores</StatLabel>
          <StatNumber color={"red.400"}>{totalSector}</StatNumber>
        </Stat> */}
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/campus")}
        >
          <StatLabel fontSize={"xs"}>Total de Campus</StatLabel>
          <StatNumber color={"red.400"}>{totalCampus}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/events")}
        >
          <StatLabel fontSize={"xs"}>Total de eventos</StatLabel>
          <StatNumber color={"red.400"}>{totalEvents}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/access-node")}
        >
          <StatLabel fontSize={"xs"}>Total Nodos acceso</StatLabel>
          <StatNumber color={"red.400"}>{totalAccessNodes}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/interesting-node")}
        >
          <StatLabel fontSize={"xs"}>Total Nodos de interés</StatLabel>
          <StatNumber color={"red.400"}>{totalInterestingNodes}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={() => navigate("/route-node")}
        >
          <StatLabel fontSize={"xs"}>Total Nodos ruta</StatLabel>
          <StatNumber color={"red.400"}>{totalRouteNodes}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Box p={4}>
        <Heading as="h1" size="lg" color="blue.600" mb={4}>
          Mapa de nodos
        </Heading>
        <MapContainerComponent width="100%" markers={markers} circle />
      </Box>
    </Box>
  );
}

export default Dashboard;
