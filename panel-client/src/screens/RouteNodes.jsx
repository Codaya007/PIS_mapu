import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import RouteNodeTable from "../components/RouteNodeTable";
import { deleteRouteNodeById } from "../services/routeNodeServices";
import { fetchRouteNodes } from "../store/actions/routeNodeActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/routeNodeSlice";
import { SUBNODES_MASIVE_UPLOAD } from "../constants";
import { useRef } from "react";
import { useState } from "react";
import { masiveUploadSubnode } from "../services/nodeServices";

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
  const [uploading, setUploading] = useState(false);

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
        const { results, success } = await masiveUploadSubnode(file);

        if (!success) {
          toast.error("No se pudieron cargar los subnodos, revise el archivo corregido", { position: "top-left" })

          return window.open(results, '_blank', 'noreferrer')
        }

        toast.success("Subnodos cargados exitosamente");
      }
    } catch (error) {
      const { success, results } = error.response?.data || {};

      toast.error("No se pudieron cargar los subnodos")
      if (results && !success)
        return window.open(results, '_blank', 'noreferrer')
    } finally {
      setUploading(false)
    }
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" color="blue.600" mb={4}>
        Puntos/Nodos ruta
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
          {uploading ? "Cargando..." : "Carga masiva de subnodos"}
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
          onClick={() => window.open(SUBNODES_MASIVE_UPLOAD, '_blank', 'noreferrer')}
          m={4}
          alignSelf={"flex-end"}
        >
          Descargar plantilla subnodos
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
          <RouteNodeTable
            routeNodes={routeNodes}
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

export default RouteNodes;
