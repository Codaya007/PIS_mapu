import React, { useEffect, useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import MapContainer from "../components/MapContainer";
import NodeSelector from "../components/NodeSelector";
import AdjacencyTable from "../components/AdjacencyTable";
import { getAllCoordinates, updateNodeAdjacencies } from "../services/nodeServices";
import { ROUTE_NODO_TYPE } from "../constants";
import { toast } from "react-toastify";
import AdjacencyToDeleteTable from "../components/AdjacencyToDeleteTable";

function App() {
  const [nodesData, setNodesData] = useState([]);
  const [allNodes, setAllNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [adjacencies, setAdjacencies] = useState([]);
  const [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    if (selectedNode) {
      setAdjacencies(selectedNode.adjacencies)
    }
  }, [selectedNode]);

  const handleSelectNode = (node) => {
    setSelectedNode(node);
  };

  const handleDeleteAdjacency = (adjacencyToDelete) => {
    setAdjacencies((prevAdjacencies) =>
      prevAdjacencies.filter((adjacency) => adjacency !== adjacencyToDelete)
    );
    setToDelete([...toDelete, adjacencyToDelete])
  };

  const handleAddAdjacency = (node) => {
    const newAdjacency = { destination: node._id, destinationName: node.name, destinationCoordinates: node.coordinates }

    setAdjacencies([...adjacencies, newAdjacency]);
  };

  const handleRestoreAdjacency = (adj) => {
    setToDelete((prevAdjacencies) =>
      prevAdjacencies.filter((adjacency) => adjacency.destination !== adj?.destination)
    );
    setAdjacencies([...adjacencies, adj])
  };

  const handleResetNodes = () => {
    setSelectedNode(null)
    setAdjacencies([])
    setToDelete([])
  };

  const handleSaveAdjacencies = async () => {
    try {
      // Aquí debes enviar las adyacencias y los nodos seleccionados al servidor para guardarlos.
      const mapedToDelete = toDelete.map(adj => adj?._id).filter(e => e)

      await updateNodeAdjacencies(selectedNode._id, adjacencies, mapedToDelete)
      toast.info("Adyacencias actualizadas exitosamente")
    } catch (error) {
      console.log({ error });
      toast.error("No se pudieron actualizar las adyacencias :(")
    }
  };

  useEffect(() => {
    const getMarkers = async () => {
      try {
        const { results } = await getAllCoordinates({ adjacencies: true });

        setAllNodes(results)
        setNodesData(results.filter(node => node.type !== ROUTE_NODO_TYPE));
      } catch (error) {
        toast.error("No se han podido obtener las coordenadas");
      }
    };
    getMarkers();
  }, []);

  return (
    <Box>
      <NodeSelector nodes={nodesData} onSelectNode={handleSelectNode} clearSelection={handleResetNodes} />

      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button margin={2} colorScheme="blue" onClick={handleSaveAdjacencies}>Guardar adyacencias</Button>
      </Box>

      <Box display={"flex"} margin={4} justifyContent={"space-evenly"}>
        <MapContainer height="65vh" nodes={allNodes} selectedNode={selectedNode} onSelectNode={handleSelectNode} handleAddAdjacency={handleAddAdjacency} adjacencies={adjacencies} />
        {selectedNode && (
          <Box>
            <Heading p={3} color={"blue.400"} fontSize={"md"}>Adyacencias del nodo {selectedNode.name}</Heading>
            <AdjacencyTable adjacencies={adjacencies} onDeleteAdjacency={handleDeleteAdjacency} />
            <br />
            {!!toDelete.length && <>
              <Heading p={3} color={"blue.400"} fontSize={"md"}>Adyacencias a eliminar</Heading>
              <AdjacencyToDeleteTable adjacencies={toDelete} onRestoreAdjacency={handleRestoreAdjacency} />
            </>
            }
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
