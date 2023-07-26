import {
  Box,
  Flex,
  IconButton,
  Image,
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
import { DEFAULT_IMG } from "../constants";

function AccessNodeTable({ accessNodes, handleEdit, handleDelete }) {
  return (
    <Table p={3} variant="simple">
      <Thead>
        <Tr>
          <Th>Imagen</Th>
          <Th>Coordenadas</Th>
          <Th>Título</Th>
          <Th>Descripción</Th>
          <Th>Campus</Th>
          <Th>Categoría</Th>
          <Th>Activo</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {accessNodes?.map(
          ({ _id, detail, campus, category, coordinate, available }) => (
            <Tr key={_id}>
              <Td boxSize={"150px"}>
                <Image src={detail?.img || DEFAULT_IMG} alt={detail?.name} />
              </Td>
              <Td>{coordinate?.join(",")}</Td>
              <Td>{detail?.title}</Td>
              <Td>{detail.description || "-"}</Td>
              <Td>
                ({campus?.symbol}) {campus?.name}
              </Td>
              <Td>{category?.name || "-"}</Td>
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

export default AccessNodeTable;
