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

    const getFacultyById = async (facultyId) => {
        return await fetchFacultyById(facultyId);
    };

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
                        <Td>{block.avaible || "-"}</Td>
                        <Td>{getFacultyById(block.faculty).name || "-"}</Td> {/*{//TODO: DEBERIA HABER UN AWAIT??}*/}
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
