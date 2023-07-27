import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

function ReportTable({ reports, maskAsReviewed }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Tipo</Th>
          <Th>Coordenadas</Th>
          <Th>Nombre</Th>
          <Th>Reporte de usuario</Th>
          <Th>Usuario</Th>
          <Th>Revisado</Th>
          <Th>Marcar como</Th>
        </Tr>
      </Thead>
      <Tbody>
        {reports.map(
          ({ _id, lostPoint, node, subnode, type, user, comment, revised }) => {
            const pointName = lostPoint ? "-" : node?.name ?? subnode.name;
            let coordinates = "-";

            if (lostPoint) {
              coordinates = `${lostPoint.latitude}, ${lostPoint.longitude}`;
            } else if (node) {
              coordinates = `${node.latitude}, ${node.longitude}`;
            } else if (subnode) {
              coordinates = `${subnode.latitude}, ${subnode.longitude}`;
            } else {
              coordinates = "Coordenadas no disponibles";
            }

            return (
              <Tr key={_id}>
                <Td>{type}</Td>
                <Td>{coordinates}</Td>
                <Td>{pointName}</Td>
                <Td>{comment}</Td>
                <Td>{user?.email || "-"}</Td>
                <Td>{revised ? "Sí" : "No"}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    mb={4}
                    onClick={() => maskAsReviewed(_id, !revised)}
                  >
                    {revised ? "No revisado" : "Revisado"}
                  </Button>
                </Td>
              </Tr>
            );
          }
        )}
      </Tbody>
    </Table>
  );
}

export default ReportTable;
