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
            <Route path="/faculty" element={<Faculties />} />
            <Route path="/create-faculty" element={<FacultyForm />} />
            <Route path="/edit-faculty/:id" element={<FacultyForm />} />
            <Route path="/campus" element={< Campuses />} />
            <Route path="/edit-campus/:id" element={<CapusesForm />}/>
            <Route path="/create-campus" element={< CapusesForm/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile/:id" element={<ProfileEdit />} />
            <Route path="/edit-pasword-profile/:id" element={<ProfileChangePassword />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
      </Flex>
    </>
  );
}

export default App;
