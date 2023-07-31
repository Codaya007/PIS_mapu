import {
  Avatar,
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

function UserTable({ users, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Avatar</Th>
          <Th>Nombre</Th>
          <Th>Apellido</Th>
          <Th>Email</Th>
          <Th>Rol</Th>
          <Th>Bloqueado</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user._id}>
            <Td>
              <Avatar name={user.name} src={user.avatar} />
            </Td>
            <Td>{user.name || "-"}</Td>
            <Td>{user.lastname || "-"} </Td>
            <Td>{user.email || "-"}</Td>
            <Td>{user.role?.name || "-"}</Td>
            <Td>{user.bloqued ? "Si" : "No"}</Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsHorizontalRounded />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem onClick={() => handleEdit(user._id)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(user._id)}>
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

export default UserTable;
