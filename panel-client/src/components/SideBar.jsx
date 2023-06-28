import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  Flex,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiHome, FiLogIn, FiLogOut, FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box bg="blue.500" h="100vh">
      <Flex align="center" justify="center" p={4}>
        <IconButton
          icon={<FiMenu />}
          aria-label="Abrir menú"
          variant="ghost"
          onClick={toggleMenu}
          display={!isOpen ? "block" : "none"}
        />
        {/* <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          Mapu
        </Link> */}
        <IconButton
          icon={<FiMenu />}
          aria-label="Cerrar menú"
          variant="ghost"
          onClick={toggleMenu}
          display={isOpen ? "block" : "none"}
        />
      </Flex>
      <Drawer placement="left" onClose={toggleMenu} isOpen={isOpen} size="sm">
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Text fontSize="lg" fontWeight="bold">
              Menú
            </Text>
          </DrawerHeader>
          <Stack spacing={4} p={4}>
            <Link as={NavLink} to="/" onClick={toggleMenu}>
              <Flex align="center">
                <Icon as={FiHome} mr={2} />
                <Text>Inicio</Text>
              </Flex>
            </Link>
            {user ? (
              <Button variant="link" onClick={handleLogout}>
                <Flex align="center">
                  <Icon as={FiLogOut} mr={2} />
                  <Text>Cerrar sesión</Text>
                </Flex>
              </Button>
            ) : (
              <Link as={NavLink} to="/login" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FiLogIn} mr={2} />
                  <Text>Iniciar sesión</Text>
                </Flex>
              </Link>
            )}
          </Stack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default SidebarMenu;
