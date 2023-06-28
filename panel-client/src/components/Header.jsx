import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={4}
      px={8}
      bg="blue.500"
      color="white"
    >
      <Text fontSize="xl" fontWeight="bold">
        Mapu
      </Text>
      {user && (
        <Box display="flex" alignItems="center">
          <Avatar name={user.name} src={user.avatar} size="sm" mr={2} />
          <Text>
            {user.name} {user.lastname}
          </Text>
        </Box>
      )}
    </Flex>
  );
}

export default Header;
