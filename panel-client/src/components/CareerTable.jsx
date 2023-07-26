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

function CareerTable({ careers, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Descripción</Th>
          <Th>Gestor</Th>
        </Tr>
      </Thead>
      <Tbody>
        {careers.map((career) => (
          <Tr key={career._id}>
            <Td>{career.name || "-"}</Td>
            <Td>{career.description || "-"} </Td>
            <Td>{career.manager || "-"} </Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsHorizontalRounded />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem onClick={() => handleEdit(career._id)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(career._id)}>
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

export default CareerTable;
