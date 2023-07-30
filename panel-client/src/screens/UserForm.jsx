import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUser,
  fetchUserById,
  updateUserById,
} from "../services/userServices";
import { fetchUsers } from "../store/actions/userActions";
import { uploadImage } from "../services/imageService";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  bloqued: false,
  avatar: "",
  role: "",
  settings: {
    notification: false,
    spam: false,
  },
};
const passwordState = {
  password: "",
  password2: "",
};

const UserForm = () => {
  const [userForm, setUserForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [passwordUser, setPasswordUser] = useState(passwordState);

  //REVISAR
  const handlePassword = async (e) => {
    const { name, value } = e.target;
    setPasswordUser({ ...passwordUser, [name]: value });
  };
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name == "avatar") {
      setAvatarUrl(e.target.files[0]);
      console.log(avatarUrl);
    } else if (name == "bloqued") {
      setUserForm({ ...userForm, bloqued: checked });
    } else if (name == "spam" || name == "notification") {
      console.log(typeof value);
      setUserForm({
        ...userForm,
        settings: {
          ...userForm.settings,
          [name]: checked,
        },
      });
      console.log( userForm.settings.spam)
    } else {
      setUserForm({ ...userForm, [name]: value });
    }
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      const getUser = async () => {
        const userDB = await fetchUserById(id);
        setUserForm({
          ... userForm,
          name: userDB.name,
          lastname: userDB.lastname,
          email: userDB.email,
          avatar: userDB.avatar,
          role: userDB.role,
          settings: {
            ...userForm.settings,
            spam: userDB.settings.spam,
            notification: userDB.settings.notification,
          },
        });
      };

      getUser();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      if (passwordUser.password != passwordUser.password2) {
        toast.error("La constraseñas ingresadas no coinciden");
        return;
      }
      if (passwordUser.password.length <= 8) {
        toast.error("La constraseña debe tener mas de 8 caracteres");
        return;
      }
      delete userForm.bloqued;
      delete userForm.settings
      userForm.password = passwordUser.password;
    }
    console.log("AVATARR" + userForm.avatar);

    if (avatarUrl != null) {
      try {
        const imgU = await uploadImage(avatarUrl);
        const jsonString = JSON.stringify(imgU.imageUrl);
        const stringWithoutQuotes = jsonString.slice(1, -1);
        console.log(stringWithoutQuotes);
        setUserForm({ ...userForm, avatar: stringWithoutQuotes });
        console.log(userForm.avatar);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error al cargar la imagen"
        );
        console.log("error " + error);
      }
    }
    try {
      if (id) {
        await updateUserById(id, userForm);
        navigate("/campus");
        toast.success("Actualizacion exitosa");
      } else {
        await createUser(userForm);
        toast.success("Usuario creado");
      }
      dispatch(fetchUsers());
      navigate("/user");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <Center height="92vh">
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
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Input
                type="text"
                name="name"
                value={userForm.name}
                onChange={handleChange}
                required
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="lastname">Apellido</FormLabel>
              <Input
                type="text"
                name="lastname"
                value={userForm.lastname || ""}
                onChange={handleChange}
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="text"
                id="email"
                name="email"
                value={userForm.email || ""}
                onChange={handleChange}
                borderColor="gray.500"
              />
            </FormControl>
            {!id && (
              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={passwordUser.password || ""}
                  onChange={handlePassword}
                  borderColor="gray.500"
                />
              </FormControl>
            )}
            {!id && (
              <FormControl>
                <FormLabel htmlFor="password2">
                  Reescribe la contraseña
                </FormLabel>
                <Input
                  type="password"
                  name="password2"
                  value={passwordUser.password2 || ""}
                  onChange={handlePassword}
                  borderColor="gray.500"
                />
              </FormControl>
            )}
            {id && <FormControl>
              <FormLabel htmlFor="bloqued">Bloqueado</FormLabel>
              <Switch
                name="bloqued"
                isChecked={userForm.bloqued}
                onChange={handleChange}
              />
            </FormControl>}
            <FormControl>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select
                variant="outline"
                name="role"
                onChange={handleChange}
                value={userForm.role}
              >
                <option value="">Selecione un rol </option>

                <option value="Administrador">Administrador</option>
                <option value="Normal">Normal</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="avatar">Avatar</FormLabel>
              <Input
                borderRadius={10}
                name="avatar"
                type="file"
                onChange={handleChange}
              />
            </FormControl>
            {id && <FormControl>
              <Text>Activar notificaciones:</Text>
              <Switch
                name="notification"
                isChecked={userForm.settings.notification}
                onChange={handleChange}
              />
            </FormControl>}
            {id && <FormControl>
              <Text>Activar spam:</Text>
              <Switch
                name="spam"
                isChecked={userForm.settings.spam}
                onChange={handleChange}
              />
            </FormControl>}

            {/* Aquí debes implementar la funcionalidad para obtener los polígonos desde el mapa */}
            {/* Puedes utilizar alguna biblioteca como react-leaflet para mostrar el mapa y seleccionar los polígonos */}

            <Button type="submit" colorScheme="blue">
              {id ? "Guardar cambios" : "Crear Usuario"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default UserForm;
