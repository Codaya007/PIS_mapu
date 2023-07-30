import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { putProfile } from "../services/authServices";
import { fetchProfile } from "../store/actions/authActions";
import { uploadImage } from "../services/imageService";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  avatar: "",
  role: "",
  settings: {
    notification: false,
    spam: false,
  },
};

const ProfileEdit = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { name, lastname, email, avatar, role, settings, _id } = user || {};
  const { notification, spam } = settings || {};
  const [userForm, setUserForm] = useState(initialState);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveChange = async () => {
    console.log("SaveChanges");
    if (avatarUrl != null) {
      try {
        const imgU = await uploadImage(avatarUrl);
        console.log(imgU);
        const jsonString = JSON.stringify(imgU.imageUrl);
        const stringWithoutQuotes = jsonString.slice(1, -1);
        console.log(stringWithoutQuotes);
        setUserForm({ ...userForm, avatar:  stringWithoutQuotes});
        console.log(userForm.avatar);
      } catch (error) {
        console.log("error " + error);
      }
    }
    try {
      await putProfile(userForm);
      dispatch(fetchProfile());
      toast.success("Perfil modificado");
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salió mal");
    }
  };
  const handleEdit = async (e) => {
    const { name, value, checked } = e.target;
    if (name == "avatar") {
      console.log(e.target.files[0]);
      setAvatarUrl(e.target.files[0]);
      console.log(avatarUrl);
    }
    if (name == "spam" || name == "notification") {
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
    const fectchData = async () => {
      await dispatch(fetchProfile());
      setUserForm({
        ...userForm,
        name: name,
        lastname: lastname,
        email: email,
        avatar: avatar,
        role: role,
        settings: {
          ...userForm.settings,
          notification: notification,
          spam: spam,
        },
      });
    };
    fectchData();
  }, []);

  return (
    <Box maxWidth="500px" mx="auto" p="4">
      <Card p={5} bgColor={"#dcdcdc"}>
        <VStack spacing="4" alignItems="start">
          <Avatar size="xl" src={avatar} alt="Avatar" />
          <Heading as="h2" size="lg">
            {name} {lastname}
          </Heading>
          <FormControl>
            <FormLabel>Subir imagen</FormLabel>
            <Input name="avatar" type="file" onChange={handleEdit} />
          </FormControl>
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
          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              name="email"
              placeholder="First name"
              defaultValue={userForm.email}
              onChange={handleEdit}
            />
          </FormControl>
          <Box>
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
          </Box>

          <Box display="flex" justifyContent="flex-end" mb={4} padding={10}>
            <Button
              margin={2}
              colorScheme="blue"
              onClick={saveChange}
              mb={4}
              alignSelf={"flex-end"}
            >
              Guardar Cambios
            </Button>
            <Button
              margin={2}
              colorScheme="orange"
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
