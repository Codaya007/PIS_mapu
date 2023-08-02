import { Box, Button, Select } from "@chakra-ui/react";
import React, { useState } from "react";

const NodeSelector = ({ nodes, onSelectNode, clearSelection = () => { } }) => {
  const [selectedNodeId, setSelectedNodeId] = useState("");

  const handleSelectNode = (e) => {
    const nodeId = e.target.value;
    setSelectedNodeId(nodeId);
    const selectedNode = nodes.find((node) => node._id === nodeId);
    // console.log({ selectedNode });
    onSelectNode(selectedNode);
  };

  return (
    <Box margin={"auto"} p={4} display={"flex"} maxWidth={"500px"}>
      <Select onChange={handleSelectNode} value={selectedNodeId}>
        <option value="">Seleccione un nodo</option>
        {nodes.map((node) => (
          <option key={node._id} value={node._id}>
            {node.name}
          </option>
        ))}
      </Select>
      <Button colorScheme="gray"
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
