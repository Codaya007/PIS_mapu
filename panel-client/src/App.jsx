import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SidebarMenu from "./components/SideBar";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Home from "./screens/Home";
import LoginForm from "./screens/Login";
import NotFound from "./screens/NotFound";
import { login } from "./store/slices/authSlice";

function App() {
  const location = useLocation();
  const { getItem } = useLocalStorage();
  // const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shouldShowSidebar = location.pathname !== "/login";

  useEffect(() => {
    const userSaved = getItem("user");

    if (userSaved) {
      dispatch(login({ user: userSaved }));
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Flex>
        {shouldShowSidebar && <SidebarMenu />}
        <Box flex="1" p={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
      </Flex>
    </>
  );
}

export default App;
