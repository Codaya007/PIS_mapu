import{
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
import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function CampusTable( {campuses, handleEdit, handleDelete} ){
    return(
        <Table p={3} variant="simple">
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th>Descripción</Th>
                    <Th>Dirección</Th>
                    <Th>Puntos de acceso</Th>
                </Tr>
            </Thead>
            <Tbody>
                {campuses.map((campus) => (
                    <Tr key={campus._id}>
                        <Td>{campus.name || "-"}</Td>
                        <Td>{campus.description || "-"} </Td>
                        <Td>{campus.address || "-"}</Td>
                        <Td>{campus.accessPoints.join("   -   ") || "-"}</Td>
                        <Td>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    icon={< BiDotsHorizontalRounded />}
                                    variant="ghost"
                                    size="sm"
                                />
                                <MenuList>
                                    <MenuItem onClick={ () => handleEdit(campus._id)}>
                                        Editar
                                    </MenuItem>
                                    <MenuItem onClick={() => handleDelete(campus._id)}>
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

export default CampusTable;