import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdjacencyTable from "../components/AdjacencyTable";
import AdjacencyToDeleteTable from "../components/AdjacencyToDeleteTable";
import MapContainer from "../components/MapContainer";
import NodeSelector from "../components/NodeSelector";
import { ROUTE_NODO_TYPE } from "../constants";
import {
  getAllCoordinates,
  updateNodeAdjacencies,
} from "../services/nodeServices";

function App() {
  const [nodesData, setNodesData] = useState([]);
  const [allNodes, setAllNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [adjacencies, setAdjacencies] = useState([]);
  const [allAdjacencies, setAllAdjacencies] = useState([]);
  const [filteredAllAdjacencies, setFilteredAllAdjacencies] = useState([]);
  const [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    if (selectedNode) {
      setAdjacencies(selectedNode.adjacencies);
    }
  }, [selectedNode]);

  const handleSelectNode = (node) => {
    setSelectedNode(node);
  };

  const handleDeleteAdjacency = (adjacencyToDelete) => {
    setAdjacencies((prevAdjacencies) =>
      prevAdjacencies.filter((adjacency) => adjacency !== adjacencyToDelete)
    );
    setToDelete([...toDelete, adjacencyToDelete]);
  };

  const handleAddAdjacency = (node) => {
    const newAdjacency = {
      destination: node._id,
      destinationName: node.name,
      destinationCoordinates: node.coordinates,
    };

    setAdjacencies([...adjacencies, newAdjacency]);
  };

  const handleRestoreAdjacency = (adj) => {
    setToDelete((prevAdjacencies) =>
      prevAdjacencies.filter(
        (adjacency) => adjacency.destination !== adj?.destination
      )
    );
    setAdjacencies([...adjacencies, adj]);
  };

  const handleResetNodes = () => {
    setSelectedNode(null);
    setAdjacencies([]);
    setToDelete([]);
  };

  const handleSaveAdjacencies = async () => {
    try {
      // Aquí debes enviar las adyacencias y los nodos seleccionados al servidor para guardarlos.
      const mapedToDelete = toDelete.map((adj) => adj?._id).filter((e) => e);

      await updateNodeAdjacencies(selectedNode._id, adjacencies, mapedToDelete);
      toast.info("Adyacencias actualizadas exitosamente");
    } catch (error) {
      console.log({ error });
      toast.error("No se pudieron actualizar todas las adyacencias");
    }
  };

  const getMarkers = async () => {
    try {
      const { results } = await getAllCoordinates({ adjacencies: true });

      results.map((node, index) => {
        if (node.type === ROUTE_NODO_TYPE) {
          node.name = `${node.name} ${index + 1}`;
        }
      });
      let allAdjacencies = [];
      results.map((res) => {
        res.adjacencies.map((adj) => {
          adj.origin = res._id;
          adj.startCoordinates = res.coordinates;

          allAdjacencies = allAdjacencies.concat(res.adjacencies || []);
        });
      });
      setAllAdjacencies(allAdjacencies);
      setAllNodes(results);
      setNodesData(results);
      // setNodesData(results.filter((node) => node.type !== ROUTE_NODO_TYPE));
    } catch (error) {
      toast.error("No se han podido obtener las coordenadas");
    }
  };

  useEffect(() => {
    getMarkers();
  }, []);

  useEffect(() => {
    if (selectedNode) {
      const filteredAllAdjacencies = allAdjacencies.filter(
        (adj) =>
          adj.origin !== selectedNode?._id &&
          adj.destination !== selectedNode?._id
      );
      setFilteredAllAdjacencies(filteredAllAdjacencies);
    } else {
      setFilteredAllAdjacencies(allAdjacencies);
    }
  }, [selectedNode, allAdjacencies]);

  return (
    <Box>
      <NodeSelector
        nodes={nodesData}
        onSelectNode={handleSelectNode}
        clearSelection={handleResetNodes}
      />

      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          margin={2}
          bgColor="blue.600"
          color="white"
          onClick={handleSaveAdjacencies}
        >
          Guardar adyacencias
        </Button>
      </Box>
      <Box display={"flex"} justifyContent={"space-evenly"}>
        <MapContainer
          height="65vh"
          nodes={allNodes}
          selectedNode={selectedNode}
          onSelectNode={handleSelectNode}
          handleAddAdjacency={handleAddAdjacency}
          adjacencies={adjacencies}
          allAdjacencies={filteredAllAdjacencies}
        />
        {selectedNode && (
          <Box>
            <Heading p={3} color={"blue.500"} fontSize={"md"}>
              Adyacencias del nodo {selectedNode.name}
            </Heading>
            <AdjacencyTable
              adjacencies={adjacencies}
              onDeleteAdjacency={handleDeleteAdjacency}
            />
            <br />
            {!!toDelete.length && (
              <>
                <Heading p={3} color={"blue.500"} fontSize={"md"}>
                  Adyacencias a eliminar
                </Heading>
                <AdjacencyToDeleteTable
                  adjacencies={toDelete}
                  onRestoreAdjacency={handleRestoreAdjacency}
                />
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
