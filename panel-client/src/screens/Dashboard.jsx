import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoDashboard } from "../store/actions/dashboardActions";
import { useEffect, useState } from "react";
import MapContainerComponent from "../components/Map";
import { getAllCoordinates } from "../services/nodeServices";
import { toast } from "react-toastify";

function Dashboard() {
  const {
    totalUser,
    totalUserLastMonth,
    totalCampus,
    totalFaculty,
    totalBlock,
    totalCareer,
    totalCategory,
    // totalSector,
  } = useSelector((state) => state.dashboardReducer);
  const [markers, setMarkers] = useState([]);

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
        >
          <StatLabel fontSize={"xs"}>Total usuarios</StatLabel>
          <StatNumber color={"blue.500"}>{totalUser}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
        >
          <StatLabel fontSize={"xs"}>
            Usuarios registrados en el último mes
          </StatLabel>
          <StatNumber color={"blue.500"}>{totalUserLastMonth}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
        >
          <StatLabel fontSize={"xs"}>Total de facultades</StatLabel>
          <StatNumber color={"blue.500"}>{totalFaculty}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
        >
          <StatLabel fontSize={"xs"}>Total de bloques</StatLabel>
          <StatNumber color={"blue.500"}>{totalBlock}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
        >
          <StatLabel fontSize={"xs"}>Total de carreras</StatLabel>
          <StatNumber color={"blue.500"}>{totalCareer}</StatNumber>
        </Stat>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
        >
          <StatLabel fontSize={"xs"}>Total de categorías</StatLabel>
          <StatNumber color={"blue.500"}>{totalCategory}</StatNumber>
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
          <StatNumber color={"blue.500"}>{totalSector}</StatNumber>
        </Stat> */}
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
        >
          <StatLabel fontSize={"xs"}>Total de Campus</StatLabel>
          <StatNumber color={"blue.500"}>{totalCampus}</StatNumber>
        </Stat>
      </SimpleGrid>
      <Box p={4}>
        <Heading as="h1" size="lg" mb={4}>
          Mapa de nodos
        </Heading>
        <MapContainerComponent markers={markers} circle />
      </Box>
    </Box>
  );
}

export default Dashboard;
