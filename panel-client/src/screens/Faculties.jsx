import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FacultyTable from "../components/FacultyTable";
import Loader from "../components/Loader";
import { deleteFacultyById } from "../services/facultyServices";
import { fetchFaculties } from "../store/actions/facultyActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/facultySlice";

function Faculties() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceFaculties: faculties,
    fetched,
    loading = true,
  } = useSelector((state) => state.facultyReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) dispatch(fetchFaculties());
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchFaculties());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (facultyId) => {
    navigate(`/edit-faculty/${facultyId}`);
  };

  const handleDelete = async (facultyId) => {
    try {
      await deleteFacultyById(facultyId);
      dispatch(fetchFaculties());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salió mal");
    }
  };

  const handleCreate = () => {
    navigate("/create-faculty");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" color="blue.600" mb={4}>
        Facultades UNL
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          bgColor="blue.600"
          color="white"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear facultad
        </Button>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <>
          <FacultyTable
            faculties={faculties}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <Box mt={4}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                bgColor={index + 1 === page ? "blue.700" : "gray.100"}
                color={index + 1 === page ? "white" : "black"}
                size="sm"
                mr={2}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default Faculties;
