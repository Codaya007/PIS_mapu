import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserById } from "../services/userServices";
import { getWithoutFetchSlice, setPage } from "../store/slices/userSlice";
import { fetchUsers } from "../store/actions/userActions";
import { toast } from "react-toastify";
import { Box, Button, Heading } from "@chakra-ui/react";
import UserTable from "../components/UserTable";

function Users() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceUser: users,
    fetched,
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchUsers());
    }
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchUsers());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUserById(userId);
      dispatch(fetchUsers());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salio mal 1");
    }
  };

  const handleCreate = () => {
    navigate("/create-user");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" mb={4}>
        Usuarios
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          colorScheme="blue"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear usuario
        </Button>
      </Box>
      <UserTable
        users={users}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Box mt={4}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            colorScheme={index + 1 === page ? "blue" : "gray"}
            size="sm"
            mr={2}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Users;
