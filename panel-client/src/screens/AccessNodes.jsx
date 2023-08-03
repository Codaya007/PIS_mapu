import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccessNodeTable from "../components/AccessNodeTable";
import { deleteAccessNodeById } from "../services/accessNodeServices";
import { fetchAccessNodes } from "../store/actions/accessNodeActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/accessNodeSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function AccessNodes() {
  const {
    pages: totalPages,
    currentPage: page,
    currentSliceAccessNodes: accessNodes,
    fetched,
    loading,
  } = useSelector((state) => state.accessNodeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(accessNodes[0]);

  useEffect(() => {
    if (!fetched) dispatch(fetchAccessNodes());
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchAccessNodes());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (interestNodeId) => {
    navigate(`/edit-access-node/${interestNodeId}`);
  };

  const handleDelete = async (interestNodeId) => {
    try {
      await deleteAccessNodeById(interestNodeId);
      dispatch(fetchAccessNodes());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "No se pudo eliminar el punto de interés"
      );
    }
  };

  const handleCreate = () => {
    navigate("/create-access-node");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" mb={4}>
        Puntos de acceso a campus UNL
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          colorScheme="blue"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear punto
        </Button>
      </Box>

      {loading ? <Loader /> :
        <>
          <AccessNodeTable
            accessNodes={accessNodes}
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

export default AccessNodes;
