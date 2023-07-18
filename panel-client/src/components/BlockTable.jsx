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
import { fetchFacultyById } from "../services/facultyServices";

function FacultyTable({ blocks, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Número</Th>
          <Th>Disponible</Th>
          <Th>Facultad</Th>
        </Tr>
      </Thead>
      <Tbody>
        {blocks.map((block) => (
          <Tr key={block._id}>
            <Td>{block.number}</Td>
            <Td>{block.avaible ? "Disponible" : "No disponible"}</Td>
            <Td>{block.faculty}</Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsHorizontalRounded />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem onClick={() => handleEdit(block._id)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(block._id)}>
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
