import React from "react";
import { Box, Heading, Text, ScrollView } from "native-base";

const About = () => {
  return (
    <ScrollView borderRadius="md" padding="4">
      <Heading paddingBottom={"4"}>
        ¡Bienvenido a nuestra aplicación de guía universitaria!
      </Heading>
      <Box>
        <Text textAlign={"justify"}>
          En nuestra universidad, reconocemos que la amplitud y complejidad de
          nuestras instalaciones pueden resultar abrumadoras para los
          estudiantes nuevos y experimentados por igual. Sabemos que perderse o
          no saber cómo llegar a los diferentes lugares de la universidad puede
          generar estrés y dificultades en la vida estudiantil.
        </Text>
        <Text textAlign={"justify"}>
          Como estudiantes de ingeniería en computación, hemos asumido el
          desafío de utilizar nuestros conocimientos y habilidades para brindar
          una solución innovadora y práctica a este problema. Nuestra aplicación
          está diseñada para ser tu compañero confiable y facilitarte la vida en
          el campus.
        </Text>
      </Box>
      <Box>
        <Text textAlign={"justify"}>
          Nuestra aplicación de guía universitaria ofrece una amplia gama de
          características útiles para ayudarte a navegar por la universidad con
          facilidad. Algunas de las características principales incluyen:
        </Text>
        <Text textAlign={"justify"}>
          <Heading size="sm" ml="-1">
            Mapa interactivo:{" "}
          </Heading>
          Accede a un mapa detallado y fácil de usar de todo el campus.
          Encuentra ubicaciones importantes como aulas, bibliotecas,
          laboratorios, áreas de descanso y más. ¡Nunca más te perderás!
        </Text>
        <Text textAlign={"justify"}>
          <Heading size="sm" ml="-1">
            Rutas sugeridas:{" "}
          </Heading>
          Nuestra aplicación generará las rutas más convenientes y eficientes
          para llegar de un lugar a otro dentro del campus. Ahorra tiempo y
          energía al seguir nuestras sugerencias.
        </Text>
        <Text textAlign={"justify"}>
          <Heading size="sm" ml="-1">
            Información detallada de ubicaciones:{" "}
          </Heading>
          Obtén descripciones de cada lugar en el campus, incluyendo imágenes de
          referencia, descripciones y detalles adicionales relevantes. Sabrás
          exactamente qué esperar antes de llegar a tu destino.
        </Text>
        <Text textAlign={"justify"}>
          <Heading size="sm" ml="-1">
            Notificaciones importantes:{" "}
          </Heading>
          Mantente actualizado sobre los eventos que se llevaran a cabo, eventos
          especiales o cierres temporales de ciertas áreas. Nunca te perderás
          información crucial.
        </Text>
        <Text textAlign={"justify"}>
          <Heading size="sm" ml="-1">
            Comunidad estudiantil:{" "}
          </Heading>
          Comparte consejos, recomendaciones y experiencias mediante los
          comentarios habilitados en los puntos de interés y aprovecha la
          sabiduría colectiva de la comunidad estudiantil.
        </Text>
      </Box>
      <Box>
        <Text textAlign={"justify"}>
          Estamos comprometidos en mejorar constantemente nuestra aplicación y
          adaptarla a tus necesidades específicas. Tu satisfacción y comodidad
          son nuestra máxima prioridad. ¡Utiliza nuestra aplicación de guía
          universitaria y descubre lo fácil que puede ser moverte por nuestro
          campus!
        </Text>
        <Text textAlign={"justify"}>
          Esperamos que esta herramienta sea invaluable para tu éxito académico
          y experiencia universitaria. ¡Bienvenido a nuestra comunidad
          universitaria y a una nueva forma de explorar y disfrutar de nuestro
          campus!
        </Text>
      </Box>
      <Text></Text>
    </ScrollView>
  );
};
/* <VStack space="4" divider={<Divider />}>
<Box px="4" pt="4">
NativeBase
</Box>
<Box px="4">
  NativeBase is a free and open source framework that enable developers
  to build high-quality mobile apps using React Native iOS and Android
  apps with a fusion of ES6.
  </Box>
  <Box px="4" pb="4">
  GeekyAnts
</Box>
</VStack> */

export default About;
