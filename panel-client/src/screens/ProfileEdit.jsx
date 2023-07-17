import {
  Avatar,
  Box,
  Card,
  Heading,
  Switch,
  Text,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putProfile } from "../services/authServices";
import { fetchProfile } from "../store/actions/authActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState(initialState);
  const navigate = useNavigate();



  const saveChange = async() => {
    console.log("SaveChanges")
    try {
      await putProfile(userForm );
      dispatch(fetchProfile());
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salió mal");
    }
  }

  const handleEdit = async (e) => {
    const { name, value, checked } = e.target;
    if(name == "spam" || name == "notification"){
      setUserForm({ ...userForm, settings:{
        ...userForm.settings,
        [name]: checked,
      }});
      console.log(userForm.settings.notification)
    }else{
      setUserForm({ ...userForm, [name]: value });
    }
  };
  const changePassword = async() => {
    try {
      navigate(`/edit-pasword-profile/${_id}`)
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salio mal" );
    }
  }

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
          <FormControl isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input name="name" placeholder="First name" defaultValue={userForm.name} onChange={handleEdit}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Apellido</FormLabel>
            <Input name="lastname" placeholder="First name" defaultValue={userForm.lastname} onChange={handleEdit} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input name="email" placeholder="First name" defaultValue={userForm.email}  onChange={handleEdit}/>
          </FormControl>
          {/* <FormControl isRequired>
            <FormLabel>Contraseña:</FormLabel>
            <Input placeholder="First name" defaultValue={userForm.password} />
          </FormControl> */}
          <FormControl isRequired>
            <FormLabel>Avatar:</FormLabel>
            <Input name="avatar" placeholder="First name" defaultValue={userForm.avatar} onChange={handleEdit}/>
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

          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button
              colorScheme="blue"
              onClick={saveChange}
              mb={4}
              alignSelf={"flex-end"}
            >
              Guardar Cambios
            </Button>
            <Button
              colorScheme="blue"
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
