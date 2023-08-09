import {
  getInterestingNodesByStringSearch,
  getShortestPath,
} from "../../services/Search";
import {
  clearError,
  searchText,
  setError,
  setPath,
} from "../slices/searchSlice";

export const getSearchResults = (search) => async (dispatch) => {
  try {
    const results = await getInterestingNodesByStringSearch(search);

    dispatch(searchText(results));
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};

export const searchShortestPathByNode =
  (origin, destination) => async (dispatch) => {
    try {
      dispatch(clearError());
      const results = await getShortestPath("byNode", origin, destination);

      dispatch(setPath(results));
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      dispatch(
        setError(
          error.response?.data?.message || "No se ha podido buscar la ruta"
        )
      );
      // Toast.show({
      //   type: "error",
      //   text1: error.response?.data?.message || "No se ha podido buscar la ruta",
      //   position: "bottom",
      // });
    }
  };

export const searchShortestPathByNomenclature =
  (campus, block, floor, environment) => async (dispatch) => {
    try {
      const results = await getShortestPath(
        "byNomenclature",
        undefined,
        undefined,
        { campus, block, floor, environment }
      );

      dispatch(setPath(results));
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };
