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
import { getTimeAgo } from "../utils";

function EventTable({ events, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Titulo</Th>
          <Th>Descripción</Th>
          <Th>Precio</Th>
          <Th>Desde</Th>
          <Th>Hasta</Th>
        </Tr>
      </Thead>
      <Tbody>
        {events.map((event) => (
          <Tr key={event._id}>
            <Td>{event.name || "-"}</Td>
            <Td>{event.description || "-"}</Td>
            <Td>{event.price ? `$${event.price}` : "Evento gratuito"}</Td>
            <Td>{new Date(event.sinceDate).toLocaleString()}</Td>
            <Td>{new Date(event.untilDate).toLocaleString()}</Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsHorizontalRounded />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem onClick={() => handleEdit(event._id)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(event._id)}>
                    Eliminar
                  </MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default EventTable;
