import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { putProfile } from "../services/authServices";
import { fetchProfile } from "../store/actions/authActions";
import { handleFileChange } from "./BlockForm";

// const initialState = {
//   name: "",
//   lastname: "",
//   email: "",
//   avatar: "",
//   role: "",
//   settings: {
//     notification: false,
//     spam: false,
//   },
// };

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user = {} } = useSelector((state) => state.authReducer);
  const [userForm, setUserForm] = useState(user);
  const { name, lastname, avatar } = userForm;

  const saveChange = async () => {
    try {
      await putProfile(userForm);
      dispatch(fetchProfile());
      navigate("/profile");
      toast.success("Perfil modificado");
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salió mal");
    }
  };

  const handleEdit = async (e) => {
    const { name, value, checked } = e.target;

    if (name === "spam" || name === "notification") {
      setUserForm({
        ...userForm,
        settings: {
          ...userForm.settings,
          [name]: checked,
        },
      });
    } else {
      setUserForm({ ...userForm, [name]: value });
    }
  };

  const changePassword = async () => {
    try {
      navigate(`/edit-pasword-profile/${_id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salio mal");
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <Box maxWidth="700px" mx="auto" p="4">
      <Card p={5} bgColor={"#dcdcdc"}>
        <VStack spacing="4" alignItems="start">
          <Avatar size="xl" src={avatar} alt="Avatar" />
          <Heading as="h2" size="lg">
            {name} {lastname}
          </Heading>
          <FormControl>
            <FormLabel>Subir imagen</FormLabel>
            <Input
              name="avatar"
              type="file"
              onChange={async (e) => {
                const avatar = await handleFileChange(e);

                setUserForm({ ...userForm, avatar });
              }}
            />
          </FormControl>
          <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                placeholder="First name"
                defaultValue={userForm.name}
                onChange={handleEdit}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input
                name="lastname"
                placeholder="First name"
                defaultValue={userForm.lastname}
                onChange={handleEdit}
              />
            </FormControl>
          </Box>
          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              name="email"
              placeholder="First name"
              defaultValue={userForm.email}
              onChange={handleEdit}
            />
          </FormControl>
          {/* <Box>
            <Text>Activar notificaciones:</Text>
            <Switch
              name="notification"
              isChecked={userForm.settings.notification}
              onChange={handleEdit}
            />
          </Box>
          <Box>
            <Text>Activar spam:</Text>
            <Switch
              name="spam"
              isChecked={userForm.settings.spam}
              onChange={handleEdit}
            />
          </Box> */}

          <Box display="flex" justifyContent="space-evenly" width={"100%"}>
            <Button
              margin={2}
              bgColor="blue.600"
              color="white"
              onClick={saveChange}
              mb={4}
              alignSelf={"flex-end"}
            >
              Guardar Cambios
            </Button>
            <Button
              margin={2}
              color={"white"}
              bgColor={"red.600"}
              onClick={changePassword}
              mb={4}
              alignSelf={"flex-end"}
            >
              Cambiar Contraseña
            </Button>
          </Box>
        </VStack>
      </Card>
    </Box>
  );
};

export default ProfileEdit;
