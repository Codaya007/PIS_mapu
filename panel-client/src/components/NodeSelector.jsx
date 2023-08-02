import { Box, Button, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { getAllNodeTypes } from "../services/nodeServices";

const filterInitialState = "all";
const NodeSelector = ({ nodes = [], onSelectNode, clearSelection = () => { } }) => {
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const [filter, setFilter] = useState(filterInitialState);
  const [nodeTypes, setNodeTypes] = useState([]);
  const [nodesToShow, setNodesToShow] = useState([]);

  const handleSelectNode = (e) => {
    const nodeId = e.target.value;
    setSelectedNodeId(nodeId);
    const selectedNode = nodes.find((node) => node._id === nodeId);
    onSelectNode(selectedNode);
  };

  useEffect(() => {
    if (filter === filterInitialState) {
      setNodesToShow(nodes)
    } else if (nodeTypes.length) {
      const type = nodeTypes.find(type => type._id === filter)

      const nodesByType = nodes.filter(node => node.type === type?.name);
      setNodesToShow(nodesByType)
    }
  }, [nodes, filter]);

  useEffect(() => {
    const getNodeTypes = async () => {
      const { results } = await getAllNodeTypes();

      setNodeTypes(results);
    }

    getNodeTypes();
  }, []);

  return (
    <Box margin={"auto"} p={4} display={"flex"}>
      <Select onChange={e => setFilter(e.target.value)} value={filter}>
        <option value={filterInitialState}>Todos los nodos</option>
        {nodeTypes.map((type) => (
          <option key={type._id} value={type._id}>
            Nodos tipo {type.name}
          </option>
        ))}
      </Select>
      <Select onChange={handleSelectNode} value={selectedNodeId}>
        <option value={""}>Seleccione un nodo</option>
        {nodesToShow.map((node) => (
          <option key={node._id} value={node._id}>
            {node.name}
          </option>
        ))}
      </Select>
      <Button minW={"150px"} colorScheme="gray"
        disabled={!selectedNodeId}
        onClick={() => {
          setSelectedNodeId("");
          clearSelection()
        }}>
        Limpiar selección
      </Button>
    </Box>
  );
};

export default NodeSelector;
