import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RouteNodeTable from "../components/RouteNodeTable";
import { deleteRouteNodeById } from "../services/routeNodeServices";
import { fetchRouteNodes } from "../store/actions/routeNodeActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/routeNodeSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function RouteNodes() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceRouteNodes: routeNodes,
    fetched,
    loading,
  } = useSelector((state) => state.routeNodeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(routeNodes[0]);

  useEffect(() => {
    if (!fetched) dispatch(fetchRouteNodes());
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchRouteNodes());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (interestNodeId) => {
    navigate(`/edit-route-node/${interestNodeId}`);
  };

  const handleDelete = async (interestNodeId) => {
    try {
      await deleteRouteNodeById(interestNodeId);
      dispatch(fetchRouteNodes());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "No se pudo eliminar el punto de interés"
      );
    }
  };

  const handleCreate = () => {
    navigate("/create-route-node");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" mb={4}>
        Puntos/Nodos ruta
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
          <RouteNodeTable
            routeNodes={routeNodes}
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
        </>}
    </Box>
  );
}

export default RouteNodes;
