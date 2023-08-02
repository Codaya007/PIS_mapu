import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const AdjacencyToDeleteTable = ({ adjacencies, onRestoreAdjacency }) => {
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
          {adjacencies.map((adjacency, index) => (
            <Tr key={index}>
              <Td>{adjacency.destinationCoordinates?.join(", ")}</Td>
              <Td>{adjacency.destinationName || "-"}</Td>
              <Td>
                <Button colorScheme="green" onClick={() => onRestoreAdjacency(adjacency)}>Restaurar</Button>
              </Td>
            </Tr>))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AdjacencyToDeleteTable;
