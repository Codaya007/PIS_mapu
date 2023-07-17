import {
  Avatar,
  Box,
  Card,
  Heading,
  Switch,
  Text,
  VStack,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putProfile } from "../services/authServices";
import { fetchProfile } from "../store/actions/authActions";
import { useEffect } from "react";

const ProfileEdit = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { name, lastname, email, avatar, role, settings, password } = user || {};
  const { notification, spam } = settings || {};
  const dispatch = useDispatch();

  const handleNotificationChange = async (value) => {
    try {
      await putProfile({ settings: { notification: value, spam } });
      dispatch(fetchProfile());
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salió mal");
    }
  };

  const handleSpamChange = async (value) => {
    try {
      await putProfile({ settings: { notification, spam: value } });
      dispatch(fetchProfile());
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salió mal");
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <Box maxWidth="500px" mx="auto" p="4">
      <Card p={5} bgColor={"#dcdcdc"}>
        <VStack spacing="4" alignItems="start">
          <Avatar size="xl" src={avatar} alt="Avatar" />
          <Heading as="h2" size="lg">
            {name} {lastname}
          </Heading>
          <Text>Nombre: </Text>
          <Editable defaultValue= {name} backgroundColor={"white"} padding={1.5} borderRadius={5}>
            <EditablePreview />
            <EditableTextarea />
          </Editable>
          <Text>Apellido: </Text>
          <Editable defaultValue= {lastname} backgroundColor={"white"} padding={1.5} borderRadius={5}> 
            <EditablePreview />
            <EditableTextarea />
          </Editable>
          <Text>Email: </Text>
          <Editable defaultValue= {email} backgroundColor={"white"} padding={1.5} borderRadius={5}> 
            <EditablePreview />
            <EditableTextarea />
          </Editable>
          <Text>Password: </Text>
          <Editable defaultValue= {password} backgroundColor={"white"} padding={1.5} borderRadius={5}> 
            <EditablePreview />
            <EditableTextarea />
          </Editable>
          {/* <Text>Avatar: </Text>
          <Editable defaultValue= {avatar } backgroundColor={"white"} padding={1.5} borderRadius={5}> 
            <EditablePreview />
            <EditableTextarea />
          </Editable> */}
          <Box>
            <Text>Activar notificaciones:</Text>
            <Switch
              isChecked={notification}
              onChange={(e) => handleNotificationChange(e.target.checked)}
            />
          </Box>
          <Box>
            <Text>Activar spam:</Text>
            <Switch
              isChecked={spam}
              onChange={(e) => handleSpamChange(e.target.checked)}
            />
          </Box>
        </VStack>
      </Card>
    </Box>
  );
};

export default ProfileEdit;
