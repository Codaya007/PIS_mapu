import { Box, Spinner } from 'native-base'
import React from 'react'

export default function Loader() {
  return (
    <Box
      margin="auto"
      marginY="5"
      flexDirection="column" // Alineación vertical
    >
      <Spinner size="lg" accessibilityLabel="Loading" />
    </Box>
  )
}