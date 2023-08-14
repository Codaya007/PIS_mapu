import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InterestingNodeTable from "../components/InterestingNodeTable";
import Loader from "../components/Loader";
import { deleteInterestingNodeById, masiveUploadInterestingNodes } from "../services/interestingNodeServices";
import { fetchInterestingNodes } from "../store/actions/interestingNodeActions";
import {
  getWithoutFetchSlice,
  setPage,
} from "../store/slices/interestingNodeSlice";
import { INTERESTING_NODES_MASIVE_UPLOAD } from "../constants";
import { useRef } from "react";
import { useState } from "react";

function InterestingNodes() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceInterestingNodes: interestingNodes,
    fetched,
    loading,
  } = useSelector((state) => state.interestingNodeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

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
        const { results, success } = await masiveUploadInterestingNodes(file);

        if (!success) {
          toast.error("No se pudieron cargar los puntos de interés, revise el archivo corregido", { position: "top-left" })

          return window.open(results, '_blank', 'noreferrer')
        }

        toast.success("Puntos de interés cargados exitosamente");
        dispatch(fetchInterestingNodes())
      }
    } catch (error) {
      const { success, results } = error.response?.data || {};

      toast.error("No se pudieron cargar los puntos de interés")
      if (results && !success)
        return window.open(results, '_blank', 'noreferrer')
    } finally {
      setUploading(false)
    }
  };


  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" color="blue.600" mb={4}>
        Puntos de interés UNL
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
          onClick={() => window.open(INTERESTING_NODES_MASIVE_UPLOAD, '_blank', 'noreferrer')}
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
          Crear punto
        </Button>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <>
          <InterestingNodeTable
            interestingNodes={interestingNodes}
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

export default InterestingNodes;
