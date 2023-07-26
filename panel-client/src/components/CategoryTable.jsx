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

function CategoryTable({ categories, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Descripción</Th>
        </Tr>
      </Thead>
      <Tbody>
        {categories.map((category) => (
          <Tr key={category._id}>
            <Td>{category.name || "-"}</Td>
            <Td>{category.description || "-"} </Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsHorizontalRounded />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem onClick={() => handleEdit(category._id)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(category._id)}>
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

export default CategoryTable;
