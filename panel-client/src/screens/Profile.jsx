import {
  Avatar,
  Box,
  Card,
  Heading,
  Switch,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { LuSettings2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putProfile } from "../services/authServices";
import { fetchProfile } from "../store/actions/authActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { name, lastname, email, avatar, role, settings, _id } = user || {};
  const { notification, spam } = settings || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleEditProfile = async () => {
    navigate(`/edit-profile/${_id}`);
  };

  return (
    <Box maxWidth="500px" mx="auto" p="4">
      <Card p={5} bgColor={"#dcdcdc"}>
        <VStack spacing="4" alignItems="start">
          <IconButton
            colorScheme="teal"
            aria-label="Call Segun"
            size="lg"
            icon={<LuSettings2 />}
            onClick={handleEditProfile}
          />
          <Avatar size="xl" src={avatar} alt="Avatar" />
          <Heading as="h2" size="lg">
            {name} {lastname}
          </Heading>
          <Text>Email: {email}</Text>
          <Text>Rol: {role?.name}</Text>
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

export default Profile;
