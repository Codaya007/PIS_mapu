import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EventTable from "../components/EventTable";
import { deleteEventById } from "../services/eventServices";
import { fetchEvents } from "../store/actions/eventActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/eventSlice";

function Events() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceEvent: events,
    fetched,
  } = useSelector((state) => state.eventReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchEvents());
    }
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchEvents());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEventById(eventId);
      dispatch(fetchEvents());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salio mal 1");
    }
  };

  const handleCreate = () => {
    navigate("/create-event");
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" mb={4}>
        Eventos
      </Heading>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          colorScheme="blue"
          onClick={handleCreate}
          mb={4}
          alignSelf={"flex-end"}
        >
          Crear evento
        </Button>
      </Box>
      <EventTable
        events={events}
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

export default Events;
