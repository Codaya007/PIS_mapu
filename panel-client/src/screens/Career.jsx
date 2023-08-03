import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCareerById } from "../services/careerServices";
import { getWithoutFetchSlice, setPage } from "../store/slices/careerSlice";
import { fetchCareers } from "../store/actions/careerActions";
import { toast } from "react-toastify";
import { Box, Button, Heading } from "@chakra-ui/react";
import CareerTable from "../components/CareerTable";
import Loader from "../components/Loader";

function Careers() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceCareer: careers,
    fetched,
    loading,
  } = useSelector((state) => state.careerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) {
      console.log(fetchCareers());
      dispatch(fetchCareers());
    }
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchCareers());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (careerId) => {
    navigate(`/edit-career/${careerId}`);
  };

  const handleDelete = async (careerId) => {
    try {
      await deleteCareerById(careerId);
      dispatch(fetchCareers());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salio mal");
    }
  };

  const handleCreate = () => {
    navigate("/create-career");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" mb={4}>
        Carreras UNL
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          colorScheme="blue"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear carrera
        </Button>
      </Box>
      {loading ? <Loader /> :
        <>
          <CareerTable
            careers={careers}
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
        </>
      }
    </Box>
  );
}

export default Careers;
