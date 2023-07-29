import {
  Box,
  Card,
  VStack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putProfile } from "../services/authServices";
import { fetchProfile } from "../store/actions/authActions";
import { toast } from "react-toastify";

const initialState = {
  newPassword: "",
  rewriteNewPassword: "",
};

const ProfileChangePassword = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [passwordForm, setPasswordForm] = useState(initialState);
  const { avatar } = user || {};
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);


  const handleEdit = async (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
    console.log(name + value);
  };
  const saveChange = async () => {
    console.log("SaveChanges");
    if(passwordForm.newPassword == passwordForm.rewriteNewPassword){
      if(passwordForm.newPassword.length < 8){
        toast.error("La contraseña debe tener mas de 8 caracteres");
        return ;
      }
    }
    if(passwordForm.newPassword != passwordForm.rewriteNewPassword){
      toast.error("Las contreseñas no son iguales");
      return;
    }
    try {
      await putProfile({ password: passwordForm.newPassword });
      dispatch(fetchProfile());
      toast.success("Contraseña modificada");
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salió mal");
    }
  };

  return (
    <Box maxWidth="500px" mx="auto" p="4">
      <Card p={5} bgColor={"#dcdcdc"}>
        <VStack spacing="4" alignItems="start">
          <Avatar size="xl" src={avatar} alt="Avatar" />
          <FormControl isRequired>
            <FormLabel>Nueva Contraseña</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                name="newPassword"
                onChange={handleEdit}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl> 
            <FormLabel>Escribir nuevamente la contraseña:</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show2 ? "text" : "password"}
                name="rewriteNewPassword"
                placeholder="Nueva contraseña"
                onChange={handleEdit}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick2}>
                  {show2 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button
              colorScheme="blue"
              onClick={saveChange}
              mb={4}
              alignSelf={"flex-end"}
            >
              Guardar Cambios
            </Button>
          </Box>
        </VStack>
      </Card>
    </Box>
  );
};

export default ProfileChangePassword;
