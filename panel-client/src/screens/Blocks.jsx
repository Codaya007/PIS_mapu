import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BlockTable from "../components/BlockTable";
import Loader from "../components/Loader";
import { deleteBlockById, masiveUploadBlocks } from "../services/blockServices";
import { fetchBlocks } from "../store/actions/blockActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/blockSlice";
import { BLOCKS_MASIVE_UPLOAD } from "../constants";
import { useRef } from "react";
import { useState } from "react";

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
  const [uploading, setUploading] = useState(false);

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

  const fileInputRef = useRef(null);

  const handleMasiveUpload = async () => {
    // Abre el diálogo de selección de archivos
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files[0];
      if (file) {
        const { results, success } = await masiveUploadBlocks(file);

        if (!success) {
          toast.error("No se pudieron cargar los bloques, revise el archivo corregido", { position: "top-left" })

          return window.open(results, '_blank', 'noreferrer')
        }

        toast.success("Bloques cargados exitosamente");
        dispatch(fetchBlocks())
      }
    } catch (error) {
      const { success, results } = error.response?.data || {};

      toast.error("No se pudieron cargar los bloques")
      if (results && !success)
        return window.open(results, '_blank', 'noreferrer')
    } finally {
      setUploading(false)
    }
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
          onClick={uploading ?
            () => { toast.warning("Espere que se procese el archivo") } : handleMasiveUpload
          }
          m={4}
          alignSelf={"flex-end"}
        >
          {uploading ? "Cargando..." : "Carga masiva"}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          bgColor="blue.600"
          color="white"
          onClick={() => window.open(BLOCKS_MASIVE_UPLOAD, '_blank', 'noreferrer')}
          m={4}
          alignSelf={"flex-end"}
        >
          Descargar plantilla
        </Button>
        <Button
          bgColor="blue.600"
          color="white"
          onClick={handleCreate}
          m={4}
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
