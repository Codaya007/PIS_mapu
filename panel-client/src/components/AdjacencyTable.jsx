import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const AdjacencyTable = ({ adjacencies, onDeleteAdjacency }) => {
  return (
    <TableContainer>

      <Table maxW={"500px"} variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Coordenadas</Th>
            <Th>Nombre</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {adjacencies?.length ? adjacencies.map((adjacency, index) => (
            <Tr key={index}>
              <Td>{adjacency.destinationCoordinates?.join(", ")}</Td>
              <Td>{adjacency.destinationName || "-"}</Td>
              <Td>
                <Button colorScheme="red" onClick={() => onDeleteAdjacency(adjacency)}>Eliminar</Button>
              </Td>
            </Tr>
          )) : <Tr><Td>Aún no hay adyacencias</Td></Tr>}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AdjacencyTable;
