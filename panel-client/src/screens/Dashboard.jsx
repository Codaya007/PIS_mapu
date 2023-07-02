import { Box, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import MapContainerComponent from "../components/Map";

function Dashboard() {
  // Datos de ejemplo
  const registeredUsers = 100;
  const createdFaculties = 5;

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
          <StatLabel>Total de Campus</StatLabel>
          <StatNumber color={"blue.500"}>{createdFaculties}</StatNumber>
        </Stat>
      </SimpleGrid>

      <MapContainerComponent />
    </Box>
  );
}

export default Dashboard;
