import { Box, Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ReportTable from "../components/ReportTable";
import { deleteReportById, updateReportById } from "../services/reportServices";
import { fetchReports } from "../store/actions/reportActions";
import { getWithoutFetchSlice, setPage } from "../store/slices/reportSlice";

function Reports() {
  const {
    pages: totalPages,
    currentPage: page,
    limit,
    skip,
    currentSliceReports: reports,
    fetched,
    loading,
  } = useSelector((state) => state.reportReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) dispatch(fetchReports());
  }, []);

  useEffect(() => {
    if (totalPages < page) dispatch(setPage(page - 1));
  }, [totalPages]);

  useEffect(() => {
    if (fetched) {
      dispatch(getWithoutFetchSlice());
    } else {
      dispatch(fetchReports());
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const maskAsReviewed = async (id, revised = true) => {
    try {
      await updateReportById(id, { revised });
      toast.success("Actualización exitosa");

      dispatch(fetchReports());
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async (reportId) => {
    try {
      await deleteReportById(reportId);
      dispatch(fetchReports());
      toast.success("Eliminación exitosa");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Algo salió mal");
    }
  };

  return (
    <Box mx={4} my={8}>
      <Heading as="h1" size="lg" color="blue.600" mb={4}>
        Reportes de usuarios
      </Heading>

      {loading ? (
        <Loader />
      ) : (
        <>
          <ReportTable reports={reports} maskAsReviewed={maskAsReviewed} />
          <Box mt={4}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                bgColor={index + 1 === page ? "blue.700" : "gray.100"}
                color={index + 1 === page ? "white" : "black"}
                size="sm"
                mr={2}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default Reports;
