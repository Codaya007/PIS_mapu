import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommentTable from "../components/CommentTable";
import {
  deleteCommentById,
  updateCommentById,
} from "../services/commentServices";
import { fetchComments } from "../store/actions/commentActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/commentSlice";
import Loader from "../components/Loader";

function Comments() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceComment: comments,
    fetched,
    loading,
  } = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchComments());
    }
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchComments());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (commentId) => {
    navigate(`/edit-comment/${commentId}`);
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteCommentById(commentId);
      dispatch(fetchComments());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salio mal 1");
    }
  };

  const maskAsHide = async (id, hide = true) => {
    try {
      await updateCommentById(id, { hide });
      toast.success("Actualización exitosa");

      dispatch(fetchComments());
    } catch (error) {
      toast.error(
        error.response?.data?.message || "No se pudo ocultar el comentario"
      );
    }
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" mb={4}>
        Comentarios
      </Heading>
      {loading ? <Loader /> :
        <>
          <CommentTable
            comments={comments}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            maskAsHide={maskAsHide}
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
        </>}
    </Box>
  );
}

export default Comments;
