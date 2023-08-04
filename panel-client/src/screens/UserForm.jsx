import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
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
import { getRoles } from "../services/roleServices";
import {
  createUser,
  fetchUserById,
  updateUserById,
} from "../services/userServices";
import { fetchUsers } from "../store/actions/userActions";
import { handleFileChange } from "./BlockForm";

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
  const { id } = useParams();
  const [roles, setRoles] = useState([]);
  const [userForm, setUserForm] = useState(initialState);
  const [passwordUser, setPasswordUser] = useState(passwordState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePassword = async (e) => {
    const { name, value } = e.target;
    setPasswordUser({ ...passwordUser, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name == "avatar") {
      setAvatarUrl(e.target.files[0]);
    } else if (name === "bloqued") {
      setUserForm({ ...userForm, bloqued: checked });
    } else if (name === "spam" || name == "notification") {
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

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const userDB = await fetchUserById(id);
        setUserForm({
          ...userForm,
          name: userDB.name,
          lastname: userDB.lastname,
          email: userDB.email,
          avatar: userDB.avatar,
          role: userDB.role?._id,
          settings: {
            ...userForm.settings,
            spam: userDB.settings.spam,
            notification: userDB.settings.notification,
          },
        });
      };

      getUser();
    }

    const getAllRoles = async () => {
      try {
        const { results: roles } = await getRoles();

        setRoles(roles);
      } catch (error) {
        console.log(error.response?.data);
        toast.error("No se pudieron obtener los roles");
      }
    };

    getAllRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      if (passwordUser.password != passwordUser.password2) {
        toast.error("La contraseñas ingresadas no coinciden");
        return;
      }
      if (passwordUser.password.length <= 8) {
        toast.error("La contraseña debe tener más de 8 caracteres");
        return;
      }
      delete userForm.bloqued;
      delete userForm.settings;
      userForm.password = passwordUser.password;
    }

    console.log({ userForm });

    try {
      if (id) {
        await updateUserById(id, userForm);
        toast.success("Actualizacion exitosa");
      } else {
        await createUser(userForm);
        toast.success("Usuario creado");
      }

      dispatch(fetchUsers());
      navigate("/user");
    } catch (error) {
      toast.error(error.response?.data?.message || "Algo salió mal");
    }
  };

  return (
    <Box
      margin={"auto"}
      maxWidth="750px"
      p="5"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      borderColor="gray.300"
    >
      <Box p="4">
        <Heading textAlign={"center"} color={"blue.500"}>
          {id ? "Edición" : "Creación"} de usuarios
        </Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleChange}
              borderColor="gray.500"
              required
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
              required
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
              required
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
              <FormLabel htmlFor="password2">Reescribe la contraseña</FormLabel>
              <Input
                type="password"
                name="password2"
                value={passwordUser.password2 || ""}
                onChange={handlePassword}
                borderColor="gray.500"
              />
            </FormControl>
          )}
          {id && (
            <FormControl>
              <FormLabel htmlFor="bloqued">Bloqueado</FormLabel>
              <Switch
                name="bloqued"
                isChecked={userForm.bloqued}
                onChange={handleChange}
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel htmlFor="category">Role</FormLabel>
            <Select
              name="role"
              value={userForm.role}
              onChange={(e) => handleChange(e)}
              borderColor="gray.500"
              required
            >
              <option value={null}>Seleccionar rol</option>
              {roles.length > 0 &&
                roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <HStack>
            <Box>
              <FormLabel htmlFor="avatar">Avatar</FormLabel>
              <Input
                accept={[".png", ".jpeg", ".svg", ".jpg"]}
                borderRadius={10}
                name="avatar"
                type="file"
                onChange={async (e) => {
                  setUserForm({ ...userForm, avatar: null });
                  const avatar = await handleFileChange(e);
                  setUserForm({ ...userForm, avatar });
                }}
              />
            </Box>
            {userForm.avatar && (
              <Avatar
                margin={"auto"}
                display={"block"}
                width={"150px"}
                height={"150px"}
                name={"Avatar nuevo usuario"}
                src={userForm.avatar}
              />
            )}
          </HStack>
          {id && (
            <FormControl>
              <Text>Activar notificaciones:</Text>
              <Switch
                name="notification"
                isChecked={userForm.settings.notification}
                onChange={handleChange}
              />
            </FormControl>
          )}
          {id && (
            <FormControl>
              <Text>Activar spam:</Text>
              <Switch
                name="spam"
                isChecked={userForm.settings.spam}
                onChange={handleChange}
              />
            </FormControl>
          )}

          <Button type="submit" bgColor="blue.600" color="white">
            {id ? "Guardar cambios" : "Crear Usuario"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;
