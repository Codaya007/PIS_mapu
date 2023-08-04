import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EMAIL_REGEX } from "../constants";
import { loginUser } from "../services/authServices";
import { login } from "../store/slices/authSlice";

function LoginForm() {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!email) errors.email = "El campo email es requerido";
    else if (!EMAIL_REGEX.test(email)) errors.email = "Ingrese un email válido";
    if (!password) errors.password = "El campo password es requerido";

    setErrors(errors);

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const errors = validateForm();

      if (!errors.email && !errors.password) {
        const data = await loginUser(email, password);

        dispatch(login(data));
      } else {
        toast.warning(errors.email || errors.password);
      }
    } catch (error) {
      // console.log({ error });
      toast.error(error.response?.data?.message || "No se pudo iniciar sesión");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
    >
      <Box width="400px">
        {/* <Heading p={4} color={"blue.500"}>Iniciar sesión</Heading> */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <Button type="submit" bgColor="blue.600" color="white">
              Iniciar sesión
            </Button>
          </Stack>
          <Box
            color={"blue.500"}
            p={4}
            fontSize={"sm"}
            style={{ textDecoration: "underline" }}
          >
            <span
              onClick={() => navigate("/forgot-password")}
              style={{ cursor: "pointer" }}
            >
              ¿Olvidaste la contraseña?
            </span>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;
