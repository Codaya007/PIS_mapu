import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { getTimeAgo } from "../utils";

function CommentTable({
  comments,
  handleEdit,
  handleDelete,
  maskAsHide = () => {},
}) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Contenido</Th>
          <Th>Fecha creación</Th>
          <Th>Usuario</Th>
          <Th>Oculto</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {comments.map((comment) => (
          <Tr key={comment._id}>
            <Td>{comment.content || "-"}</Td>
            <Td>{getTimeAgo(comment.createdAt) || "-"} </Td>
            <Td>
              {comment.user
                ? `${comment.user.name} ${comment.user.lastname} (${comment.user.email})`.trim()
                : "-"}
            </Td>
            <Td>{comment.hide ? "Si" : "No"}</Td>
            <Td>
              <Button
                bgColor="blue.600"
                color="white"
                mb={4}
                onClick={() => maskAsHide(comment._id, !comment.hide)}
              >
                {comment.hide ? "Mostrar" : "Ocultar"}
              </Button>
              {/* <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BiDotsHorizontalRounded />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem
                    onClick={() => maskAsHide(comment._id, !comment.hide)}
                  ></MenuItem>
                  <MenuItem onClick={() => handleDelete(comment._id)}>
                    Eliminar
                  </MenuItem>
                </MenuList>
              </Menu> */}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default CommentTable;
