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
import { BiSolidCategory, BiSolidDoorOpen, BiSolidHome } from "react-icons/bi";
import { BsFillCalendarEventFill } from "react-icons/bs";
import {
  FaBuilding,
  FaCity,
  FaCommentDots,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";
import { FaCirclePlus, FaHashnode } from "react-icons/fa6";
import { FiLogIn, FiLogOut, FiMenu } from "react-icons/fi";
import { PiPolygonFill } from "react-icons/pi";
import { TbZoomReplace } from "react-icons/tb";
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
    <Box
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      width="70px"
      overflowY="auto"
      bg="gray.200"
      p="0"
    >
      <Box bg="blue.100" h="100vh">
        <Flex align="center" justify="center" p={3}>
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
                  <Icon as={BiSolidHome} mr={2} />
                  <Text>Inicio</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/faculty" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaUniversity} mr={2} />
                  <Text>Facultades</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/career" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaGraduationCap} mr={2} />
                  <Text>Carreras</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/block" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaBuilding} mr={2} />
                  <Text>Bloques</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/campus" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaCity} mr={2} />
                  <Text>Campus</Text>
                </Flex>
              </Link>

              {/* <Link as={NavLink} to="/sector" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={PiPolygonFill} mr={2} />
                  <Text>Sectores</Text>
                </Flex>
              </Link> */}
              <Link as={NavLink} to="/category" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={BiSolidCategory} mr={2} />
                  <Text>Categorías</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/user" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaUsers} mr={2} />
                  <Text>Usuarios</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/comment" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaCommentDots} mr={2} />
                  <Text>Comentarios</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/event" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={BsFillCalendarEventFill} mr={2} />
                  <Text>Eventos</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/interes-node" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaMapMarkerAlt} mr={2} />
                  <Text>Nodos de interés</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/route-node" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaHashnode} mr={2} />
                  <Text>Nodos de ruta</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/access-node" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={BiSolidDoorOpen} mr={2} />
                  <Text>Nodos de acceso</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/report" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={TbZoomReplace} mr={2} />
                  <Text>Puntos desactualizados</Text>
                </Flex>
              </Link>
              <Link as={NavLink} to="/lost-point" onClick={toggleMenu}>
                <Flex align="center">
                  <Icon as={FaCirclePlus} mr={2} />
                  <Text>Puntos perdidos</Text>
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
    </Box>
  );
}

export default SidebarMenu;
