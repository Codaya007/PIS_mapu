import React from 'react'
import { Box, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Box>
  )
}