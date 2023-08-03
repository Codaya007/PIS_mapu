import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loader() {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.800"
        size="xl"
      />
    </Box>
  );
}
