import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createCareer, fetchCareerById, updateCareerById } from "../services/careerServices";
import { fetchCareers } from "../store/actions/careerActions";
import { getFaculties } from "../services/facultyServices";

const initialState = {
  name: "",
  description: "",
  manager: "",
  faculty: "",
};

const CareerForm = () => {
  const [career, setCareer] = useState(initialState);
  const [faculties, setFaculties] = useState([]);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchFaculties = async () => {
    try{
      const result = await getFaculties();
      setFaculties(result.results);
    } catch (error) {
      console.log("Error recuperando Facultades", error);
    }
  };

  const verifyData = () => {
    if (career.name.length > 100) {
      toast.error("El nombre debe ser de máximo 100 caracteres");
      return false;
    };
    if (career.description.length > 200) {
      toast.error("La descripción debe ser de máximo 200 caracteres");
      return false;
    };
    if (career.manager.length > 125) {
      toast.error("El nombre del gestor debe ser de máximo 125 caracteres");
      return false;
    };
    if (!/^[0-9a-fA-F]{24}$/.test(career.faculty)) {
      toast.error("Seleccione la facultad a la que pertenece la carrera");
      return false;
    };
    return true;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCareer({ ...career, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const getCareer = async () => {
        const careerDB = await fetchCareerById(id);
        console.log({ careerDB });

        setCareer({
          name: careerDB.name,
          description: careerDB.description,
          manager: careerDB.manager,
          faculty: careerDB.faculty._id,
        });
      };
      
      getCareer();
    }
    fetchFaculties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verify = verifyData();
    if (verify) {
      try {
        if (id) {
          await updateCareerById(id, career);
          navigate("/career");
          toast.success("Actualización exitosa");
        } else {
          await createCareer(career);
          toast.success("Carrera creada");
        }
  
        dispacth(fetchCareers());
        navigate("/career");
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <Center height="90vh">
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
                value={career.name}
                onChange={handleChange}
                required
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="manager">Gestor</FormLabel>
              <Input
                type="text"
                id="manager"
                name="manager"
                value={career.manager || ""}
                onChange={handleChange}
                required
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Textarea
                type="text"
                id="description"
                name="description"
                value={career.description || ""}
                onChange={handleChange}
                required
                borderColor="gray.500"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="faculty">Facultades</FormLabel>
              <Select
                name="faculty"
                value={career.faculty}
                onChange={handleChange}
                borderColor="gray.500"
              >
                <option value="">Seleccionar Facultad</option>
                {faculties.length > 0 &&
                  faculties.map((faculty) => (
                    <option key={faculty._id} value={faculty._id}>
                      {faculty.name}
                    </option>
                  ))
                }
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="blue">
              {id ? "Guardar cambios" : "Crear carrera"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default CareerForm;