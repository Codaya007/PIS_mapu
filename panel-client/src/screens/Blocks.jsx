import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BlockTable from "../components/BlockTable";
import Loader from "../components/Loader";
import { deleteBlockById } from "../services/blockServices";
import { fetchBlocks } from "../store/actions/blockActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/blockSlice";

function Blocks() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceBlocks: blocks,
    fetched,
    loading,
  } = useSelector((state) => state.blockReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) dispatch(fetchBlocks());
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchBlocks());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (blockId) => {
    navigate(`/edit-block/${blockId}`);
  };

  const handleDelete = async (blockId) => {
    try {
      await deleteBlockById(blockId);
      dispatch(fetchBlocks());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salió mal");
    }
  };

  const handleCreate = () => {
    navigate("/create-block");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" color="blue.600" mb={4}>
        Bloques/Edificios
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          bgColor="blue.600"
          color="white"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear Bloque
        </Button>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <>
          <BlockTable
            blocks={blocks}
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

export default Blocks;
