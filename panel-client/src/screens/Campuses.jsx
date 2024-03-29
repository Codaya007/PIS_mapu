import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CampusTable from "../components/CampusTable";
import Loader from "../components/Loader";
import { deleteCampusById } from "../services/campusServices";
import { fetchCampuses } from "../store/actions/campusActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/campusSlice";

function Campuses() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceCampus: campuses,
    fetched,
    loading,
  } = useSelector((state) => state.campusReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) {
      console.log(fetchCampuses());
      dispatch(fetchCampuses());
    }
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchCampuses());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (campusId) => {
    navigate(`/edit-campus/${campusId}`);
  };

  const handleDelete = async (campusId) => {
    try {
      await deleteCampusById(campusId);
      dispatch(fetchCampuses());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salio mal");
    }
  };

  const handleCreate = () => {
    navigate("/create-campus");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" color="blue.600" mb={4}>
        Campuses UNL
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          bgColor="blue.600"
          color="white"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear campus
        </Button>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CampusTable
            campuses={campuses}
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

export default Campuses;
