import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createCategory, fetchCategoryById, updateCategoryById } from "../services/categoryServices";
import { fetchCategories } from "../store/actions/categoryActions";
import { updateImageToS3 } from "../services/imageServices";

const initialState = {
  name: "",
  description: "",
  icon: "",
};

const CategoryForm = () => {
  const [category, setCategory] = useState(initialState);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const verifyData = () => {
    if (category.name.length < 2 | category.name.length > 40) {
      toast.error("El nombre debe ser de mínimo 2 y máximo de 40 caracteres");
      return false;
    };
    if (category.description.length < 2 | category.description.length > 200) {
      toast.error("La descripción debe ser de mínimo 2 y máximo de 200 caracteres");
      return false;
    };
    if (!/^https?:\/\/\S+$/.test(category.icon)){
      toast.error("Seleccione el ícono de la categoría");
      return false;
    }
    return true;
  }

  const handleIconChange = async (e) => {
    const file = e.target.files[0];
    const url = await updateImageToS3(file);
    setCategory({ ...category, icon: url });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setCategory({ ...category, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const getCategory = async () => {
        const categoryDB = await fetchCategoryById(id);
        console.log({ categoryDB });

        setCategory({
          name: categoryDB.name,
          description: categoryDB.description,
          icon: categoryDB.icon,
        });
      };

      getCategory();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verify = verifyData();
    if (verify) {
      try {
        if (id) {
          await updateCategoryById(id, category);
          navigate("/category");
          toast.success("Actualización exitosa");
        } else {
          await createCategory(category);
          toast.success("Categoria creada");
        }
  
        dispacth(fetchCategories());
        navigate("/category");
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <Center height="100vh">
      <Box
        width="600px"
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
                id="name"
                name="name"
                value={category.name}
                onChange={handleChange}
                required
                max={5}
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Textarea
                type="text"
                id="description"
                name="description"
                value={category.description || ""}
                onChange={handleChange}
                required
                borderColor="gray.500"
              />
            </FormControl>

            {category.icon.length > 0 ? (
              <FormControl>
                <FormLabel htmlFor="icon">Icono</FormLabel>
                <Input
                  type="file"
                  id="icon"
                  name="icon"
                  accept=".png, .jpg, .jpeg, .svg"
                  onChange={handleIconChange}
                  borderColor="gray.500"
                />
              </FormControl>
            ) : (
              <FormControl>
                <FormLabel htmlFor="icon">Icono</FormLabel>
                <Input
                  type="file"
                  id="icon"
                  name="icon"
                  accept=".png, .jpg, .jpeg, .svg"
                  onChange={handleIconChange}
                  required
                  borderColor="gray.500"
                />
              </FormControl>)
            }

            <Button type="submit" colorScheme="blue">
              {id ? "Guardar cambios" : "Crear categoria"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default CategoryForm;