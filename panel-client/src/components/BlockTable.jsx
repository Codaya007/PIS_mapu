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
          <Th>Número de bloque</Th>
          <Th>Disponible</Th>
          <Th>Campus</Th>
          <Th>Facultad</Th>
          <Th>Coordenadas</Th>
          <Th>Descripción</Th>
          <Th>Subnodos</Th>
        </Tr>
      </Thead>
      <Tbody>
        {blocks.map((block) => (
          <Tr key={block._id}>
            <Td>{block.number}</Td>
            <Td>{block.available ? "Disponible" : "No disponible"}</Td>
            <Td>{block.campus?.name}</Td>
            <Td>{block.faculty?.name}</Td>
            <Td>
              {block.node?.latitude}, {block.node.longitude}
            </Td>
            <Td>{block.node?.detail?.description || "-"}</Td>
            <Td>{block.node?.detail?.subnodes?.length}</Td>
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
