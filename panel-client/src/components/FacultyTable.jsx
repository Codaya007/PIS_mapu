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

function FacultyTable({ faculties, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Descripción</Th>
          <Th>Decano</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {faculties.map((faculty) => (
          <Tr key={faculty._id}>
            <Td>{faculty.name}</Td>
            <Td>{faculty.description || "-"}</Td>
            <Td>{faculty.dean || "-"}</Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsHorizontalRounded />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem onClick={() => handleEdit(faculty._id)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(faculty._id)}>
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

export default FacultyTable;
