import { Box, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountDashboard } from "../store/actions/dashboardActions";
import { useEffect } from "react";
import MapContainerComponent from "../components/Map";

function Dashboard() {
  // Datos de ejemplo
  const registeredUsers = 100;
  let createdFaculties = 1;
  const createdCareer = 5;
  const createCampus = 10;
  const {
    usuariosTotal: totalUser,
    usuariosUltMes: totalUserLastMonth,
    campusTotal: totalCampus,
    facultadTotal: totalFaculty,
    bloquesTotal: totalBlock,
    carrerasTotal: totalCareer,
    categoriasTotal: totalCategory,
    sectoresTotal: totalSector
  } = useSelector((state) => state.dashboardReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountDashboard());
  }, [createdFaculties]);

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4}>
        <Stat
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            boxShadow: "lg",
          }}
        >
          <StatLabel>Total usuarios</StatLabel>
          <StatNumber color={"blue.500"}>{registeredUsers}</StatNumber>
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
          <StatLabel>Total de facultades</StatLabel>
          <StatNumber color={"blue.500"}>{createdFaculties}</StatNumber>
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
          <StatLabel>Total de carreras</StatLabel>
          <StatNumber color={"blue.500"}>{createdCareer}</StatNumber>
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
          <StatLabel>Total de Campus</StatLabel>
          <StatNumber color={"blue.500"}>{createCampus}</StatNumber>
        </Stat>
      </SimpleGrid>

      <MapContainerComponent />
    </Box>
  );
}

export default Dashboard;
