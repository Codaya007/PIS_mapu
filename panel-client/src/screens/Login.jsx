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
import { EMAIL_REGEX } from "../constants";
import { loginUser } from "../store/actions/authActions";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación
    // utilizando los valores de email y password
    const errors = validateForm();

    if (!errors.email && !errors.password) {
      dispatch(loginUser(email, password));
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
            <Button type="submit" colorScheme="blue">
              Iniciar sesión
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;
