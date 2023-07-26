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

function CommentTable({ comments, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Contenido</Th>
          <Th>Fecha creación</Th>
          <Th>Usuario</Th>
          <Th>Oculto</Th>
        </Tr>
      </Thead>
      <Tbody>
        {comments.map((comment) => (
          <Tr key={comment._id}>
            <Td>{comment.content || "-"}</Td>
            <Td>{getTimeAgo(comment.createdAt) || "-"} </Td>
            <Td>{comment.user || "-"}</Td>
            <Td>{comment.hide ? "Si" : "No"}</Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsHorizontalRounded />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem onClick={() => handleEdit(comment._id)}>
                    Editar
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(comment._id)}>
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

export default CommentTable;
