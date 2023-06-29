import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import SidebarMenu from "./components/SideBar";
import Dashboard from "./screens/Dashboard";
import Faculties from "./screens/Faculties";
import FacultyForm from "./screens/FacultyForm";
import LoginForm from "./screens/Login";
import NotFound from "./screens/NotFound";
import Profile from "./screens/Profile";
import { login } from "./store/slices/authSlice";

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
            <Route path="/faculty" element={<Faculties />} />
            <Route path="/create-faculty" element={<FacultyForm />} />
            <Route path="/edit-faculty/:id" element={<FacultyForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
      </Flex>
    </>
  );
}

export default App;
