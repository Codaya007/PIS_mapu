import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryTable from "../components/CategoryTable";
import Loader from "../components/Loader";
import { deleteCategoryById } from "../services/categoryServices";
import { fetchCategories } from "../store/actions/categoryActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/categorySlice";

function Categories() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceCategory: categories,
    fetched,
    loading,
  } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchCategories());
    }
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchCategories());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (categoryId) => {
    navigate(`/edit-category/${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategoryById(categoryId);
      dispatch(fetchCategories());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salio mal");
    }
  };

  const handleCreate = () => {
    navigate("/create-category");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" color="blue.600" mb={4}>
        Categorías de puntos de interés
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          bgColor="blue.600"
          color="white"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear categoría
        </Button>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <>
          <CategoryTable
            categories={categories}
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

export default Categories;
