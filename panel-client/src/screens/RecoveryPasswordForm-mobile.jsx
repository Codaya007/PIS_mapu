import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { recoverPassword } from "../services/authServices";

const initialState = {
  newPassword: "",
  newPasswordAgain: "",
  token: "",
};

const RecoveryPasswordForm = () => {
  const [recoveryPassword, setRecoverPassword] = useState(initialState);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { tokenQuery } = useParams();

  const validateData = () => {
    setRecoverPassword({ ...recoveryPassword, token: tokenQuery });
    if(recoveryPassword.newPassword != recoveryPassword.newPasswordAgain) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecoverPassword({ ...recoveryPassword, [name]: value });
  };

  useEffect(() => {
    const setToken = () => {
      setRecoverPassword({...recoveryPassword, token: tokenQuery});
    };
    
    setToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateData();
    if (valid) {
      try {
        if (recoveryPassword.token) {
          await recoverPassword(recoveryPassword);
          navigate("/login");
          toast.success("Actualización exitosa");
        } else {
          toast.error("Token invalido, asegurese de copiar correctamente el link enviado por correo");
        }
  
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }    
  };

  return (
    <Center height="90vh">
      <Box
        width="500px"
        p="8"
        bg="white"
        boxShadow="md"
        borderRadius="md"
        borderColor="gray.300"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl>
              <FormLabel htmlFor="newPassword">Nueva contraseña</FormLabel>
              <Input
                type="text"
                token="newPassword"
                name="newPassword"
                value={recoveryPassword.newPassword}
                onChange={handleChange}
                required
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="newPasswordAgain">Repita la contraseña</FormLabel>
              <Input
                type="text"
                token="newPasswordAgain"
                name="newPasswordAgain"
                value={recoveryPassword.newPasswordAgain}
                onChange={handleChange}
                borderColor="gray.500"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Guardar cambios
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default RecoveryPasswordForm;