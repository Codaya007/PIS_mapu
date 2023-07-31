import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../constants";
import { loginUser } from "../store/actions/authActions";
import { forgotPassword } from "../services/authServices";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!email) errors.email = "El campo email es requerido";
    else if (!EMAIL_REGEX.test(email)) errors.email = "Ingrese un email válido";

    setErrors(errors)
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (!errors.email ) {
      try {
        await forgotPassword(email)
  
        return toast.info("Si el correo ingresado pertenece a una cuenta registrada, le enviaremos un email")
      } catch (error) {
        toast.error(error.response?.data?.message || "No se pudo enviar el email de restablecimiento")        
      }
    }else    toast.warning(errors.email)
  };

  return (
    <Box
    margin={"auto"}
    display={"flex"}
      justifyContent="center"
      alignItems="center"
    >
      <Box maxWidth="420px">
      <Heading p={4} color={"blue.400"}>¿Olvidaste tu contraseña?</Heading>
      <Box>
        No te preocupes! Ingresa el email asociado a tu cuenta y te
            enviaremos un link para resetear tu contraseña.
      </Box>
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
            <Button type="submit" colorScheme="blue">
              Enviar email
            </Button>
          </Stack>
            <Box color={"blue.400"} p={4} fontSize={"sm"} style={{textDecoration: "underline"}}><span onClick={() => navigate("/login")} style={{cursor: "pointer"}}>Login</span></Box>
        </form>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
