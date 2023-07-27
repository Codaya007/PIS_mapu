import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InterestingNodeTable from "../components/InterestingNodeTable";
import { deleteInterestingNodeById } from "../services/interestingNodeServices";
import { fetchInterestingNodes } from "../store/actions/interestingNodeActions";
import {
  getWithoutFetchSlice,
  setPage,
} from "../store/slices/interestingNodeSlice";
import { toast } from "react-toastify";

function InterestingNodes() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceInterestingNodes: interestingNodes,
    fetched,
  } = useSelector((state) => state.interestingNodeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(interestingNodes[0]);

  useEffect(() => {
    if (!fetched) dispatch(fetchInterestingNodes());
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchInterestingNodes());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (interestNodeId) => {
    navigate(`/edit-interesting-node/${interestNodeId}`);
  };

  const handleDelete = async (interestNodeId) => {
    try {
      await deleteInterestingNodeById(interestNodeId);
      dispatch(fetchInterestingNodes());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "No se pudo eliminar el punto de interés"
      );
    }
  };

  const handleCreate = () => {
    navigate("/create-interesting-node");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" mb={4}>
        Puntos de interés UNL
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

      <InterestingNodeTable
        interestingNodes={interestingNodes}
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

export default InterestingNodes;
