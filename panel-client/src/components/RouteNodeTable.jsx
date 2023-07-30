import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function RouteNodeTable({ routeNodes, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Coordenadas</Th>
          <Th>Campus</Th>
          <Th>Activo</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {routeNodes?.map(
          ({ _id, detail, campus, category, coordinate, available }) => (
            <Tr key={_id}>
              <Td>{coordinate?.join(",")}</Td>
              <Td>
                ({campus?.symbol}) {campus?.name}
              </Td>
              <Td>{available ? "Sí" : "No"}</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<BiDotsHorizontalRounded />}
                    variant="ghost"
                    size="sm"
                  />
                  <MenuList>
                    <MenuItem onClick={() => handleEdit(_id)}>Editar</MenuItem>
                    <MenuItem onClick={() => handleDelete(_id)}>
                      Eliminar
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          )
        )}
      </Tbody>
    </Table>
  );
}

export default RouteNodeTable;
