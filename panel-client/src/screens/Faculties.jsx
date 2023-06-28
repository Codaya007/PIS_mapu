import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FacultyTable from "../components/FacultyTable";
import { fetchFaculties } from "../store/actions/facultyActions";
import { setPage } from "../store/slices/facultySlice";

function Faculties() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceFaculties: faculties,
  } = useSelector((state) => state.facultyReducer);
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(fetchFaculties(skip, limit));
  }, [page]);

  const handlePageChange = (newPage) => {
    dispacth(setPage(newPage));
  };

  const handleEdit = (facultyId) => {
    // Lógica para editar una facultad
    console.log(`Editar facultad con ID: ${facultyId}`);
  };

  const handleDelete = (facultyId) => {
    // Lógica para eliminar una facultad
    console.log(`Eliminar facultad con ID: ${facultyId}`);
  };

  const handleCreate = () => {
    // Lógica para crear una nueva facultad
    console.log("Crear nueva facultad");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" mb={4}>
        Facultades
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          colorScheme="blue"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear facultad
        </Button>
      </Box>

      <FacultyTable
        faculties={faculties}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Box mt={4}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            colorScheme={index + 1 === page ? "blue" : "gray"}
            size="sm"
            mr={2}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Faculties;
