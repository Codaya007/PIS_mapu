import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={4}
      px={8}
      bg="blue.800"
      color="white"
    >
      <Link to={"/"}>
        <Text fontSize="xl" fontWeight="bold">
          Mapu
        </Text>
      </Link>
      {user && (
        <Box display="flex" alignItems="center">
          <Avatar name={user.name} src={user.avatar} size="sm" mr={2} />
          <Link to={"/profile"}>
            <Text>
              {user.name} {user.lastname}
            </Text>
          </Link>
        </Box>
      )}
    </Flex>
  );
}

export default Header;
