import { Toast } from "native-base";
import {
  getInterestingNodesByStringSearch,
  getShortestPath,
} from "../../services/Search";
import { searchText, setPath } from "../slices/searchSlice";

export const getSearchResults = (search) => async (dispatch) => {
  try {
    const results = await getInterestingNodesByStringSearch(search);

    dispatch(searchText(results));
  } catch (error) {
    Toast.show({
      type: "error",
      text1: error.response?.data?.message || error.message,
      position: "bottom",
    });
  }
};

export const searchShortestPathByNode =
  (origin, destination) => async (dispatch) => {
    try {
      const results = await getShortestPath("byNode", origin, destination);

      console.log({ results });

      dispatch(setPath(results));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || error.message,
        position: "bottom",
      });
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
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || error.message,
        position: "bottom",
      });
    }
  };
