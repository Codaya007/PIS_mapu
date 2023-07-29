import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import SidebarMenu from "./components/SideBar";
import Dashboard from "./screens/Dashboard";
import Faculties from "./screens/Faculties";
import FacultyForm from "./screens/FacultyForm";
import Campuses from "./screens/Campuses";
import Blocks from "./screens/Blocks";
import BlockForm from "./screens/BlockForm";
import LoginForm from "./screens/Login";
import NotFound from "./screens/NotFound";
import Profile from "./screens/Profile";
import { login } from "./store/slices/authSlice";
import CapusesForm from "./screens/CampusForm";
import ProfileEdit from "./screens/ProfileEdit";
import ProfileChangePassword from "./screens/ProfileChangePassword";
import Categories from "./screens/Categories";
import Careers from "./screens/Career";
import Users from "./screens/Users";
import Comments from "./screens/Comments";
import Events from "./screens/Events";
import InterestingNodes from "./screens/InterestingNodes";
import InterestingNodesForm from "./screens/InterestingNodesForm";
import AccessNodes from "./screens/AccessNodes";
import AccessNodesForm from "./screens/AccessNodesForm";
import RouteNodes from "./screens/RouteNodes";
import RouteNodesForm from "./screens/RouteNodesForm";
import EventsForm from "./screens/EventForm";
import CareerForm from "./screens/CareerForm";
// import Reports from "./screens/Reports";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shouldShowSidebar = location.pathname !== "/login";

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch(login({ user: JSON.parse(user), token: JSON.parse(token) }));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Flex height={"100%"}>
        {shouldShowSidebar && <SidebarMenu />}
        <Box flex="1" p={0} marginLeft={"70px"} height={"100vh"}>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/block" element={<Blocks />} />
            <Route path="/create-block" element={<BlockForm />} />
            <Route path="/edit-block/:id" element={<BlockForm />} />
            {/* Facultad */}
            <Route path="/faculty" element={<Faculties />} />
            <Route path="/create-faculty" element={<FacultyForm />} />
            <Route path="/edit-faculty/:id" element={<FacultyForm />} />
            {/* Campus */}
            <Route path="/campus" element={<Campuses />} />
            <Route path="/edit-campus/:id" element={<CapusesForm />} />
            <Route path="/create-campus" element={<CapusesForm />} />
            {/* Categoría */}
            <Route path="/category" element={<Categories />} />
            <Route path="/edit-category/:id" element={<Categories />} />
            <Route path="/create-category" element={<Categories />} />
            {/* Carrera */}
            <Route path="/career" element={<Careers />} />
            <Route path="/edit-career/:id" element={<CareerForm />} />
            <Route path="/create-career" element={<CareerForm />} />
            {/* Evento */}
            <Route path="/event" element={<Events />} />
            <Route path="/edit-event/:id" element={<EventsForm />} />
            <Route path="/create-event" element={<EventsForm />} />
            {/* Puntos de interés */}
            <Route path="/interesting-node" element={<InterestingNodes />} />
            <Route
              path="/edit-interesting-node/:id"
              element={<InterestingNodes />}
            />
            <Route
              path="/create-interesting-node"
              element={<InterestingNodesForm />}
            />
            {/* Puntos de acceso */}
            <Route path="/access-node" element={<AccessNodes />} />
            <Route path="/edit-access-node/:id" element={<AccessNodes />} />
            <Route path="/create-access-node" element={<AccessNodesForm />} />
            {/* Puntos de ruta */}
            <Route path="/route-node" element={<RouteNodes />} />
            <Route path="/edit-route-node/:id" element={<RouteNodes />} />
            <Route path="/create-route-node" element={<RouteNodesForm />} />
            {/* Usuarios */}
            <Route path="/user" element={<Users />} />
            {/* Reportes */}
            {/* <Route path="/report" element={<Reports />} /> */}
            {/* Commentarios */}
            <Route path="/comment" element={<Comments />} />
            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile/:id" element={<ProfileEdit />} />
            <Route
              path="/edit-pasword-profile/:id"
              element={<ProfileChangePassword />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
      </Flex>
    </>
  );
}

export default App;
