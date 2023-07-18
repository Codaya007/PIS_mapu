import {
  Box,
  Card,
  VStack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import {  useSelector } from "react-redux";

const initialState = {
  password: "",
  newPassword: "",
  rewriteNewPassword: ""
};

const ProfileChangePassword = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [passwordForm, setPasswordForm] = useState(initialState);
  const { avatar } = user || {};

  const handleEdit = async (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };
  const saveChange = async () => {
    console.log("SaveChanges");
    
    // try {
    //   await putProfile({ password: passwordForm.newPassword });
    //   dispatch(fetchProfile());
    // } catch (error) {
    //   toast.error(error.response?.data?.message || "Algo salió mal");
    // }
  };

  return (
    <Box maxWidth="500px" mx="auto" p="4">
      <Card p={5} bgColor={"#dcdcdc"}>
        <VStack spacing="4" alignItems="start">
          <Avatar size="xl" src={avatar} alt="Avatar" />

          <FormControl isRequired>
            <FormLabel>Actual Contraseña:</FormLabel>
            <Input
              name="password"
              placeholder="Actual contraseña"
              onChange={handleEdit}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Nueva Contraseña</FormLabel>
            <Input
              name="newPassword"
              placeholder="Nueva contraseña"
              onChange={handleEdit}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Re-escribir contraseña:</FormLabel>
            <Input
              name="rewriteNewPassword"
              placeholder="Nueva contraseña"
              onChange={handleEdit}
            />
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
