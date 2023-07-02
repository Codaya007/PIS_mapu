import { Box, Container, Image, Text } from "@chakra-ui/react";
import NotFoundImage from "../assets/NotFound.svg";

function NotFoundPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="90vh"
    >
      <Container maxW="lg" centerContent>
        <Image src={NotFoundImage} alt="Página no encontrada" mb={4} />
        <Text fontSize="xl" textAlign="center">
          ¡Ups! Parece que la página que estás buscando no se encuentra.
        </Text>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
