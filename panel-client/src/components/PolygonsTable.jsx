import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const PolygonsTable = ({ polygons = [], onDeletePolygon = () => { } }) => {
  return (
    <TableContainer>

      <Table maxW={"500px"} variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Nro Puntos</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {polygons?.length ? polygons.map((pol, index) => (
            <Tr key={index}>
              <Td>Polígono {index + 1}</Td>
              <Td>{pol?.length - 1 || "-"}</Td>
              <Td>
                <Button colorScheme="red" onClick={() => onDeletePolygon(index)}>Eliminar</Button>
              </Td>
            </Tr>
          )) : <Tr><Td>Aún no hay polígonos</Td></Tr>}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PolygonsTable;
