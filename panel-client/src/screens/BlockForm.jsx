import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    VStack,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useDispatch } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  import { toast } from "react-toastify";
  import {
    createBlock,
    fetchBlockById,
    updateBlockById,
  } from "../services/blockServices";
  import { fetchBlocks } from "../store/actions/blockActions";
  
  const initialState = {
    number: "",
    avaible: "",
    faculty: "",
  };
  
  const BlockForm = () => {
    const [block, setBlock] = useState(initialState);
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setBlock({ ...block, [name]: value });
    };
  
    useEffect(() => {
      if (id) {
        const getBlock = async () => {
          const blockDB = await fetchBlockById(id);
          console.log({ blockDB });
  
          setBlock({
            number: blockDB.number,
            avaible: blockDB.avaible,
            faculty: blockDB.faculty,
          });
        };
  
        getBlock();
      }
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Aquí puedes hacer la llamada a tu API para guardar el nuevo bloque
        if (id) {
          await updateBlockById(id, block);
          navigate("/block");
          toast.success("Actualización exitosa");
        } else {
          await createBlock(block);
          toast.success("Bloque creado");
        }
  
        dispacth(fetchBlocks());
        navigate("/block");
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
  
    return (
      <Center height="90vh">
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
                <FormLabel htmlFor="number">Número</FormLabel>
                <Input
                  type="number"
                  id="number"
                  name="number"
                  value={block.number}
                  onChange={handleChange}
                  required //? Quiza quitar lo de requerido, pero nose cuando es actualización o creación
                  borderColor="gray.500"
                />
              </FormControl>
  
              <FormControl>
                <FormLabel htmlFor="avaible">Disponible</FormLabel>
                <Input
                  type="checkbox"
                  id="avaible"
                  name="avaible"
                  value={block.avaible || false} //! NOSE SI PUEDE DAR ERROR POR LO DEL FALSE
                  onChange={handleChange}
                  borderColor="gray.500"
                />
              </FormControl>
  
              <FormControl>
                <FormLabel htmlFor="faculty">Facultad</FormLabel>
                <Input
                  type="text" //? Cambiar el tipo a una tipo de menu hamburguesa para que el user eliga la facultad
                  id="faculty"
                  name="faculty"
                  value={block.faculty}
                  onChange={handleChange}
                  borderColor="gray.500"
                />
              </FormControl>
  
              <Button type="submit" colorScheme="blue">
                {id ? "Guardar cambios" : "Crear bloque"}
              </Button>
            </VStack>
          </form>
        </Box>
      </Center>
    );
  };
  
  export default BlockForm;
  