import { Box, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoDashboard } from "../store/actions/dashboardActions";
import { useEffect } from "react";
import MapContainerComponent from "../components/Map";

function Dashboard() {
  const {
    totalUser,
    totalUserLastMonth,
    totalCampus,
    totalFaculty,
    totalBlock,
    totalCareer,
    totalCategory,
    totalSector,
  } = useSelector((state) => state.dashboardReducer);

  const dispatch = useDispatch();

  useEffect(() => {
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
          <StatLabel>Total usuarios</StatLabel>
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
          <StatLabel>Usuarios registrados en el último mes</StatLabel>
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
          <StatLabel>Total de facultades</StatLabel>
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
          <StatLabel>Total de bloques</StatLabel>
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
          <StatLabel>Total de carreras</StatLabel>
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
          <StatLabel>Total de categorias</StatLabel>
          <StatNumber color={"blue.500"}>{totalCategory}</StatNumber>
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
          <StatLabel>Total de sectores</StatLabel>
          <StatNumber color={"blue.500"}>{totalSector}</StatNumber>
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
          <StatNumber color={"blue.500"}>{totalCampus}</StatNumber>
        </Stat>
      </SimpleGrid>

      <MapContainerComponent />
    </Box>
  );
}

export default Dashboard;
